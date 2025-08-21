import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, useTexture, Environment, Lightformer } from '@react-three/drei'
import { Physics, RigidBody, BallCollider, CuboidCollider, useRopeJoint, useSphericalJoint } from '@react-three/rapier'
import { useEffect, useRef, useState } from 'react'
import { MeshLineGeometry, MeshLineMaterial } from 'meshline'
import { extend } from '@react-three/fiber'
extend({ MeshLineGeometry, MeshLineMaterial })

const cardGLB = '/models/card.glb'
import lanyardTex from '../assets/Lanyard/lanyard.png'

export default function HeroLanyard() {
  return (
    <div className="w-full h-full">
      <Canvas
        dpr={[1, 1.8]}
        camera={{ position: [0, 0.82, 5.1], fov: 30 }}
        gl={{ alpha: true, antialias: true }}
        onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
      >
        <ambientLight intensity={1.15} />
        <directionalLight position={[3, 5, 3]} intensity={1.4} />
        <Environment resolution={256}>
          <Lightformer intensity={2.6} position={[0, 3, 6]} scale={[10, 10, 1]} />
          <Lightformer intensity={1.6} position={[-5, 0, 4]} />
        </Environment>

        <Physics gravity={[0, -34, 0]} timeStep={1 / 60}>
          <Band />
        </Physics>
      </Canvas>
    </div>
  )
}

function Shine() {
  const mat = useRef<THREE.ShaderMaterial>(null!)
  useFrame((_, t) => { mat.current.uniforms.uTime.value = t })
  return (
    <mesh position={[0, 0.035, 0.05]} scale={[0.9, 1.24, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={mat}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        uniforms={{ uTime: { value: 0 } }}
        vertexShader={`varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`}
        fragmentShader={`uniform float uTime;varying vec2 vUv;
          float x=fract(uTime*0.16);
          float b=smoothstep(x-0.02,x,vUv.x)*smoothstep(x+0.02,x,vUv.x);
          vec3 c=vec3(1.,.97,.75)*b; gl_FragColor=vec4(c,b);`}
      />
    </mesh>
  )
}

type BandProps = { maxSpeed?: number; minSpeed?: number }
function Band({ maxSpeed = 48, minSpeed = 0 }: BandProps) {
  const band = useRef<any>(), fixed = useRef<any>(), j1 = useRef<any>(), j2 = useRef<any>(), j3 = useRef<any>(), card = useRef<any>()
  const v = new THREE.Vector3(), a = new THREE.Vector3(), r = new THREE.Vector3(), dir = new THREE.Vector3()

  // properti umum tanpa konflik tipe
  const common = { canSleep: true, colliders: false as const, angularDamping: 4, linearDamping: 4 }

  const { nodes, materials } = useGLTF(cardGLB) as any
  const tex = useTexture(lanyardTex); useGLTF.preload(cardGLB)

  const [curve] = useState(() => new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()]))
  const [dragged, setDragged] = useState<false | THREE.Vector3>(false)
  const [isSmall, setIsSmall] = useState(() => typeof window !== 'undefined' && window.innerWidth < 1024)

  const SCALE = 1.6
  const L = 0.51

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], L])
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], L])
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], L])
  useSphericalJoint(j3, card, [[0, 0, 0], [0, 0.90, 0]])

  useEffect(() => {
    const on = () => setIsSmall(window.innerWidth < 1024)
    window.addEventListener('resize', on)
    return () => window.removeEventListener('resize', on)
  }, [])

  useFrame((state, delta) => {
    if (dragged) {
      v.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera)
      dir.copy(v).sub(state.camera.position).normalize()
      v.add(dir.multiplyScalar(state.camera.position.length()))
      ;[card, j1, j2, j3, fixed].forEach(ref => ref.current?.wakeUp())
      card.current?.setNextKinematicTranslation({ x: v.x - dragged.x, y: v.y - dragged.y, z: v.z - dragged.z })
    }
    if (fixed.current) {
      ;[j1, j2].forEach((ref: any) => {
        if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(ref.current.translation())
        const d = ref.current.lerped.distanceTo(ref.current.translation())
        const c = Math.max(0.1, Math.min(1, d))
        ref.current.lerped.lerp(ref.current.translation(), delta * (minSpeed + c * (maxSpeed - minSpeed)))
      })
      curve.points[0].copy(j3.current.translation())
      curve.points[1].copy(j2.current.lerped)
      curve.points[2].copy(j1.current.lerped)
      curve.points[3].copy(fixed.current.translation())
      band.current.geometry.setPoints(curve.getPoints(30))
      a.copy(card.current.angvel()); r.copy(card.current.rotation())
      card.current.setAngvel({ x: a.x, y: a.y - r.y * 0.22, z: a.z })
    }
  })

  curve.curveType = 'chordal'
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping; tex.anisotropy = 8

  return (
    <>
      {/* anchor */}
      <group position={[0, 2.55, 0]}>
        <RigidBody ref={fixed} type="fixed" {...common} />

        <RigidBody ref={j1} type="dynamic" position={[0.34, 0, 0]} {...common}>
          <BallCollider args={[0.06]} />
        </RigidBody>

        <RigidBody ref={j2} type="dynamic" position={[0.82, 0, 0]} {...common}>
          <BallCollider args={[0.06]} />
        </RigidBody>

        <RigidBody ref={j3} type="dynamic" position={[1.26, 0, 0]} {...common}>
          <BallCollider args={[0.06]} />
        </RigidBody>

        <RigidBody
          ref={card}
          type={dragged ? 'kinematicPosition' : 'dynamic'}
          position={[1.58, 0, 0]}
          {...common}
        >
          <CuboidCollider args={[0.6, 0.86, 0.01]} />
          <group
            scale={SCALE}
            position={[0, -1.03, -0.028]}
            onPointerUp={(e: any) => { e.target.releasePointerCapture(e.pointerId); setDragged(false) }}
            onPointerDown={(e: any) => { e.target.setPointerCapture(e.pointerId); setDragged(new THREE.Vector3().copy(e.point)) }}
          >
            <mesh geometry={nodes.card.geometry}>
              <meshPhysicalMaterial
                map={(materials.base as any).map}
                clearcoat={1}
                clearcoatRoughness={0.06}
                roughness={0.23}
                metalness={0.9}
                // @ts-ignore reflectivity tidak ada di tipe terbaru
                reflectivity={0.97}
                envMapIntensity={1.55}
              />
            </mesh>
            <mesh geometry={nodes.clip.geometry} material={materials.metal} />
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
            <Shine />
          </group>
        </RigidBody>
      </group>

      {/* tali */}
      <mesh ref={band}>
        {/* @ts-ignore */}
        <meshLineGeometry />
        {/* @ts-ignore */}
        <meshLineMaterial
          color="white"
          depthTest={false}
          resolution={isSmall ? [900, 1800] : [1100, 1100]}
          useMap
          map={tex}
          repeat={[-3.2, 1]}
          lineWidth={0.9}
          transparent
          opacity={0.98}
        />
      </mesh>
    </>
  )
}

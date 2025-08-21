import * as THREE from 'three'
import { Canvas, extend, useFrame } from '@react-three/fiber'
import { useGLTF, useTexture } from '@react-three/drei'
import { Physics, RigidBody, BallCollider, CuboidCollider, useRopeJoint, useSphericalJoint } from '@react-three/rapier'
import { useEffect, useRef, useState } from 'react'
import { MeshLineGeometry, MeshLineMaterial } from 'meshline'

extend({ MeshLineGeometry, MeshLineMaterial })

const cardGLB = '/models/card.glb'
import lanyardTex from '../assets/Lanyard/lanyard.png'

export default function HeaderLanyard() {
  return (
    <div className="relative w-full h-full pointer-events-auto">
      <Canvas
        dpr={[1, 1.8]}
        camera={{ position: [0, 0.9, 5.4], fov: 30 }}
        gl={{ alpha: true, antialias: true }}
        onCreated={({ gl }) => gl.setClearColor(new THREE.Color(0x000000), 0)}
      >
        <ambientLight intensity={1.0} />
        <directionalLight position={[3, 5, 3]} intensity={1.3} />
        <directionalLight position={[-4, 2, 1]} intensity={0.7} />
        <Physics gravity={[0, -34, 0]} timeStep={1 / 60}>
          <MiniBand />
        </Physics>
      </Canvas>
    </div>
  )
}

/* kilau realistis */
function ShineSweep() {
  const mat = useRef<THREE.ShaderMaterial>(null!)
  useFrame((_, t) => { mat.current.uniforms.uTime.value = t })
  return (
    <mesh position={[0, 0.03, 0.045]} scale={[0.92, 1.28, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={mat}
        transparent depthWrite={false}
        blending={THREE.AdditiveBlending}
        uniforms={{ uTime: { value: 0 } }}
        vertexShader={`varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`}
        fragmentShader={`uniform float uTime;varying vec2 vUv;
          float x=fract(uTime*0.16);
          float band=smoothstep(x-0.02,x,vUv.x)*smoothstep(x+0.02,x,vUv.x);
          vec3 col=vec3(1.,.97,.75)*band*.95; gl_FragColor=vec4(col,band*.95);`}
      />
    </mesh>
  )
}

/* ring penghubung visual antara tali dan clamp */
function LinkRing({ radius = 0.09, thickness = 0.022 }) {
  return (
    <mesh position={[0, 0.96, 0]} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[radius, thickness, 12, 24]} />
      <meshPhysicalMaterial color="#202020" roughness={0.25} metalness={0.9} />
    </mesh>
  )
}

function MiniBand({ maxSpeed = 52, minSpeed = 0 }) {
  const band = useRef<any>(), fixed = useRef<any>(), j1 = useRef<any>(), j2 = useRef<any>(), j3 = useRef<any>(), card = useRef<any>()
  const v = new THREE.Vector3(), a = new THREE.Vector3(), r = new THREE.Vector3(), dir = new THREE.Vector3()
  const seg = { type: 'dynamic' as const, canSleep: true, colliders: false, angularDamping: 4, linearDamping: 4 }

  const { nodes, materials }: any = useGLTF(cardGLB)
  const tex = useTexture(lanyardTex)
  useGLTF.preload(cardGLB)

  const [curve] = useState(() => new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()]))
  const [dragged, setDragged] = useState<false | THREE.Vector3>(false)
  const [isSmall, setIsSmall] = useState(() => typeof window !== 'undefined' && window.innerWidth < 1024)

  // panjang segmen tali -> ujung tepat ke clamp; sambungan realistis
  const L = 0.66
  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], L])
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], L])
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], L])
  useSphericalJoint(j3, card, [[0, 0, 0], [0, 0.98, 0]])

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
      ;[card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp())
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
      card.current.setAngvel({ x: a.x, y: a.y - r.y * 0.23, z: a.z })
    }
  })

  curve.curveType = 'chordal'
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping
  tex.anisotropy = 8

  return (
    <>
      {/* anchor tinggi; kartu besar, ring penghubung di atas kartu */}
      <group position={[0, 2.4, 0]}>
        <RigidBody ref={fixed} {...seg} type="fixed" />
        <RigidBody position={[0.38, 0, 0]} ref={j1} {...seg}><BallCollider args={[0.065]} /></RigidBody>
        <RigidBody position={[0.92, 0, 0]} ref={j2} {...seg}><BallCollider args={[0.065]} /></RigidBody>
        <RigidBody position={[1.40, 0, 0]} ref={j3} {...seg}><BallCollider args={[0.065]} /></RigidBody>

        <RigidBody position={[1.78, 0, 0]} ref={card} {...seg} type={dragged ? 'kinematicPosition' : 'dynamic'}>
          <CuboidCollider args={[0.78, 1.06, 0.01]} />
          <group
            scale={2.40}
            position={[0, -1.26, -0.03]}
            onPointerUp={(e: any) => (e.target.releasePointerCapture(e.pointerId), setDragged(false))}
            onPointerDown={(e: any) => (e.target.setPointerCapture(e.pointerId), setDragged(new THREE.Vector3().copy(e.point)))}
          >
            <mesh geometry={nodes.card.geometry}>
              <meshPhysicalMaterial
                map={(materials.base as any).map}
                clearcoat={1}
                clearcoatRoughness={0.06}
                roughness={0.28}
                metalness={0.88}
                reflectivity={0.96 as any}
                envMapIntensity={1.3}
              />
            </mesh>
            <mesh geometry={nodes.clip.geometry} material={materials.metal} />
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
            <LinkRing />
            <ShineSweep />
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
          resolution={isSmall ? [1000, 1800] : [1200, 1200]}
          useMap
          map={tex}
          repeat={[-3.3, 1]}
          lineWidth={1.05}
          transparent
          opacity={0.98}
        />
      </mesh>
    </>
  )
}

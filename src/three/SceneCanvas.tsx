// src/three/SceneCanvas.tsx
import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Lightformer, Stars } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette, Noise, SMAA } from '@react-three/postprocessing'
import { memo, useMemo, useRef } from 'react'

export default function SceneCanvas() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Canvas
        dpr={[1, 1.8]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        camera={{ position: [0, 1.2, 6.5], fov: 34, near: 0.1, far: 200 }}
        onCreated={({ gl }) => gl.setClearColor(0x000000, 1)}
      >
        {/* Pencahayaan wajar */}
        <ambientLight intensity={0.25} />
        <directionalLight position={[4, 6, 2]} intensity={0.65} />
        <directionalLight position={[-3, 3, -2]} intensity={0.35} />

        {/* Lingkungan: tidak berlebihan */}
        <Environment resolution={256}>
          <Lightformer intensity={1.0} position={[0, 3, 6]} scale={[12, 12, 1]} />
          <Lightformer intensity={0.5} position={[-6, 0, 5]} />
          <Lightformer intensity={0.35} position={[6, -1, -3]} />
        </Environment>

        {/* Bintang halus */}
        <Stars radius={120} depth={40} count={2500} factor={2} saturation={0} fade speed={0.2} />

        {/* Lantai grid + ring energi */}
        <GroupFloor />
        <EnergyRings />

        {/* Bloom realistis */}
        <EffectComposer multisampling={0}>
          <Bloom
            intensity={0.35}           // glow lembut
            luminanceThreshold={0.55}  // hanya area terang yang benar-benar glow
            luminanceSmoothing={0.15}
            mipmapBlur
          />
          <SMAA />
          <Noise premultiply opacity={0.02} />
          <Vignette eskil={false} offset={0.2} darkness={0.6} />
        </EffectComposer>
      </Canvas>
    </div>
  )
}

/* ========================= Geometri ========================= */

const GroupFloor = memo(function GroupFloor() {
  return (
    <group position={[0, -0.35, 0]}>
      <HoloGrid />
      <Ground />
    </group>
  )
})

function Ground() {
  const mat = useMemo(() => {
    const m = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0x0a0a0f),
      metalness: 0.1,
      roughness: 0.95
    })
    return m
  }, [])
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <cylinderGeometry args={[80, 80, 0.02, 64]} />
      <primitive object={mat} attach="material" />
    </mesh>
  )
}

function HoloGrid() {
  const mat = useMemo(() => {
    const m = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#111319'),
      emissive: new THREE.Color('#b08a2a'),
      emissiveIntensity: 0.22,      // rendah agar tidak silau
      roughness: 0.9,
      metalness: 0.2
    })
    return m
  }, [])
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[160, 160, 40, 40]} />
      <primitive object={mat} attach="material" />
      {/* garis grid */}
      <gridHelper args={[120, 80, '#7d6a26', '#2d2a19']} position={[0, 0.002, 0]} />
    </mesh>
  )
}

function EnergyRings() {
  return (
    <group position={[0, 0.35, -0.2]}>
      <EnergyRing radius={3.6} width={0.18} emissive={0.9} speed={0.12} />
      <EnergyRing radius={2.6} width={0.14} emissive={0.8} speed={-0.08} />
    </group>
  )
}

function EnergyRing({
  radius,
  width,
  emissive,
  speed
}: {
  radius: number
  width: number
  emissive: number
  speed: number
}) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((_, dt) => {
    if (!ref.current) return
    ref.current.rotation.z += speed * dt
  })

  const mat = useMemo(() => {
    const m = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#e4c769'),
      emissive: new THREE.Color('#eacb75'),
      emissiveIntensity: emissive,    // <= pengendali glow ring
      transmission: 0.0,
      roughness: 0.35,
      metalness: 0.6,
      clearcoat: 1,
      clearcoatRoughness: 0.2
    })
    return m
  }, [emissive])

  return (
    <mesh ref={ref}>
      <torusGeometry args={[radius, width, 32, 180]} />
      <primitive object={mat} attach="material" />
    </mesh>
  )
}

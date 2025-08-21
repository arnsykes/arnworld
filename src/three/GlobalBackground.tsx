import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Stars, Grid } from '@react-three/drei'
import * as THREE from 'three'
import { Suspense, useEffect } from 'react'
import useScrollProgress from '../hooks/useScrollProgress'
import useUX from '../context/UX'
import WarpParticles from './WarpParticles'
import EnergyRing from './EnergyRing'
import LogoBillboard from './LogoBillboard'

function DPRController() {
  const { fx } = useUX()
  const { setDpr } = useThree()
  useEffect(() => {
    const base = window.devicePixelRatio || 1
    setDpr(fx === 'low' ? Math.min(1, base * 0.6) : fx === 'med' ? Math.min(1.2, base * 0.85) : Math.min(2, base))
  }, [fx, setDpr])
  return null
}

function ScrollRig({ progress }: { progress: number }) {
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    const g = state.scene.getObjectByName('rig') as THREE.Group
    if (!g) return
    const mx = state.pointer.x
    const my = state.pointer.y
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, my * 0.25, 0.06)
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, -mx * 0.35, 0.06)
    g.position.z = THREE.MathUtils.lerp(g.position.z, Math.sin(t * 0.4) * 0.5, 0.06)
    const s = 1 + progress * 0.12
    g.scale.setScalar(THREE.MathUtils.lerp(g.scale.x, s, 0.06))
  })
  return null
}

function ScrollCamera({ progress }: { progress: number }) {
  useFrame(({ camera }) => {
    const targetZ = 7.2 - progress * 3.2
    const targetY = progress * 1.2
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.06)
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.06)
    camera.lookAt(0, 0, 0)
  })
  return null
}

export default function GlobalBackground() {
  const { fx, reduced } = useUX()
  const progress = useScrollProgress()
  const stars = fx === 'low' ? 700 : fx === 'med' ? 1400 : 2200
  const warp = fx === 'low' ? 900 : fx === 'med' ? 1600 : 2400

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 7.2], fov: 50 }}>
        <Suspense fallback={null}>
          <DPRController />
          {!reduced && <Stars radius={90} depth={60} count={stars} factor={3} fade speed={1.2} />}
          {!reduced && <WarpParticles count={warp} progress={progress} />}

          <ambientLight intensity={0.6} />
          <directionalLight position={[6, 8, 4]} intensity={1.05} />

          <group name="rig">
            <LogoBillboard />
            {!reduced && <EnergyRing radius={2.8} />}
            {!reduced && <EnergyRing radius={4.2} speed={-0.4} thickness={0.06} />}
          </group>

          <Grid
            args={[60, 60]}
            cellSize={0.6}
            cellThickness={0.35}
            sectionSize={4}
            sectionThickness={0.9}
            fadeDistance={30}
            fadeStrength={1}
            infiniteGrid
            position={[0, -2.2, 0]}
            cellColor="#2a2a2f"
            sectionColor="#D4AF37"
          />

          <ScrollCamera progress={progress} />
          <ScrollRig progress={progress} />
        </Suspense>
      </Canvas>
    </div>
  )
}

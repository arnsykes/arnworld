import { useRef } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import * as THREE from 'three'

export default function LogoBillboard() {
  const ref = useRef<THREE.Mesh>(null)
  const tex = useLoader(THREE.TextureLoader, '/src/assets/logo.png')
  tex.anisotropy = 4

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (ref.current) {
      ref.current.rotation.y = Math.sin(t * 0.5) * 0.08
      ref.current.rotation.x = Math.cos(t * 0.5) * 0.05
    }
  })

  return (
    <mesh ref={ref} position={[0, 0, 0]}>
      <planeGeometry args={[3.6, 3.6]} />
      <meshStandardMaterial map={tex} transparent={true} />
    </mesh>
  )
}
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

type Props = {
  radius?: number
  thickness?: number
  speed?: number
  color?: string
}

export default function EnergyRing({
  radius = 3,
  thickness = 0.1,
  speed = 0.6,
  color = '#D4AF37',
}: Props) {
  const ring = useRef<THREE.Mesh>(null)
  const halo = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (ring.current) {
      ring.current.rotation.z += 0.002 * speed
      const s = 1 + Math.sin(t * 1.2) * 0.02
      ring.current.scale.setScalar(s)
    }
    if (halo.current) {
      halo.current.rotation.z -= 0.0015 * speed
    }
  })

  return (
    <group>
      {/* ring utama */}
      <mesh ref={ring}>
        <torusGeometry args={[radius, thickness, 32, 256]} />
        <meshBasicMaterial
          color={new THREE.Color(color)}
          transparent
          opacity={0.9}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* halo tipis untuk glow tambahan */}
      <mesh ref={halo}>
        <torusGeometry args={[radius * 1.02, thickness * 1.6, 16, 64]} />
        <meshBasicMaterial
          color={new THREE.Color(color)}
          transparent
          opacity={0.18}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  )
}

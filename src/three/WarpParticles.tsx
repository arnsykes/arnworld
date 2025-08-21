import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function WarpParticles({ count = 2500, progress = 0 }: { count?: number; progress?: number }) {
  const ref = useRef<THREE.Points>(null)

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 20 * Math.cbrt(Math.random())
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const x = r * Math.sin(phi) * Math.cos(theta)
      const y = r * Math.sin(phi) * Math.sin(theta)
      const z = r * Math.cos(phi)
      arr.set([x, y, z], i * 3)
    }
    return arr
  }, [count])

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return g
  }, [positions])

  const mat = useMemo(
    () =>
      new THREE.PointsMaterial({
        color: new THREE.Color('#ffffff'),
        size: 0.04,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.75
      }),
    []
  )

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.getElapsedTime()
    ref.current.rotation.y = t * 0.02 + progress * 1.5
    ref.current.rotation.x = Math.sin(t * 0.1) * 0.1
    mat.size = 0.02 + progress * 0.08
    mat.opacity = 0.6 + progress * 0.3
  })

  return <points ref={ref} geometry={geo} material={mat} />
}

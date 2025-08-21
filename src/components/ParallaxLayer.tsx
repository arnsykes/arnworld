import { motion, useScroll, useTransform } from 'framer-motion'
import { ReactNode, useRef } from 'react'

export default function ParallaxLayer({ children, speed = 0.2, className = '' }: { children: ReactNode; speed?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 1000], [0, -1000 * speed])
  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  )
}
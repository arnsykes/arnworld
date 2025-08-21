import { useEffect, useState } from 'react'
export default function TypeTitle({ text }:{text:string}) {
  const [out, setOut] = useState('')
  useEffect(() => {
    let i = 0; const id = setInterval(() => {
      setOut(text.slice(0, ++i)); if (i >= text.length) clearInterval(id)
    }, 18); return () => clearInterval(id)
  }, [text])
  return (
    <span className="type-title">
      <span className="shine-mask">{out}</span>
      <span className="caret">|</span>
    </span>
  )
}

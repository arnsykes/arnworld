import Section from '../components/Section'
import { useState } from 'react'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  function onChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email) || form.message.length < 10) {
      alert('Lengkapi form dengan benar.')
      return
    }
    // Kirim ke backend Anda di sini. Placeholder demo:
    setTimeout(() => setSent(true), 400)
  }

  return (
    <Section id="contact" title="Contact" subtitle="Siap diskusi proyek. Isi form, saya akan kembali ke Anda.">
      {sent ? (
        <div className="rounded-xl border border-base-line bg-base-card p-6">Terima kasih. Pesan Anda terkirim.</div>
      ) : (
        <form onSubmit={onSubmit} className="grid gap-4 max-w-xl">
          <input className="rounded-xl border border-base-line bg-transparent px-4 py-2" placeholder="Nama" name="name" value={form.name} onChange={onChange} />
          <input className="rounded-xl border border-base-line bg-transparent px-4 py-2" placeholder="Email" name="email" value={form.email} onChange={onChange} />
          <textarea className="rounded-xl border border-base-line bg-transparent px-4 py-2 min-h-[140px]" placeholder="Pesan" name="message" value={form.message} onChange={onChange} />
          <button type="submit" className="rounded-xl bg-gold-gradient px-5 py-2 font-medium text-black shadow-gold">Kirim</button>
        </form>
      )}
    </Section>
  )
}
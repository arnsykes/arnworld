import type { ProjectItem } from '../components/ProjectCard'

export const categories = ['All', 'Apps', 'Tools', 'Panels', 'Websites'] as const
export type Category = typeof categories[number]

export const projects: ProjectItem[] = [
  {
    id: 'p1',
    title: 'Panel Admin Pro',
    desc: 'Panel admin modular dengan RBAC, audit log, dan tema gelap.',
    tags: ['Panels', 'RBAC', 'Audit'],
    image: '/src/assets/placeholder.jpg',
    url: '#'
  },
  {
    id: 'p2',
    title: 'Tools Optimizer',
    desc: 'Tools CLI + UI untuk optimasi build dan analitik performa.',
    tags: ['Tools', 'Performance'],
    image: '/src/assets/placeholder.jpg'
  },
  {
    id: 'p3',
    title: 'Website Landing Pro',
    desc: 'Landing page modern dengan skor Lighthouse 95+.',
    tags: ['Websites', 'SEO'],
    image: '/src/assets/placeholder.jpg'
  },
  {
    id: 'p4',
    title: 'Mobile App Suite',
    desc: 'Super-app layanan dengan arsitektur modular dan push notif.',
    tags: ['Apps'],
    image: '/src/assets/placeholder.jpg'
  }
]
import { LucideFileSignature, LucideLayoutDashboard, LucideUsers } from 'lucide-react'

export const navigation = [
  {
    link: '/dashboard',
    label: 'Dashboard',
    isParent: false,
    icon: <LucideLayoutDashboard />,
  },
  {
    link: '/about',
    label: 'About',
    isParent: false,
    icon: <LucideUsers />,
  },
  {
    label: 'Report',
    isParent: true,
    icon: <LucideFileSignature />,
    children: [
      { label: 'Physical Assault', link: '/report' },
      { label: 'Student lateness', link: '/demo1' },
      { label: 'Exam cheating', link: '/demo2' },
    ],
  },
]

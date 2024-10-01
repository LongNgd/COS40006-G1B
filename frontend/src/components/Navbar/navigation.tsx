import {
  LucideFileSignature,
  LucideLayoutDashboard,
  LucideUsers,
} from 'lucide-react'

type NavigationItem = {
  link?: string
  label: string
  isParent: boolean
  icon?: JSX.Element
  children?: NavigationChild[]
}

type NavigationChild = Pick<NavigationItem, 'label' | 'link'>

export const navigation: NavigationItem[] = [
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

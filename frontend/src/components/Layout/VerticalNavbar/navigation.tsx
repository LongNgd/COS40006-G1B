import {
  LucideFileSignature,
  LucideLayoutDashboard,
  LucideMonitor,
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
    link: '/monitoring',
    label: 'Camera Monitoring',
    isParent: false,
    icon: <LucideMonitor />,
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

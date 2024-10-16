import { Outlet, useLocation } from '@tanstack/react-router'

import { useState } from 'react'
import { ScrollArea } from '../ui/scroll-area'
import HorizontalNavbar from './HorizontalNavbar/HorizontalNavbar'
import { navigation } from './VerticalNavbar/navigation'
import VerticalNavbar from './VerticalNavbar/VerticalNavbar'

const Layout = () => {
  const location = useLocation()

  const getLabel = () => {
    const navItem = navigation.find((item) => item.link === location.pathname)
    if (navItem) return navItem.label
    const childItem = navigation
      .map((item) => item.children)
      .flat()
      .find((item) => item?.link === location.pathname)

    if (childItem) return childItem.label
    return ''
  }

  const [name, setName] = useState(getLabel)

  const handleClick = (itemName: string) => {
    setName(itemName)
  }
  return (
    <div className="flex">
      <VerticalNavbar getLabel={handleClick} />
      <ScrollArea className="flex-1 h-lvh">
        <HorizontalNavbar name={name} />
        <div className="m-4">
          <Outlet />
        </div>
      </ScrollArea>
    </div>
  )
}

export default Layout

import { Outlet, useLocation } from '@tanstack/react-router'

import HorizontalNavbar from '../Navbar/HorizontalNavbar'
import Navbar from '../Navbar/Navbar'
import { ScrollArea } from '../ui/scroll-area'
import { useState } from 'react'
import { navigation } from '../Navbar/navigation'

const Layout = () => {
  const location = useLocation()

  const [name, setName] = useState(
    () =>
      navigation.find((item) => item.link === location.pathname)?.label,
  )

  const handleClick = (itemName: string) => {
    setName(itemName)
  }
  return (
    <div className="flex">
      <Navbar getLabel={handleClick} />
      <ScrollArea className="flex-1 h-lvh">
        <HorizontalNavbar name={name} />
        <Outlet />
      </ScrollArea>
    </div>
  )
}

export default Layout

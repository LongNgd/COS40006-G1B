import { Outlet } from '@tanstack/react-router'

import HorizontalNavbar from '../Navbar/HorizontalNavbar'
import Navbar from '../Navbar/Navbar'
import { ScrollArea } from '../ui/scroll-area'
import { useState } from 'react'

const Layout = () => {
  const [name, setName] = useState<string>('Dashboard') // Specify type for useState
  const handleClick = (itemName: string) => { // Specify type for itemName
    setName(itemName) // Pass itemName to setName
  }
  return (
    <div className="flex">
      <Navbar handleItemClick={handleClick}/>
      <ScrollArea className="p-4 flex-1 h-lvh">
        <HorizontalNavbar name={name}/>
        <Outlet />
      </ScrollArea>
    </div>
  )
}

export default Layout

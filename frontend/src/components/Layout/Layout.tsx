import { Outlet } from "@tanstack/react-router"

import HorizontalNavbar from "../Navbar/HorizontalNavbar"
import Navbar from "../Navbar/Navbar"

const Layout = () => {
  return (
    <div className="flex">
      <Navbar />
      <div className="p-4 flex-1">
        <HorizontalNavbar />
        <Outlet />
      </div>
    </div>
  )
}

export default Layout

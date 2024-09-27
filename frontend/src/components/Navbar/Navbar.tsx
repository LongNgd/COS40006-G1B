import { Link, useNavigate } from '@tanstack/react-router'
import { LucideActivitySquare, LucideLogOut } from 'lucide-react'
import { navigation } from './navigation'
import React from 'react'
import { useAuth } from '../../hooks/useAuth.hook'

const Navbar: React.FC<{ handleItemClick: (item: string) => void }> = ({
  handleItemClick,
}) => {
  const navigate = useNavigate()
  const { signOut } = useAuth()

  const handleSignOut = () => {
    signOut()
    navigate({ to: '/' })
  }
  return (
    <div className="flex flex-col w-64 text-[#d0cde4] bg-[#2f3349] p-3 h-lvh">
      <div className="text-2xl font-bold flex gap-2 items-center">
        <LucideActivitySquare />
        Visualization Tool
      </div>
      <nav className='flex-grow'>
        {navigation.map((item, index) => (
          <Link
            key={index}
            to={item.link}
            className="flex gap-2 items-center mt-2 py-1 px-6
            hover:bg-[#3d4056] rounded text-lg"
            activeProps={{
              className: 'bg-primary hover:bg-primary text-[white]',
            }}
            onClick={() => handleItemClick(item.name)}
          >
            {React.createElement(item.icon)}
            {item.name}
          </Link>
        ))}
      </nav>
      <a
        className="flex gap-2 items-center mt-2 py-1 px-6 hover:bg-[#ff0000] hover:cursor-pointer rounded text-lg"
        onClick={handleSignOut}
      >
        <LucideLogOut />
        Logout
      </a>
    </div>
  )
}

export default Navbar

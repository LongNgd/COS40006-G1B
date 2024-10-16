import { Link, useNavigate } from '@tanstack/react-router'
import { LucideLogOut, LucideUserRoundCog } from 'lucide-react'
import { useAuth } from '../../../hooks/useAuth.hook'
import { Button } from 'antd'

const User = () => {
  const navigate = useNavigate()
  const { signOut } = useAuth()

  const handleSignOut = () => {
    signOut()
    navigate({ to: '/' })
  }
  return (
    <>
      <Link
        to="/profile"
        className="flex gap-2 items-center p-2 hover:bg-[#d3d3d3] rounded"
      >
        <LucideUserRoundCog />
        Profile
      </Link>
      <Button
        className="w-full flex gap-2 items-center p-2 rounded"
        color="danger"
        variant="text"
        onClick={handleSignOut}
      >
        <LucideLogOut />
        Logout
      </Button>
    </>
  )
}

export default User

import { LucideBell, LucideLogOut, LucideSun, LucideUserRoundCog } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Link, useNavigate } from '@tanstack/react-router'
import { useAuth } from '../../hooks/useAuth.hook'

const HorizontalNavbar: React.FC<{ name: string | undefined }> = ({ name }) => {
  const navigate = useNavigate()
  const { signOut } = useAuth()

  const handleSignOut = () => {
    signOut()
    navigate({ to: '/' })
  }
  return (
    <div className="m-4 flex justify-between items-center sticky top-0 z-50">
      <div className="p-2 text-3xl font-bold">{name}</div>
      <div className="text-md text-muted-foreground">Assume that today is 2024-09-29</div>
      <div className="p-2 flex items-center gap-4">
        <LucideSun className="w-5 h-5" />
        <LucideBell className="w-5 h-5" />
        <Popover>
          <PopoverTrigger>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </PopoverTrigger>
          <PopoverContent className="mr-4 w-48">
            <Link to='/profile' className="flex gap-2 items-center p-2 hover:bg-[#d3d3d3] rounded">
              <LucideUserRoundCog />
              Profile
            </Link>
            <button type='submit' className="w-full flex gap-2 items-center p-2 hover:bg-[#d3d3d3] rounded" onClick={handleSignOut}>
              <LucideLogOut />
              Logout
            </button>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}

export default HorizontalNavbar

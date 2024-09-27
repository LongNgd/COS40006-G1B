import { LucideBell, LucideSun } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

const HorizontalNavbar: React.FC<{ name: string }>  = ({name}) => {
  return (
    <div className="bg-[#d3d3d3] mb-4 flex justify-between rounded items-center">
      <div className='p-2'>{name}</div>
      <div className="p-2 flex items-center gap-4">
        <LucideSun className="w-5 h-5" />
        <LucideBell className="w-5 h-5" />
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  )
}

export default HorizontalNavbar

import { LucideBell, LucideSun } from "lucide-react"

const HorizontalNavbar = () => {
  return (
    <div className="p-2 rounded flex flex-row-reverse items-center gap-4">
      <LucideBell className='w-5 h-5'/>
      <LucideSun className='w-5 h-5'/>
    </div>
  )
}

export default HorizontalNavbar

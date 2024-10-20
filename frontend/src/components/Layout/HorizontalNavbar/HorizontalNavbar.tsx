import { Avatar, Badge, Popover } from 'antd'
import { LucideBell, LucideSun } from 'lucide-react'
import { useState } from 'react'
import Notification from './Notification'
import User from './User'
import { useGetNotificationQuery } from '../../../api/notificationApi'

const HorizontalNavbar: React.FC<{ name: string | undefined }> = ({ name }) => {
  const [openAvatar, setOpenAvatar] = useState(false)
  const [openNotification, setOpenNotification] = useState(false)

  const { data: notification } = useGetNotificationQuery()

  const unRead = notification?.length

  return (
    <div className="m-4 flex justify-between items-center sticky top-0 z-50">
      <div className="p-2 text-3xl font-bold">{name}</div>
      <div className="text-md text-muted-foreground">
        Assume that today is 2024-09-29
      </div>
      <div className="p-2 flex items-center gap-4">
        <LucideSun className="w-5 h-5" />
        <Popover
          content={<Notification data={notification || []}/>}
          trigger="click"
          title={<p className="text-xl font-bold">Notification</p>}
          open={openNotification}
          onOpenChange={setOpenNotification}
          placement="bottomRight"
        >
          <Badge size="small" count={unRead}>
            <LucideBell className="w-5 h-5 hover:cursor-pointer" />
          </Badge>
        </Popover>
        <Popover
          content={<User />}
          trigger="click"
          open={openAvatar}
          onOpenChange={setOpenAvatar}
          placement="bottomRight"
        >
          <Avatar
            size={'large'}
            src={<img src={'https://github.com/shadcn.png'} alt="avatar" />}
          />
        </Popover>
      </div>
    </div>
  )
}

export default HorizontalNavbar

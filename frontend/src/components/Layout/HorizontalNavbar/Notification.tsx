import { Flex } from 'antd'
import type { Notification } from '../../../type/notification.type'

interface NotificationProps {
  data: Notification[]
}

const Notification = (data: NotificationProps) => {
  return (
    <>
      {data.data.map((item) => {
        return (
          <Flex key={item.noti_id} gap="small" vertical>
            <Flex justify='space-between' align='center'>
              <p className="font-semibold">{item.title}</p>
              <p className="text-muted-foreground">{item.date}</p>
            </Flex>
            <p>{item.desc}</p>
          </Flex>
        )
      })}
    </>
  )
}

export default Notification

import { Flex, List } from 'antd'
import type { Notification } from '../../../type/notification.type'
import { ScrollArea } from '../../ui/scroll-area'

interface NotificationProps {
  data: Notification[]
}

const Notification = (data: NotificationProps) => {
  return (
    <ScrollArea className="h-60">
      <List
        dataSource={data.data}
        renderItem={(item) => (
          <List.Item key={item.noti_id}>
            <Flex className="mr-4 w-full" gap="small" vertical>
              <Flex justify="space-between" align="center">
                <p className="font-semibold">{item.title}</p>
                <p className="text-muted-foreground">{item.date}</p>
              </Flex>
              <p>{item.desc}</p>
            </Flex>
          </List.Item>
        )}
      />
    </ScrollArea>
  )
}

export default Notification

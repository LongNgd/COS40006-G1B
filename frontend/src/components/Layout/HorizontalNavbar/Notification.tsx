import { Button, Empty, Flex, List, Typography } from 'antd'
import type { Notification } from '../../../type/notification.type'
import { ScrollArea } from '../../ui/scroll-area'
import { useDeleteAllNotificationMutation } from '../../../api/notificationApi'

interface NotificationProps {
  data: Notification[]
}

const Notification = (data: NotificationProps) => {
  const [deleteNotification, { isLoading }] = useDeleteAllNotificationMutation()
  const HandleDelete = async () => {
    await deleteNotification()
  }
  return (
    <>
      <Flex justify="space-between" align="center" className="mb-2">
        <p className="text-xl font-bold">Notification</p>
        <Button
          color="danger"
          variant="text"
          onClick={HandleDelete}
          disabled={isLoading}
        >
          Clear All
        </Button>
      </Flex>
      <ScrollArea className="w-auto h-40">
        {data.data.length === 0 ? (
          <Empty
            description={
              <Typography.Text>
                There are no notifications to display
              </Typography.Text>
            }
          />
        ) : (
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
        )}
      </ScrollArea>
    </>
  )
}

export default Notification

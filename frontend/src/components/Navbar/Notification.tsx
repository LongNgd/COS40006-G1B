import { Badge, Dropdown, Flex, MenuProps } from 'antd'
import { LucideBell } from 'lucide-react'

const items: MenuProps['items'] = [
  {
    label: <p className='text-xl font-bold'>Notification</p>,
    key: 'header',
  },
  {
    type: 'divider',
  },
  {
    label: (
      <Flex gap="small" vertical>
        <p className="font-semibold">Camera 1 is now being monitored</p>
        <p>You will be notified if any anomalies are detected in this camera</p>
      </Flex>
    ),
    key: '0',
  },
  {
    label: (
      <Flex gap="small" vertical>
        <p className="font-semibold">Camera 1 is now being monitored</p>
        <p>You will be notified if any anomalies are detected in this camera</p>
      </Flex>
    ),
    key: '1',
  },
  {
    label: (
      <Flex gap="small" vertical>
        <p className="font-semibold">Camera 1 is now being monitored</p>
        <p>You will be notified if any anomalies are detected in this camera</p>
      </Flex>
    ),
    key: '2',
  },
]

const Notification = () => {
  return (
    <Dropdown menu={{ items }} trigger={['click']}>
      <Badge count={3}>
        <LucideBell className="w-6 h-6" />
      </Badge>
    </Dropdown>
  )
}

export default Notification

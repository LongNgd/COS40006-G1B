import { Flex } from 'antd'

const items = [
  {
    title: 'Camera 1 is now being monitored',
    description:
      'You will be notified if any anomalies are detected in this camera',
    key: '0',
  },
  {
    title: 'Camera 1 is now being monitored',
    description:
      'You will be notified if any anomalies are detected in this camera',
    key: '1',
  },
  {
    title: 'Camera 1 is now being monitored',
    description:
      'You will be notified if any anomalies are detected in this camera',
    key: '2',
  },
]

const Notification = () => {
  return (
    <>
      {items.map((item) => {
        if (!item) return null
        return (
          <Flex key={item.key} gap="small" vertical>
            <p className="font-semibold">{item.title}</p>
            <p>{item.description}</p>
          </Flex>
        )
      })}
    </>
  )
}

export default Notification

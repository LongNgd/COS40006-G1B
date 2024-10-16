import {
  Button,
  Card,
  Col,
  Flex,
  Modal,
  notification,
  Popover,
  Row,
  Switch,
} from 'antd'
import { CircleMinus, Info, LucidePlus } from 'lucide-react'
import { useState } from 'react'
import { useGetAnomaliesQuery } from '../../api/anomaliesApi'

const content = (
  <div>
    <p>Content</p>
    <p>Content</p>
  </div>
)

const Monitoring = () => {
  const [api, contextHolder] = notification.useNotification()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { data: anomalies } = useGetAnomaliesQuery()

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const openNotification = (name: string) => {
    api.info({
      message: `Camera ${name} is now being monitored`,
      description:
        'You will be notified if any anomalies are detected in this camera',
      placement: 'bottomRight',
    })
  }

  const camera = Array.from(
    new Set(anomalies?.data.map(({ camera_name }) => camera_name)),
  )
  return (
    <>
      {contextHolder}
      <Button type="primary" icon={<LucidePlus />} onClick={showModal}>
        Open Modal
      </Button>
      <Modal
        title="Adding Camera "
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        Camera List will be display in here
      </Modal>
      <Row gutter={[16, 24]}>
        {camera.map((item) => {
          return (
            <Col className="gutter-row" span={6} key={item}>
              <Card
                actions={[
                  <Switch
                    defaultChecked
                    onChange={() => openNotification(item)}
                  />,
                  <Flex justify="center" align="center">
                    <CircleMinus key="setting" />
                  </Flex>,
                  <Flex justify="center" align="center">
                    <Popover content={content} title="Camera Information" placement="bottom" arrow={false}>
                      <Info key="ellipsis" />
                    </Popover>
                  </Flex>,
                ]}
              >
                <p>{item}</p>
              </Card>
            </Col>
          )
        })}
      </Row>
    </>
  )
}

export default Monitoring

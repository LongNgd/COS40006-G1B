import { Button, Card, Col, Flex, Modal, notification, Row, Switch } from 'antd'
import { Info, LucidePlus, Wrench } from 'lucide-react'
import { useGetAnomaliesQuery } from '../../api/anomaliesApi'
import { useState } from 'react'

const Monitoring = () => {
  const [api, contextHolder] = notification.useNotification()
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: anomalies } = useGetAnomaliesQuery()

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

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
      <Button type="primary" icon={<LucidePlus/>} onClick={showModal}>
        Open Modal
      </Button>
      <Modal title="Adding Camera " open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        Camera List will be display in here
      </Modal>
      <Row gutter={[16, 24]}>
        {camera.map((item) => {
          return (
            <Col className="gutter-row" span={6}>
              <Card
                key={item}
                actions={[
                  <Switch
                    defaultChecked
                    onChange={() => openNotification(item)}
                  />,
                  <Flex justify="center" align="center">
                    <Wrench key="setting" />
                  </Flex>,
                  <Flex justify="center" align="center">
                    <Info key="ellipsis" />
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

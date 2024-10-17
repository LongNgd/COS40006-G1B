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
import { useEffect, useState } from 'react'
import {
  useGetCameraByUserMutation,
  useGetCameraStatusMutation,
} from '../../api/cameraApi'
import { Camera } from '../../type/camera.type'

const Monitoring = () => {
  const [api, contextHolder] = notification.useNotification()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [getCameraByUser, { error, data: camera }] =
    useGetCameraByUserMutation()
  const [getCameraStatus] = useGetCameraStatusMutation()

  useEffect(() => {
    const getUser = localStorage.getItem('user')
    const user = getUser ? JSON.parse(getUser) : null
    const getData = async () => {
      await getCameraByUser({ user_id: user?.user_id })
    }
    getData()
  }, [getCameraByUser])

  if (error) return <div>Error: {JSON.stringify(error)}</div>

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const modifyStatus = async (camera: Camera, status: boolean) => {
    if (camera.status === 1) {
      status = false
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      status = true
    }

    await getCameraStatus({ camera_id: camera.camera_id })
    api.info({
      message: `Camera ${camera.name} is now being monitored`,
      description: `You will be notified if any anomalies are detected in this camera`,
      placement: 'bottomRight',
    })
  }

  return (
    <>
      {contextHolder}
      <Button
        type="primary"
        icon={<LucidePlus />}
        onClick={showModal}
        className="mb-4"
      >
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
        {camera?.map((item) => {
          return (
            <Col className="gutter-row" span={6} key={item.camera_id}>
              <Card
                actions={[
                  <Switch
                    onChange={(checked) => modifyStatus(item, checked)}
                    defaultChecked={item.status === 1 ? true : false}
                  />,
                  <Flex justify="center" align="center">
                    <CircleMinus key="setting" />
                  </Flex>,
                  <Flex justify="center" align="center">
                    <Popover
                      content={
                        <p>
                          Camera {item.name} is used in {item.area}
                        </p>
                      }
                      placement="bottom"
                      arrow={false}
                    >
                      <Info key="ellipsis" />
                    </Popover>
                  </Flex>,
                ]}
              >
                <p>{item.name}</p>
              </Card>
            </Col>
          )
        })}
      </Row>
    </>
  )
}

export default Monitoring

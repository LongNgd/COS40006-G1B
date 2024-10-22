import {
  Button,
  Card,
  Col,
  Flex,
  message,
  Modal,
  notification,
  Popconfirm,
  PopconfirmProps,
  Row,
  Switch,
} from 'antd'
import { CircleMinus, LucidePlus, LucideSettings } from 'lucide-react'
import { useEffect, useState } from 'react'
import {
  useGetCameraByUserMutation,
  useGetCameraStatusMutation,
} from '../../api/cameraApi'
import { Camera } from '../../type/camera.type'
import CameraList from './CameraList'
import ReactPlayer from 'react-player'

const Monitoring = () => {
  const [api, contextHolder] = notification.useNotification()
  const [isCameraList, setIsCameraList] = useState(false)
  const [isEvidence, setIsEvidence] = useState(false)

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

  const modifyStatus = async (camera: Camera, status: boolean) => {
    await getCameraStatus({ camera_id: camera.camera_id })
    api.info({
      message: `Camera ${camera.name} is ${status ? 'ON' : 'OFF'}`,
      description: `You will ${status ? '' : 'NOT'} be notified if any anomalies are detected in this camera`,
      placement: 'bottomRight',
    })
    if (camera.status === 1) {
      status = false
    } else {
      status = true
    }
  }

  const confirm: PopconfirmProps['onConfirm'] = (e) => {
    console.log(e)
    message.success('Remove successfully')
  }

  return (
    <>
      {contextHolder}
      <Button
        type="primary"
        icon={<LucidePlus />}
        onClick={() => setIsCameraList(true)}
        className="mb-4"
      >
        Connect to Camera
      </Button>
      <Modal
        title="Adding Camera "
        open={isCameraList}
        onCancel={() => setIsCameraList(false)}
      >
        <CameraList />
      </Modal>
      <Row gutter={[16, 24]}>
        {camera?.data.map((item) => {
          return (
            <Col className="gutter-row" span={6} key={item.camera_id}>
              <Card
                hoverable
                actions={[
                  <Switch
                    onChange={(status) => modifyStatus(item, status)}
                    defaultChecked={item.status === 1 ? true : false}
                  />,
                  <Flex justify="center" align="center">
                    <Popconfirm
                      title="Delete the Camera"
                      description={`Are you sure you want to delete ${item.name}?`}
                      onConfirm={confirm}
                      okText="Yes"
                      cancelText="No"
                    >
                      <CircleMinus key="setting" />
                    </Popconfirm>
                  </Flex>,
                  <Flex justify="center" align="center">
                    <LucideSettings />
                  </Flex>,
                ]}
                onClick={() => setIsEvidence(true)}
              >
                <p>{item.name}</p>
              </Card>
              <Modal
                width={700}
                title="Show Evidence Video"
                open={isEvidence}
                onCancel={() => setIsEvidence(false)}
              >
                <Flex align="center" justify="center">
                  <ReactPlayer
                    url="../../src/assets/violence.mp4"
                    playing
                    loop
                  />
                </Flex>
              </Modal>
            </Col>
          )
        })}
      </Row>
    </>
  )
}

export default Monitoring

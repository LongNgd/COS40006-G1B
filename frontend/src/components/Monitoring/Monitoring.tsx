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
import { CircleMinus, LucideAppWindow } from 'lucide-react'
import { useState } from 'react'
import ReactPlayer from 'react-player'
import {
  useGetCameraByUserQuery,
  useUpdateCameraStatusMutation,
} from '../../api/cameraApi'
import { Camera } from '../../type/camera.type'
import CameraList from './CameraList'

const Monitoring = () => {
  const [api, contextHolder] = notification.useNotification()
  const [isEvidence, setIsEvidence] = useState(false)
  const getUser = localStorage.getItem('user')
  const user = getUser ? JSON.parse(getUser) : null

  const { data: camera, isLoading } = useGetCameraByUserQuery(user)
  const [getCameraStatus] = useUpdateCameraStatusMutation()

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
      <CameraList />
      <Row gutter={[16, 24]}>
        {camera?.data.map((item) => {
          return (
            <Col className="gutter-row" span={6} key={item.camera_id}>
              <Card
                loading={isLoading}
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
                  <Button
                    type="link"
                    icon={<LucideAppWindow />}
                    onClick={() => setIsEvidence(true)}
                    disabled={item.status === 0}
                  />,
                ]}
              >
                <p>{item.name}</p>
              </Card>
              <Modal
                width={700}
                title={item.name}
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

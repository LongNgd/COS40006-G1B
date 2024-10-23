import { Button, Card, Col, Flex, Modal, Row } from 'antd'
import { LucideInfo, LucidePlus } from 'lucide-react'
import { useState } from 'react'
import {
  useAssignCameraMutation,
  useGetUnassignCameraByUserQuery,
} from '../../api/cameraApi'

const CameraList = () => {
  const [isCameraList, setIsCameraList] = useState(false)
  const getUser = localStorage.getItem('user')
  const user = getUser ? JSON.parse(getUser) : null

  const { error, data: camera } = useGetUnassignCameraByUserQuery(user)
  const [assignCamera] = useAssignCameraMutation()

  if (error) return <div>Error: {JSON.stringify(error)}</div>

  const handleAssignCamera = async (camera_id: number) => {
    await assignCamera({ user_id: user?.user_id, camera_id: camera_id })
    setIsCameraList(false)
  }

  return (
    <>
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
        footer={null}
      >
        <Row gutter={[16, 24]}>
          {camera?.data.map((item) => {
            return (
              <Col className="gutter-row" span={6} key={item.camera_id}>
                <Card
                  actions={[
                    <Flex justify="center" align="center">
                      <LucidePlus
                        onClick={() => handleAssignCamera(item.camera_id)}
                      />
                    </Flex>,
                    <Flex justify="center" align="center">
                      <LucideInfo />
                    </Flex>,
                  ]}
                >
                  <p>{item.name}</p>
                </Card>
              </Col>
            )
          })}
        </Row>
      </Modal>
    </>
  )
}

export default CameraList

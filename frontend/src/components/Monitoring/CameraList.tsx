import { Card, Col, Flex, Row } from 'antd'
import { useGetUnassignCameraByUserMutation } from '../../api/cameraApi'
import { useEffect } from 'react'
import { LucideInfo, LucidePlus } from 'lucide-react'

const CameraList = () => {
  const [getUnassignCamera, { error, data: camera }] =
    useGetUnassignCameraByUserMutation()

  useEffect(() => {
    const getUser = localStorage.getItem('user')
    const user = getUser ? JSON.parse(getUser) : null
    const getData = async () => {
      await getUnassignCamera({ user_id: user?.user_id })
    }
    getData()
  }, [getUnassignCamera])

  if (error) return <div>Error: {JSON.stringify(error)}</div>

  return (
    <Row gutter={[16, 24]}>
      {camera?.data.map((item) => {
        return (
          <Col className="gutter-row" span={6} key={item.camera_id}>
            <Card
              actions={[
                <Flex justify="center" align="center">
                  <LucidePlus />
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
  )
}

export default CameraList

import {
  LucideActivity,
  LucideCamera,
  LucideOctagonAlert,
  LucideUser,
} from 'lucide-react'
import { useGetCameraByUserMutation } from '../../api/cameraApi'
import { Anomaly } from '../../type/anomaly.type'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { useEffect } from 'react'

interface OverallInformationProps {
  data: Anomaly[]
  loading: boolean
}

export const OverallInformation = ({
  data,
  loading,
}: OverallInformationProps) => {
  const [getCameraByUser, { isLoading, error, data: camera }] =
    useGetCameraByUserMutation()

  useEffect(() => {
    const getUser = localStorage.getItem('user')
    const user = getUser ? JSON.parse(getUser) : null
    const getData = async () => {
      await getCameraByUser({ user_id: user?.user_id })
    }
    getData()
  }, [getCameraByUser])

  if (error) return <div>Error: {JSON.stringify(error)}</div>

  const activeCamera = camera?.length

  const totalAnomaly = data.length
  const averageParticipant = data.reduce(
    (acc, curr, _, { length }) => acc + curr.participant / length,
    0,
  )
  const withWeapon = data.filter((anomaly) => anomaly.warning === 1).length

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Camera</CardTitle>
          <LucideCamera />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {isLoading ? '-' : activeCamera}
          </div>
          <p className="text-xs text-muted-foreground">
            Active Camera in specific day
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Anomaly</CardTitle>
          <LucideOctagonAlert />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {loading ? '-' : totalAnomaly}
          </div>
          <p className="text-xs text-muted-foreground">
            Total anomaly in specific day
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Average of Participant
          </CardTitle>
          <LucideUser />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {loading ? '-' : averageParticipant?.toFixed(2)}
          </div>
          <p className="text-xs text-muted-foreground">
            Average of Participant in specific day
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Anomaly with weapon
          </CardTitle>
          <LucideActivity />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{loading ? '-' : withWeapon}</div>
          <p className="text-xs text-muted-foreground">
            Number of Anomaly with weapon
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

export default OverallInformation

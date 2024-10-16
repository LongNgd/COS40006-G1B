import {
  LucideActivity,
  LucideCamera,
  LucideOctagonAlert,
  LucideUser,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Anomaly } from '../../type/anomaly.type'
import { useGetAnomaliesQuery } from '../../api/anomaliesApi'

export const OverallInformation = ({ data }: { data: Anomaly[] }) => {
  const { data: anomalies } = useGetAnomaliesQuery()
  const isLoading = !data

  const activeCamera = Array.from(
    new Set(anomalies?.data.map(({ camera_area }) => camera_area)),
  ).length
  
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
            {isLoading ? '-' : totalAnomaly}
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
            {isLoading ? '-' : averageParticipant?.toFixed(2)}
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
          <div className="text-2xl font-bold">
            {isLoading ? '-' : withWeapon}
          </div>
          <p className="text-xs text-muted-foreground">
            Number of Anomaly with weapon
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

export default OverallInformation

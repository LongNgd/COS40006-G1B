import { LucideActivity, LucideCamera, LucideOctagonAlert, LucideUser } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'

const OverallInformation = () => {

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Camera</CardTitle>
          <LucideCamera />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">100</div>
          <p className="text-xs text-muted-foreground">
            +20.1% from last month
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Anomaly</CardTitle>
          <LucideOctagonAlert/>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">1234</div>
          <p className="text-xs text-muted-foreground">
            +180.1% from last month
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Average of Paticipant
          </CardTitle>
          <LucideUser/>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">3.4</div>
          <p className="text-xs text-muted-foreground">+19% from last month</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Anomaly with weapon
          </CardTitle>
          <LucideActivity/>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">34</div>
          <p className="text-xs text-muted-foreground">+201 since last hour</p>
        </CardContent>
      </Card>
    </div>
  )
}

export default OverallInformation

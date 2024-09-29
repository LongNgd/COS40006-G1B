import { TrendingDown } from 'lucide-react'
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '../ui/chart'
import { anomalyData } from '../../assets/anomalydata'

interface Line_GraphProps {
  timeRange: string
}

const chartConfig = {
  number_of_anomalies: {
    label: 'Num of Anomalies',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig

export function Line_Graph({ timeRange }: Line_GraphProps) {
  const filteredData = anomalyData.filter((item) => {
    const [day, month, year] = item.date.split('/').map(Number) // Parse date correctly
    const date = new Date(year, month - 1, day) // Create date object
    const now = new Date('2024-07-02') // Adjusted date format
    let daysToSubtract = 7
    if (timeRange === 'month') {
      daysToSubtract = 30
    } else if (timeRange === '3month') {
      daysToSubtract = 90
    }
    now.setDate(now.getDate() - daysToSubtract)
    console.log(date, now)

    return date >= now
  })
  return (
    <Card>
      <CardHeader>
        <CardTitle>Number of Anomalies</CardTitle>
        <CardDescription>Number of Anomalies per Week</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart data={filteredData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              label={{ value: 'Day', position: 'insideBottom', offset: 0 }}
            />
            <YAxis
              label={{ value: 'Anomalies', angle: -90, position: 'insideLeft' }}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="number_of_anomalies"
              type="monotone"
              stroke={chartConfig.number_of_anomalies.color}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending down by 5.2% <TrendingDown className="h-4 w-4" />
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}

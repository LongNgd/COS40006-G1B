import { TrendingDown } from 'lucide-react'
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts'
import { useGetAnomaliesQuery } from '../../api/anomaliesApi'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '../ui/chart'

interface Line_GraphProps {
  timeRange: string
}

const chartConfig = {
  total: {
    label: 'Total of Anomalies',
    color: '#e11d48',
  }
} satisfies ChartConfig

export function AnomalyByDate({ timeRange }: Line_GraphProps) {
  const { data: anomalies, error, isLoading } = useGetAnomaliesQuery()

  if (isLoading) return <div>Loading...</div>
  if (error || !anomalies) return <div>Error: {JSON.stringify(error)}</div>

  const anomalyByDate = Object.entries(
    anomalies.data.reduce(
      (acc, curr) => {
        const date = curr.date
        if (!acc[date]) {
          acc[date] = { total: 0 }
        }
        acc[date].total += 1
        return acc
      },
      {} as Record<string, { total: number }>,
    ),
  ).map(([date, counts]) => ({
    date,
    total: counts.total,
  }))

  // const filteredData = anomalies?.data.filter((item) => {
  //   const [day, month, year] = item.date.split('/').map(Number) // Parse date correctly
  //   // console.log([day, month, year])
  //   const date = new Date(year, month - 1, day) // Create date object
  //   const now = new Date('2024-07-02') // Adjusted date format
  //   let daysToSubtract = 7
  //   if (timeRange === 'month') {
  //     daysToSubtract = 30
  //   } else if (timeRange === '3month') {
  //     daysToSubtract = 90
  //   }
  //   now.setDate(now.getDate() - daysToSubtract)

  //   return date >= now
  // })
  return (
    <Card>
      <CardHeader>
        <CardTitle>Anomalies Over Time</CardTitle>
        <CardDescription>Number of anomalies per week over the selected time period</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart data={anomalyByDate}>
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
              dataKey="total"
              type="monotone"
              stroke={chartConfig.total.color}
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

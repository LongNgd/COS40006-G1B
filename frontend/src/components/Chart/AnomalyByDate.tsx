import { TrendingDown } from 'lucide-react'
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts'
import { Anomaly } from '../../api/anomaly.type'
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

const chartConfig = {
  total: {
    label: 'Total of Anomalies',
    color: '#e11d48',
  },
} satisfies ChartConfig

export function AnomalyByDate({ data }: { data: Anomaly[] }) {
  const checkDataDate = Array.from(new Set(data.map(({ date }) => date)))

  const anomalyByDate = Object.entries(
    data.reduce(
      (acc, curr) => {
        let key
        if (checkDataDate.length === 1) {
          key = curr.time
        } else {
          key = curr.date
        }

        if (!acc[key]) {
          acc[key] = { total: 0 }
        }

        acc[key].total += 1

        return acc
      },
      {} as Record<string, { total: number }>,
    ),
  ).map(([date, counts]) => ({
    date,
    total: counts.total,
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Anomalies Over Time</CardTitle>
        <CardDescription>
          Number of anomalies per week over the selected time period
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart data={anomalyByDate}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="date" />
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

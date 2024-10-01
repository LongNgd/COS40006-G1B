import { TrendingUp } from 'lucide-react'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'

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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '../ui/chart'
import { useGetAnomaliesQuery } from '../../redux/anomaliesApi'

const chartConfig = {
  true: {
    label: 'have weapon',
    color: 'hsl(var(--chart-1))',
  },
  false: {
    label: 'no weapon',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig

export function AnomalybyWeapon() {
  const { data: anomalies, error, isLoading } = useGetAnomaliesQuery()

  if (isLoading) return <div>Loading...</div>
  if (error || !anomalies) return <div>Error: {JSON.stringify(error)}</div>
  
  const warningsByDate = Object.entries(
    anomalies.data.reduce(
      (acc, curr) => {
        const date = curr.date
        if (!acc[date]) {
          acc[date] = { true: 0, false: 0 }
        }
        const warningKey = curr.warning ? 'true' : 'false'
        acc[date][warningKey] += 1
        return acc
      },
      {} as Record<string, { true: number; false: number }>,
    ),
  ).map(([date, counts]) => ({
    date,
    true: counts.true,
    false: counts.false,
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Anomaly by Weapon</CardTitle>
        <CardDescription>Anomaly by Weapon</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={warningsByDate}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              label={{ value: 'Anomalies', angle: -90, position: 'insideLeft' }}
            />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="true"
              stackId="a"
              fill="#e11d48"
              radius={[0, 0, 4, 4]}
            />
            <Bar
              dataKey="false"
              stackId="a"
              fill="#2563eb"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}

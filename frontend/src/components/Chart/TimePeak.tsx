import { TrendingUp } from 'lucide-react'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'

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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '../ui/chart'

const chartConfig: ChartConfig = {
  'Floor 1': { label: 'First Floor', color: '#2e8b7b' },
  'Floor 2': { label: 'Second Floor', color: '#f28e63' },
  'Floor 3': { label: 'Third Floor', color: '#2b4559' },
  'Floor 4': { label: 'Fourth Floor', color: '#eed771' },
  'Floor 5': { label: 'Fifth Floor', color: '#2563eb' },
}

export function TimePeak({ data }: { data: Anomaly[] }) {
  const checkDataDate = Array.from(new Set(data.map(({ date }) => date)))

  const participateByArea = Object.entries(
    data.reduce(
      (acc, curr) => {
        let key
        if (checkDataDate.length === 1) {
          key = curr.time
        } else {
          key = curr.date
        }
        const { camera_area, participant } = curr
        acc[key] = acc[key] || {}

        acc[key][camera_area] = Math.max(
          acc[key][camera_area] || 0,
          participant,
        )

        return acc
      },
      {} as Record<string, Record<string, number>>,
    ),
  ).map(([date, floors]) => ({
    date,
    ...floors, // Spread the floors directly as the map values
  }))

  // console.log(chartConfig)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Area Chart - Gradient</CardTitle>
        <CardDescription>
          Showing total visitors for the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart accessibilityLayer data={participateByArea}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="date" tickLine={false} tickMargin={10} />
            <YAxis />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            {Object.keys(chartConfig).map((floorKey) => (
              <Bar
                dataKey={floorKey}
                fill={chartConfig[floorKey].color}
                radius={4}
                key={floorKey}
              />
            ))}
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              January - June 2024
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}

import { TrendingUp } from 'lucide-react'
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts'

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

const chartConfig: ChartConfig = {
  'Floor 1': { label: 'First Floor', color: '#2e8b7b' },
  'Floor 2': { label: 'Second Floor', color: '#f28e63' },
  'Floor 3': { label: 'Third Floor', color: '#2b4559' },
  'Floor 4': { label: 'Fourth Floor', color: '#eed771' },
  'Floor 5': { label: 'Fifth Floor', color: '#f6c38e' },
}

export function MaxParticipantByArea({ data }: { data: Anomaly[] }) {
  const allFloors = Array.from(
    new Set(data.map(({ camera_area }) => camera_area)),
  )
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

        // Set the maximum participants for the camera_area on this date
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
    ...allFloors.reduce(
      (acc, floor) => ({
        ...acc,
        [floor]: floors[floor] || 0,
      }),
      {},
    ),
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
          <AreaChart data={participateByArea}>
            {Object.keys(chartConfig).map((floorKey) => (
              <defs key={floorKey}>
                <linearGradient id={floorKey} x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor={chartConfig[floorKey].color}
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor={chartConfig[floorKey].color}
                    stopOpacity={0.1}
                  />
                </linearGradient>
              </defs>
            ))}
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            {Object.keys(chartConfig).map((floorKey) => (
              <Area
                dataKey={floorKey}
                type="natural"
                stroke={chartConfig[floorKey].color}
                fillOpacity={0.4}
                fill={chartConfig[floorKey].color}
                stackId="a"
                key={floorKey}
              />
            ))}
          </AreaChart>
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

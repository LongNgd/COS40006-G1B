import { Label, Pie, PieChart } from 'recharts'

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
  floor1: {
    label: 'floor 1',
    color: '#16a34a',
  },
  floor2: {
    label: 'floor 2',
    color: '#2563eb',
  },
  floor3: {
    label: 'floor 3',
    color: '#dc2626',
  },
  floor4: {
    label: 'floor 4',
    color: '#facc15',
  },
} satisfies ChartConfig

export function AnomalyArea() {
  const { data: anomalies, error, isLoading } = useGetAnomaliesQuery()

  if (isLoading) return <div>Loading...</div>
  if (error || !anomalies) return <div>Error: {JSON.stringify(error)}</div>

  const totalData = Object.entries(
    anomalies.data.reduce(
      (acc, curr) => {
        const area = curr.area
        if (!acc[area]) {
          acc[area] = {
            count: 0,
            fill: chartConfig[
              area.replace(' ', '').toLowerCase() as keyof typeof chartConfig
            ]?.color,
          }
        }
        acc[area].count += 1
        return acc
      },
      {} as Record<string, { count: number; fill: string | undefined }>,
    ),
  ).map(([area, { count, fill }]) => ({
    area,
    count,
    fill,
  }))

  const totalAnomaly = totalData.reduce((acc, curr) => acc + curr.count, 0)

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Number of Anomalies by Area</CardTitle>
        <CardDescription>Number of Anomalies by Area</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={totalData}
              dataKey="count"
              nameKey="area"
              innerRadius={50}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalAnomaly}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Anomalies
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
            <ChartLegend
              content={<ChartLegendContent nameKey="area" />}
              className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm"></CardFooter>
    </Card>
  )
}

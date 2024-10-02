import { Label, Pie, PieChart } from 'recharts'

import { useGetAnomaliesQuery } from '../../api/anomaliesApi'
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

  const anomalybyWeapon = Object.entries(
    anomalies.data.reduce(
      (acc, curr) => {
        const warningKey = curr.warning === 1 ? 'true' : 'false'
        if (!acc[warningKey]) {
          acc[warningKey] = {
            count: 0,
            fill: chartConfig[warningKey as keyof typeof chartConfig]?.color,
          }
        }
        acc[warningKey].count += 1
        return acc
      },
      {} as Record<string, { count: number; fill: string }>,
    ),
  ).map(([warning, { count, fill }]) => ({
    warning,
    count,
    fill,
  }))

  console.log(anomalybyWeapon)

  const totalAnomaly = anomalybyWeapon.reduce(
    (acc, curr) => acc + curr.count,
    0,
  )

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Anomalies by Weapon Detection</CardTitle>
        <CardDescription>Breakdown of anomalies by weapon detection warning</CardDescription>
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
              data={anomalybyWeapon}
              dataKey="count"
              nameKey="warning"
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
              content={<ChartLegendContent nameKey="warning" />}
              className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm"></CardFooter>
    </Card>
  )
}

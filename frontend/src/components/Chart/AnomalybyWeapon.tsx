import { Pie, PieChart } from 'recharts'

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
import { Anomaly } from '../../api/anomaly.type'

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

export function AnomalybyWeapon({ data }: { data: Anomaly[] }) {
  const anomalybyWeapon = Object.entries(
    data.reduce(
      (acc, curr) => {
        const warning = curr.warning == 1 ? 'true' : 'false'
        acc[warning] = (acc[warning] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    ),
  ).map(([warning, count]) => ({
    warning,
    count,
    fill: chartConfig[warning as keyof typeof chartConfig]?.color, // Assign color
  }))

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Anomalies by Weapon Detection</CardTitle>
        <CardDescription>
          Breakdown of anomalies by weapon detection warning
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie data={anomalybyWeapon} dataKey="count" nameKey="warning" />
            <ChartLegend
              content={<ChartLegendContent nameKey="warning" />}
              className="-translate-y-2 flex-wrap gap-2 justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm"></CardFooter>
    </Card>
  )
}

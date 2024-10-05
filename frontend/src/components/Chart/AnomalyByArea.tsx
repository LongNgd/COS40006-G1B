import { Pie, PieChart } from 'recharts'

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
import { transformData } from '../../redux/function'

const chartConfig = {
  floor1: {
    label: 'Floor 1',
    color: '#16a34a',
  },
  floor2: {
    label: 'Floor 2',
    color: '#2563eb',
  },
  floor3: {
    label: 'Floor 3',
    color: '#dc2626',
  },
  floor4: {
    label: 'Floor 4',
    color: '#facc15',
  },
} satisfies ChartConfig

export function AnomalyByArea() {
  const { data: anomalies, error, isLoading } = useGetAnomaliesQuery()

  if (isLoading) return <div>Loading...</div>
  if (error || !anomalies) return <div>Error: {JSON.stringify(error)}</div>

  const anomalybyArea = transformData(anomalies.data, 'area', chartConfig)
  console.log(anomalybyArea)

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Anomaly by Area</CardTitle>
        <CardDescription> Breakdown of anomalies by floor area</CardDescription>
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
              data={anomalybyArea}
              dataKey="count"
              nameKey="area"
              innerRadius={50}
              strokeWidth={5}
            ></Pie>
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

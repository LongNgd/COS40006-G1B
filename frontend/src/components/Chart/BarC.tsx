import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart"

import { anomalyData } from "../../assets/anomalydata"

const chartConfig = {
  time_and_area: {
    label: "Anomaly Peak",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function BarC() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bar Chart</CardTitle>
        <CardDescription>Time peak in Area</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={anomalyData}>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="number_of_anomalies" fill="red" radius={4} />
            <CartesianGrid vertical={false} />
            <XAxis dataKey="date" label={{ value: 'Time & Area', position: 'insideBottom', offset: -5 }} />
            <YAxis label={{ value: 'Highest Anomalies', angle: -90, position: 'insideLeft' }} />
            
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>

      </CardFooter>
    </Card>
  )
}

import { } from "lucide-react"
import { Bar, BarChart, CartesianGrid } from "recharts"

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

export const description = "A multiple bar chart"

const chartData = [
  { time_and_area: "6h-8h-Floor 1", highest_anomalies: 186},
  { time_and_area: "7h-9h-Floor 2", highest_anomalies: 150},
  { time_and_area: "12h-15h-Floor 3", highest_anomalies: 80},
  { time_and_area: "20h-23h-Floor 4", highest_anomalies: 200},
]

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
        <CardTitle>Bar Chart </CardTitle>
        <CardDescription>Time peak in Area</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="highest_anomalies" fill="var(--color-desktop)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>

      </CardFooter>
    </Card>
  )
}

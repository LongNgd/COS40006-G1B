import * as React from "react"
import { } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"

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

export const description = "A donut chart with text"

const chartData = [
  { area: "floor1", number_of_warning: 5, fill: "var(--color-floor1)" },
  { area: "floor2", number_of_warning: 3, fill: "var(--color-floor2)" },
  { area: "floor3", number_of_warning: 6, fill: "var(--color-floor3)" },
  { area: "floor4", number_of_warning: 10, fill: "var(--color-floor4)" },
]

const chartConfig = {
  number_of_warning: {
    label: "Num of warning",
  },
  floor1: {
    label: "Floor 1",
    color: "hsl(var(--chart-1))",
  },
  floor2: {
    label: "Floor 2",
    color: "hsl(var(--chart-2))",
  },
  floor3: {
    label: "Floor 3",
    color: "hsl(var(--chart-3))",
  },
  floor4: {
    label: "Floor 4",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig

export function PieC2() {
  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.number_of_warning, 0)
  }, [])

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Pie Chart - Donut</CardTitle>
        <CardDescription>Number of Warning by Area</CardDescription>
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
              data={chartData}
              dataKey="number_of_warning"
              nameKey="area"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
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
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Warnings
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        
      </CardFooter>
    </Card>
  )
}

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export const description = "An interactive area chart";

const chartData = [
  { date: 'Monday', floor1: 40, floor2: 24, floor3: 12, floor4: 10 },
  { date: 'Tuesday', floor1: 30, floor2: 22, floor3: 18, floor4: 15 },
  { date: 'Wednesday', floor1: 20, floor2: 18, floor3: 25, floor4: 20 },
  { date: 'Thursday', floor1: 27, floor2: 32, floor3: 30, floor4: 25 },
  { date: 'Friday', floor1: 50, floor2: 42, floor3: 35, floor4: 30 },
  { date: 'Saturday', floor1: 55, floor2: 40, floor3: 38, floor4: 35 },
  { date: 'Sunday', floor1: 65, floor2: 50, floor3: 45, floor4: 40 },
];

const chartConfig = {
  date: {
    label: "Date",
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
} satisfies ChartConfig;

export function AreaC2() {
  const [timeRange, setTimeRange] = React.useState("90d");

  const filteredData = chartData.filter((item, index) => {
    const now = new Date();
    let daysToSubtract = 90;
    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }

    // Create a date object for the current week day
    const dayIndex = (now.getDay() + 1) % 7; // Convert Sunday to 6, Monday to 0
    const dateOfWeek = new Date();
    dateOfWeek.setDate(now.getDate() - dayIndex + index); // Calculate the date based on the index

    now.setDate(now.getDate() - daysToSubtract);
    return dateOfWeek >= now;
  });

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Area Chart</CardTitle>
          <CardDescription>
            Highest participants per Area
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillFloor1" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="hsl(var(--chart-1))"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="hsl(var(--chart-1))"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillFloor2" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="hsl(var(--chart-2))"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="hsl(var(--chart-2))"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillFloor3" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="hsl(var(--chart-3))"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="hsl(var(--chart-3))"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillFloor4" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="hsl(var(--chart-4))"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="hsl(var(--chart-4))"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="date" label={{ value: 'Days of the Week', position: 'insideBottomRight', offset: -5 }} />
            <YAxis label={{ value: 'Max participants', angle: -90, position: 'insideLeft', offset: 10 }} />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => value} // Show the day directly
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="floor1"
              type="natural"
              fill="url(#fillFloor1)"
              stroke="hsl(var(--chart-1))"
              stackId="a"
            />
            <Area
              dataKey="floor2"
              type="natural"
              fill="url(#fillFloor2)"
              stroke="hsl(var(--chart-2))"
              stackId="a"
            />
            <Area
              dataKey="floor3"
              type="natural"
              fill="url(#fillFloor3)"
              stroke="hsl(var(--chart-3))"
              stackId="a"
            />
            <Area
              dataKey="floor4"
              type="natural"
              fill="url(#fillFloor4)"
              stroke="hsl(var(--chart-4))"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

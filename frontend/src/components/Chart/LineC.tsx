import { TrendingDown } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";

export const description = "A smaller line chart";

const chartData = [
  { day: "Monday", number_of_anomalies: 200 },
  { day: "Tuesday", number_of_anomalies: 160 },
  { day: "Wednesday", number_of_anomalies: 150 },
  { day: "Thursday", number_of_anomalies: 160 },
  { day: "Friday", number_of_anomalies: 100 },
  { day: "Saturday", number_of_anomalies: 20 },
  { day: "Sunday", number_of_anomalies: 0 },
];

const chartConfig = {
  number_of_anomalies: {
    label: "Num of Anomalies",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function Line_Graph() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Line Chart</CardTitle>
        <CardDescription>Number of Anomalies per Week</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            width={300}  // Smaller width
            height={200}  // Smaller height
            data={chartData}
            margin={{
              top: 5,
              bottom: 5,
              left: 10,
              right: 10,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              label={{ value: "Day", position: "insideBottom", offset: -5 }}
              tickMargin={5}
              // Set default props directly in the component if needed
              // defaultProps={{ tickMargin: 5 }} // Remove this line if it exists
            />
            <YAxis
              label={{ value: "Anomalies", angle: -90, position: "insideLeft" }}
              tickMargin={5}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="number_of_anomalies"
              type="monotone"
              stroke={chartConfig.number_of_anomalies.color}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending down by 5.2% <TrendingDown className="h-4 w-4" />
            </div>
            
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

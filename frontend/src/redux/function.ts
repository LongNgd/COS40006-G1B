import { Anomaly } from "../api/anomaly.type";

export function transformData<T extends string>(
    data: Anomaly[],
    key: string,
    chartConfig: Record<T, { color: string }>
  ) {
    return Object.entries(
      data.reduce(
        (acc, curr) => {
          const keyValue = curr[key].toString().replace(' ', '').toLowerCase();
          if (!acc[keyValue]) {
            acc[keyValue] = {
              count: 0,
              fill: chartConfig[keyValue as T]?.color,
            };
          }
          acc[keyValue].count += 1;
          return acc;
        },
        {} as Record<string, { count: number; fill: string | undefined }>
      )
    ).map(([keyValue, { count, fill }]) => ({
      [key]: keyValue,
      count,
      fill,
    }));
  }
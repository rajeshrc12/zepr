import React from "react";
import { EChart } from "@kbox-labs/react-echarts";
import { format } from "echarts";
type ChartData = {
  data: Record<string, string | number>[];
  xAxis: string;
  yAxis: string;
};

const LineChart = ({ data, xAxis, yAxis }: ChartData) => {
  const xData = data.map((item) => item[xAxis]),
    yData = data.map((item) => item[yAxis]);
  if (data.length && xData.length && yData.length)
    return (
      <EChart
        style={{
          height: "100%",
          width: "100%",
        }}
        tooltip={{
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        }}
        legend={{
          data: [yAxis],
          top: "5%",
        }}
        xAxis={{
          type: "category",
          data: xData,
          axisLabel: {
            interval: 0, // show all labels
            formatter: (value: string) => {
              return format.truncateText(
                value,
                80, // max width in pixels (tweak as needed)
                "12px sans-serif",
                "…" // ellipsis
              );
            },
          },
        }}
        yAxis={{
          type: "value",
        }}
        series={[
          {
            name: yAxis,
            data: yData,
            type: "line",
            itemStyle: {
              borderRadius: [4, 4, 0, 0],
            },
          },
        ]}
        grid={{
          top: 60,
          left: 60,
          right: 30,
          bottom: 60,
        }}
      />
    );
};

export default LineChart;

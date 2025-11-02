import React from "react";
import { EChart } from "@kbox-labs/react-echarts";
import { format } from "echarts"; // 👈 import echarts core
type ChartData = {
  data: Record<string, string | number>[];
  xAxis: string;
  yAxis: string;
};

const BarChart = ({ data, xAxis, yAxis }: ChartData) => {
  const xData = data.map((item) => item[xAxis]),
    yData = data.map((item) => item[yAxis]);
  if (data.length > 0 && xData.length > 0 && yData.length > 0)
    return (
      <EChart
        style={{
          height: "400px",
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
            type: "bar",
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

export default BarChart;

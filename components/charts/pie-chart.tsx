import React from "react";
import { EChart } from "@kbox-labs/react-echarts";
type ChartData = {
  data: Record<string, string | number>[];
  xAxis: string;
  yAxis: string;
};

type PieData = {
  name: string;
  value: number;
};
const PieChart = ({ data, xAxis, yAxis }: ChartData) => {
  const pieData = data.map((d) => ({
    name: d[xAxis],
    value: d[yAxis],
  })) as PieData[];

  if (data.length && pieData.length)
    return (
      <EChart
        style={{
          height: "400px",
          width: "100%",
        }}
        // title={{
        //   text: "Referer of a Website",
        //   subtext: "Fake Data",
        //   left: "center",
        // }}
        tooltip={{
          trigger: "item",
        }}
        legend={{
          orient: "horizontal",
          top: 0,
          left: "center",
        }}
        series={[
          {
            name: "Access From",
            type: "pie",
            radius: "50%",
            data: pieData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ]}
      />
    );
};

export default PieChart;

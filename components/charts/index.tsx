import React from "react";
import BarChart from "@/components/charts/bar-chart";
import LineChart from "@/components/charts/line-chart";
import PieChart from "@/components/charts/pie-chart";
type ChartIndexProps = {
  data: Record<string, string | number>[];
  type: string;
  xAxis: string;
  yAxis: string;
};
const ChartIndex = ({ type, data, xAxis, yAxis }: ChartIndexProps) => {
  if (type == "line")
    return <LineChart data={data} xAxis={xAxis} yAxis={yAxis} />;
  if (type == "pie")
    return <PieChart data={data} xAxis={xAxis} yAxis={yAxis} />;
  return <BarChart data={data} xAxis={xAxis} yAxis={yAxis} />;
};

export default ChartIndex;

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface CustomBarChartProps {
  data: object[];
  xDataKey: string;
  yDataKey: string;
}

const CustomBarChart = ({ data, xDataKey, yDataKey }: CustomBarChartProps) => {
  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 20,
            bottom: 10,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey={xDataKey}
            label={{
              value: xDataKey,
              position: "insideBottom",
              offset: -5,
              style: {
                fontSize: 14,
                fontWeight: "bold",
                fill: "#333",
                fontFamily: "Arial",
              },
            }}
          />
          <YAxis
            dataKey={yDataKey}
            label={{
              value: yDataKey,
              angle: -90,
              position: "insideLeft",
              style: {
                fontSize: 14,
                fontWeight: "bold",
                fill: "#333",
                fontFamily: "Arial",
              },
            }}
          />
          <Tooltip
            formatter={(value, name) => {
              if (name === yDataKey) {
                return Number(value).toFixed(2); // Format only Y-axis values
              }
              return value;
            }}
          />
          <Bar dataKey={yDataKey} fill="#201e1c" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;

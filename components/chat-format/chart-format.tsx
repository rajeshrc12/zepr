import React, { useState } from "react";
import CustomBarChart from "@/components/charts/CustomBarChart";
import CustomLineChart from "../charts/CustomLineChart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ChartFormat = () => {
  const [type, setType] = useState("bar");
  return (
    <div className="flex flex-col gap-2">
      <Select value={type} onValueChange={(e) => setType(e)}>
        <SelectTrigger className="w-30">
          <SelectValue placeholder="Select source" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="bar">Bar Chart</SelectItem>
          <SelectItem value="line">Line Chart</SelectItem>
        </SelectContent>
      </Select>
      <div>
        {type === "bar" && <CustomBarChart />}
        {type === "line" && <CustomLineChart />}
      </div>
    </div>
  );
};

export default ChartFormat;

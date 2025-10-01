import React from "react";
import CustomBarChart from "../charts/CustomBarChart";

type TableFormatProps = {
  dataString: string;
};

type RowData = Record<string, string>;

const ChartFormat: React.FC<TableFormatProps> = ({ dataString }) => {
  let data: RowData[] = [];
  let xDataKey = "",
    yDataKey = "";

  try {
    const parsed = JSON.parse(dataString);
    if (Array.isArray(parsed)) {
      data = parsed as RowData[];
      const columns = Object.keys(data[0]);
      xDataKey = columns[0];
      yDataKey = columns[columns.length - 1];
    }
  } catch {
    // fallback: invalid JSON
    data = [];
  }

  if (data.length === 0) return null;

  return (
    <div className="flex flex-col gap-2">
      <CustomBarChart data={data} xDataKey={xDataKey} yDataKey={yDataKey} />
    </div>
  );
};

export default ChartFormat;

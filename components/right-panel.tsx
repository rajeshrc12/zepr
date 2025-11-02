import { GraphDataType } from "@/constants/graph";
import { LoaderCircle, X } from "lucide-react";
import React from "react";
import CodeBlock from "@/components/code-block";
import DynamicTable from "@/components/dynamic-table";
import BarChart from "@/components/charts/bar-chart";

const RightPanel = ({
  graphData,
  setRightPanel,
}: {
  graphData: GraphDataType;
  setRightPanel: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  console.log(graphData?.generate_table?.table);
  return (
    <div className="flex-1 flex flex-col bg-white rounded-r p-2">
      <div className="flex justify-between">
        <div>Title</div>
        <X size={15} onClick={() => setRightPanel(false)} />
      </div>
      <div className="overflow-y-auto">
        {graphData.analysis_query.sql && (
          <>
            <div>SQL Query</div>
            <CodeBlock code={graphData.analysis_query.sql} />
          </>
        )}
        {graphData.generate_table.table.length > 0 && (
          <>
            <div>Table</div>
            <div>
              <DynamicTable data={graphData.generate_table.table} />
            </div>
          </>
        )}
        {Object.keys(graphData.generate_chart.chart).length > 0 && (
          <>
            <div>Chart</div>
            <BarChart
              data={graphData.generate_table.table}
              xAxis={graphData.generate_chart.chart.x_axis}
              yAxis={graphData.generate_chart.chart.y_axis}
            />
          </>
        )}
        {!Object.keys(graphData.generate_chart.chart).length && (
          <LoaderCircle size={15} className="animate-spin" />
        )}
      </div>
    </div>
  );
};

export default RightPanel;

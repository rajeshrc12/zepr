import { GraphDataType } from "@/constants/graph";
import { LoaderCircle, Save, X } from "lucide-react";
import React, { useState } from "react";
import CodeBlock from "@/components/code-block";
import DynamicTable from "@/components/dynamic-table";
import ChartIndex from "@/components/charts";
import { Button } from "./ui/button";
import api from "@/lib/api";
import { toast } from "sonner";

const RightPanel = ({
  graphData,
  setRightPanel,
}: {
  graphData: GraphDataType;
  setRightPanel: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [loading, setLoading] = useState(false);
  const saveChart = async () => {
    try {
      setLoading(true);

      const chart = await api.post("/chart", {
        name: "new chart",
        sql: graphData.analysis_query.sql,
        table: graphData.generate_table.table,
        config: graphData.generate_chart.chart,
        summary: graphData.generate_summary.summary,
      });
      if (chart.status === 200) {
        toast.success("Chart saved");
      }
    } catch {
      toast.error("Chart saving failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex-1 flex flex-col bg-white rounded-r-lg shadow-md p-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 mb-4">
        <h2 className="font-semibold text-gray-800">Analysis Details</h2>
        <button
          onClick={() => setRightPanel(false)}
          className="text-gray-500 hover:text-gray-800 transition-colors"
        >
          <X size={18} />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto space-y-6 pr-2">
        {/* SQL Query */}
        {graphData.analysis_query.sql && (
          <section>
            <h3 className="font-semibold text-gray-700 mb-2 border-b pb-1">
              SQL Query
            </h3>
            <CodeBlock code={graphData.analysis_query.sql} />
          </section>
        )}

        {/* Table */}
        {graphData.generate_table.table.length > 0 && (
          <section>
            <h3 className="font-semibold text-gray-700 mb-2 border-b pb-1">
              Table
            </h3>
            <div className="rounded-md overflow-hidden">
              <DynamicTable data={graphData.generate_table.table} />
            </div>
          </section>
        )}

        {/* Chart */}
        {Object.keys(graphData.generate_chart.chart).length > 0 && (
          <section>
            <h3 className="font-semibold text-gray-700 mb-2 border-b pb-1 flex justify-between items-center">
              Chart
              <Button className="p-0 m-0" onClick={saveChart}>
                {loading ? (
                  <LoaderCircle size={15} className="animate-spin" />
                ) : (
                  <Save />
                )}
              </Button>
            </h3>
            <div className="p-2 rounded-md">
              <ChartIndex
                type={graphData.generate_chart.chart.type}
                data={graphData.generate_table.table}
                xAxis={graphData.generate_chart.chart.x_axis}
                yAxis={graphData.generate_chart.chart.y_axis}
              />
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default RightPanel;

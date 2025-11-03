"use client";
import React, { useMemo } from "react";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

import { useCharts } from "@/hooks/useCharts";
import { ChartType } from "@/types/db";
import ChartIndex from "@/components/charts";
import {
  WidthProvider,
  Responsive as ResponsiveGridLayout,
} from "react-grid-layout";

const GridLayout = WidthProvider(ResponsiveGridLayout);
const DashboardIdPage = () => {
  const { data: charts, isLoading } = useCharts();

  // Create default layout dynamically based on number of charts
  const layout = useMemo(() => {
    if (!charts || !charts?.length) return [];
    return charts.map((chart: ChartType, i: number) => ({
      i: chart.id.toString(),
      x: (i % 2) * 6, // 2 charts per row
      y: Math.floor(i / 2) * 4,
      w: 6, // width units (out of 12)
      h: 4, // height units
    }));
  }, [charts]);

  return (
    <div className="p-2 h-full flex flex-col gap-2">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="text-2xl font-bold">Dashboard title</div>
          <div className="text-sm text-gray-500">Dashboard description</div>
        </div>
      </div>

      {/* Chart Grid */}
      <div className="flex-1 overflow-y-auto">
        {isLoading ? (
          <div className="text-center py-10 text-gray-500">
            Loading charts...
          </div>
        ) : (
          <GridLayout
            className="layout"
            layouts={{ lg: layout }}
            breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
            cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
            rowHeight={60}
            isDraggable
            isResizable
            draggableHandle=".drag-handle"
            onLayoutChange={(newLayout) => {
              console.log("New layout:", newLayout);
              // You can persist to DB/localStorage here
            }}
          >
            {charts.map((chart: ChartType) => (
              <div
                key={chart.id}
                className="border rounded bg-white shadow-sm flex flex-col"
              >
                {/* Optional drag handle */}
                <div className="drag-handle cursor-move p-2 border-b text-sm font-medium bg-gray-50">
                  {chart.name || "Untitled Chart"}
                </div>

                {/* Chart content */}
                <div className="flex-1 p-2">
                  <ChartIndex
                    data={chart.table}
                    xAxis={chart.config.x_axis}
                    yAxis={chart.config.y_axis}
                    type={chart.config.type}
                  />
                </div>
              </div>
            ))}
          </GridLayout>
        )}
      </div>
    </div>
  );
};

export default DashboardIdPage;

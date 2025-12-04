"use client";
import React, { useState } from "react";
import { useCharts } from "@/hooks/useCharts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChartType } from "@/types/db";
import { Eye, LoaderCircle } from "lucide-react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import ChartIndex from "@/components/charts";

const ChatHistoryPage = () => {
  const { data: charts, isLoading } = useCharts();
  const [chartData, setChartData] = useState<ChartType>();
  const [open, setOpen] = useState(false);
  console.table(charts);
  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between p-5">
        <div className="font-bold text-2xl">Charts</div>
      </div>
      <div className="overflow-hidden rounded-md border bg-background mx-5">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="h-9 py-2">ID</TableHead>
              <TableHead className="h-9 py-2">Name</TableHead>
              <TableHead className="h-9 py-2">Type</TableHead>
              <TableHead className="h-9 py-2">Created At</TableHead>
              <TableHead className="h-9 py-2">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} className="py-8 text-center">
                  <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground">
                    <LoaderCircle className="h-6 w-6 animate-spin" />
                    <span>Loading Charts...</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : charts && charts.length > 0 ? (
              charts.map((chart: ChartType, index: number) => (
                <TableRow key={chart.id}>
                  <TableCell className="py-2">{index + 1}</TableCell>
                  <TableCell className="py-2 font-medium">
                    {chart.name}
                  </TableCell>
                  <TableCell className="py-2">{chart.config.type}</TableCell>
                  <TableCell className="py-2">
                    {new Date(chart.created_at).toLocaleString()}
                  </TableCell>
                  <TableCell className="py-2">
                    <Eye
                      onClick={() => {
                        setChartData(chart);
                        setOpen(true);
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-4 text-muted-foreground"
                >
                  No chart data found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent className="!max-w-[700px]">
          <AlertDialogHeader>
            <AlertDialogTitle>{chartData?.name}</AlertDialogTitle>
          </AlertDialogHeader>
          <ChartIndex
            type={chartData?.config.type as string}
            data={chartData?.table as []}
            xAxis={chartData?.config.x_axis as string}
            yAxis={chartData?.config.y_axis as string}
          />
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoading}>Close</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ChatHistoryPage;

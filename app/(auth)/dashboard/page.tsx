"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useDashboards } from "@/hooks/useDashboards";
import { Eye, LoaderCircle } from "lucide-react";
import { DashboardType } from "@/types/db";

const DashboardPage = () => {
  const router = useRouter();
  const { data: dashboards, isLoading } = useDashboards();
  console.log(dashboards);
  return (
    <div className="flex flex-col">
      <div className="flex justify-between p-5">
        <div className="font-bold text-2xl">Dashboard</div>
        <Button
          onClick={async () => {
            router.push("/dashboard/create");
          }}
        >
          Create Dashboard
        </Button>
      </div>
      <div className="overflow-hidden rounded-md border bg-background mx-5">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="h-9 py-2">ID</TableHead>
              <TableHead className="h-9 py-2">Name</TableHead>
              <TableHead className="h-9 py-2">Description</TableHead>
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
                    <span>Loading Dashboards...</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : dashboards && dashboards.length > 0 ? (
              dashboards.map((dashboard: DashboardType, index: number) => (
                <TableRow key={dashboard.id}>
                  <TableCell className="py-2">{index + 1}</TableCell>
                  <TableCell className="py-2 font-medium">
                    {dashboard.name}
                  </TableCell>
                  <TableCell className="py-2">
                    {dashboard.description}
                  </TableCell>
                  <TableCell className="py-2">
                    {new Date(dashboard.created_at).toLocaleString()}
                  </TableCell>
                  <TableCell className="py-2">
                    <Eye onClick={() => {}} />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-4 text-muted-foreground"
                >
                  No dashboard data found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DashboardPage;

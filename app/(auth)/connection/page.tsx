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
import Csv from "@/components/form/csv";
import { useCsvs } from "@/hooks/useCsvs";
import { CsvFile } from "@/types/csv";
import { LoaderCircle } from "lucide-react";

const ConnectionPage = () => {
  const { data: csvs, isLoading } = useCsvs();
  return (
    <div className="flex flex-col">
      <div className="flex justify-between p-5">
        <div className="font-bold text-2xl">Connection</div>
        <Csv />
      </div>
      <div className="overflow-hidden rounded-md border bg-background mx-5">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="h-9 py-2">ID</TableHead>
              <TableHead className="h-9 py-2">Name</TableHead>
              <TableHead className="h-9 py-2">Description</TableHead>
              <TableHead className="h-9 py-2">File Name</TableHead>
              <TableHead className="h-9 py-2">Created At</TableHead>
              <TableHead className="h-9 py-2">Columns Count</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} className="py-8 text-center">
                  <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground">
                    <LoaderCircle className="h-6 w-6 animate-spin" />
                    <span>Loading CSVs...</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : csvs && csvs.length > 0 ? (
              csvs.map((csv: CsvFile) => (
                <TableRow key={csv.id}>
                  <TableCell className="py-2">{csv.id}</TableCell>
                  <TableCell className="py-2 font-medium">{csv.name}</TableCell>
                  <TableCell className="py-2">{csv.description}</TableCell>
                  <TableCell className="py-2">{csv.file_name}</TableCell>
                  <TableCell className="py-2">
                    {new Date(csv.created_at).toLocaleString()}
                  </TableCell>
                  <TableCell className="py-2">
                    {csv.columns ? csv.columns.length : 0}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-4 text-muted-foreground"
                >
                  No CSV data found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ConnectionPage;

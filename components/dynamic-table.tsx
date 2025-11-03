import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type TableProps = {
  data: Record<string, string>[];
};

const DynamicTable: React.FC<TableProps> = ({ data }) => {
  if (!data || data.length === 0)
    return <p className="text-center py-4">No data available.</p>;

  const headers = Object.keys(data[0]);

  return (
    <div className="overflow-auto rounded-md border bg-background mx-2">
      <Table>
        <TableHeader className="sticky top-0 bg-muted/50 z-10">
          <TableRow>
            {headers.map((header) => (
              <TableHead
                key={header}
                className="h-9 py-2 text-left font-bold uppercase tracking-wider w-48"
              >
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {data && data.length > 0 ? (
            data.map((row, index) => (
              <TableRow key={index} className={"bg-background"}>
                {headers.map((header) => (
                  <TableCell
                    key={header}
                    className="px-4 py-2 text-sm text-muted-foreground truncate whitespace-nowrap"
                    title={row[header]}
                  >
                    {row[header]}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={headers.length}
                className="text-center py-4 text-muted-foreground"
              >
                No data found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default DynamicTable;

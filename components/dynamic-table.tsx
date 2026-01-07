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
  if (!data || data.length === 0 || typeof data[0] !== "object")
    return <p className="text-center py-4">No data available.</p>;

  const headers = Object.keys(data[0]);

  return (
    <div className="overflow-hidden rounded-lg border-x border-t border-[#ddd] bg-background">
      <Table className="table-fixed">
        <TableHeader>
          <TableRow>
            <TableHead className="bg-[#f3f4f6] border-b border-r border-[#ddd]" />

            {headers.map((header) => (
              <TableHead
                key={header}
                className="bg-[#f3f4f6] border-b border-r border-[#ddd]"
              >
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {Array.isArray(data) &&
            data?.map((row, index) => (
              <TableRow key={index}>
                <TableHead className="bg-[#f3f4f6] border-r border-b border-[#ddd]">
                  {index + 1}
                </TableHead>

                {headers.map((header) => (
                  <TableCell
                    key={header}
                    className="border-b border-r border-[#ddd]"
                    title={row[header]}
                  >
                    {row[header]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DynamicTable;

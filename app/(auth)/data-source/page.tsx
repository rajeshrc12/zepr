import { Button } from "@/components/ui/button";
import React from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const DataSourcePage = () => {
  return (
    <div className="flex flex-col mx-auto">
      <div className="w-[800px] flex flex-col gap-4 py-4">
        <div className="flex justify-between">
          <div className="font-bold">Resources</div>
          <Link href={"/data-source/type"}>
            <Button>
              <FaPlus /> Create New
            </Button>
          </Link>
        </div>
        <table className="w-full text-gray-500">
          <thead className="font-bold">
            <tr>
              <th className="border-y p-2 text-left">Source</th>
              <th className="border-y p-2 text-left">Type</th>
              <th className="border-y p-2 text-left">Created</th>
              <th className="border-y p-2 text-left">Status</th>
              <th className="border-y p-2 text-left"></th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-sm">
              <td className="border-y p-2 text-primary font-bold">CSV File</td>
              <td className="border-y p-2">CSV</td>
              <td className="border-y p-2">1 hour ago</td>
              <td className="border-y p-2">
                <Badge className="bg-green-500">Ready</Badge>
              </td>
              <td className="border-y p-2">
                <FaTrash />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataSourcePage;

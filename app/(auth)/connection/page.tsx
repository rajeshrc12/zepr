"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useConnections } from "@/hooks/useConnections";
import { Csv } from "@prisma/client";
import { fromNow } from "@/utils/date";

const ConnectionPage = () => {
  const { data } = useConnections();

  console.log(data);
  return (
    <div className="flex flex-col mx-auto">
      <div className="w-[800px] flex flex-col gap-4 py-4">
        <div className="flex justify-between">
          <div className="font-bold">Connection</div>
          <Link href={"/connection/type"}>
            <Button>
              <FaPlus /> Create New
            </Button>
          </Link>
        </div>
        <table className="w-full text-gray-500">
          <thead className="font-bold">
            <tr>
              <th className="border-y p-2 text-left">Name</th>
              <th className="border-y p-2 text-left">Type</th>
              <th className="border-y p-2 text-left">Created</th>
              <th className="border-y p-2 text-left">Status</th>
              <th className="border-y p-2 text-left"></th>
            </tr>
          </thead>
          <tbody>
            {data?.map((csv: Csv) => (
              <tr className="text-sm" key={csv.id}>
                <td className="border-y p-2 text-primary font-bold">
                  {csv.name}
                </td>
                <td className="border-y p-2">CSV</td>
                <td className="border-y p-2">{fromNow(csv.createdAt)}</td>
                <td className="border-y p-2">
                  <Badge className="bg-green-500">{csv.status}</Badge>
                </td>
                <td className="border-y p-2">
                  <FaTrash />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ConnectionPage;

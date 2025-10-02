"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { FaPlus, FaTrash } from "react-icons/fa";
import { fromNow } from "@/utils/date";
import { useConnections } from "@/hooks/useConnections";
import { Csv } from "@prisma/client";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const ConnectionPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { data, isLoading, isError } = useConnections(
    currentPage,
    itemsPerPage
  );

  if (isLoading) return <div className="text-center py-10">Loading...</div>;

  if (isError)
    return (
      <div className="text-center py-10 text-red-500">
        Error loading connections
      </div>
    );

  const csvs = data?.data || [];
  const pagination = data?.pagination;

  return (
    <div className="flex flex-col mx-auto">
      <div className="w-[800px] flex flex-col gap-4 py-4">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="font-bold text-lg">Connections</div>
          <Link href={"/connection/type"}>
            <Button>
              <FaPlus /> Create New
            </Button>
          </Link>
        </div>

        {/* Table */}
        <table className="w-full text-gray-500 border-collapse">
          <thead className="font-bold">
            <tr>
              <th className="border-y p-2 text-left">Name</th>
              <th className="border-y p-2 text-left">Type</th>
              <th className="border-y p-2 text-left">Created</th>
              <th className="border-y p-2 text-left">Status</th>
              <th className="border-y p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {csvs.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-4 text-center text-gray-400">
                  No connections found
                </td>
              </tr>
            ) : (
              csvs.map((csv: Csv) => (
                <tr key={csv.id} className="text-sm hover:bg-gray-50">
                  <td className="border-y p-2 text-primary font-bold">
                    {csv.name}
                  </td>
                  <td className="border-y p-2">CSV</td>
                  <td className="border-y p-2">{fromNow(csv.createdAt)}</td>
                  <td className="border-y p-2">
                    <Badge className="bg-green-500">{csv.status}</Badge>
                  </td>
                  <td className="border-y p-2 cursor-pointer text-red-500">
                    <FaTrash />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <Pagination>
          <PaginationContent>
            {/* Previous button */}
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage((prev) => Math.max(prev - 1, 1));
                }}
              />
            </PaginationItem>

            {/* Page numbers */}
            {Array.from({ length: pagination?.totalPages || 0 }, (_, i) => (
              <PaginationItem key={i + 1}>
                <PaginationLink
                  href="#"
                  isActive={currentPage === i + 1}
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage(i + 1);
                  }}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            {/* Ellipsis for large page sets */}
            {pagination?.totalPages && pagination?.totalPages > 5 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}

            {/* Next button */}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage((prev) =>
                    Math.min(prev + 1, pagination?.totalPages || 1)
                  );
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default ConnectionPage;

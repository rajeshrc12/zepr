"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Csv } from "@prisma/client";

export interface PaginatedCsvResponse {
  data: Csv[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Fetch function with pagination
async function fetchConnections(
  page: number,
  limit: number
): Promise<PaginatedCsvResponse> {
  try {
    const res = await axios.get(
      `/api/connection/csv?page=${page}&limit=${limit}`
    );
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || error.message);
    }
    throw new Error("An unknown error occurred");
  }
}

// Custom hook
export function useConnections(page: number, limit: number) {
  return useQuery<PaginatedCsvResponse, Error>({
    queryKey: ["connections", page, limit],
    queryFn: () => fetchConnections(page, limit),
  });
}

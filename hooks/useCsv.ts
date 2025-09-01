"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

async function fetchCsv(csvId: string) {
  const res = await axios.get(`/api/connection/csv/${csvId}`);
  return res.data;
}

export function useCsv(csvId: string) {
  return useQuery({
    queryKey: ["chat", csvId],
    queryFn: () => fetchCsv(csvId),
    enabled: !!csvId,
  });
}

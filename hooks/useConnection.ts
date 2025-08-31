"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

async function fetchConnections() {
  const res = await axios.get("api/connection/csv");
  return res.data;
}

export function useConnection() {
  return useQuery({
    queryKey: ["connections"],
    queryFn: fetchConnections,
  });
}

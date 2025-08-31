"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

async function fetchConnection() {
  const res = await axios.get("api/connection/csv");
  return res.data;
}

export function useConnection() {
  return useQuery({
    queryKey: ["connection"],
    queryFn: fetchConnection,
  });
}

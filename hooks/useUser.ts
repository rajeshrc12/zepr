"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

async function fetchUser() {
  const res = await axios.get(`/api/user`);
  return res.data;
}

export function useUser() {
  return useQuery({
    queryKey: ["user"], // ✅ unique cache per chatId
    queryFn: fetchUser,
  });
}

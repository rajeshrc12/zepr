"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

async function fetchChats() {
  const res = await axios.get(`/api/chat`);
  return res.data;
}

export function useChats() {
  return useQuery({
    queryKey: ["chats"], // ✅ unique cache per chatId
    queryFn: fetchChats,
  });
}

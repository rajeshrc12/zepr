"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

async function fetchChat(chatId: string) {
  const res = await axios.get(`/api/chat/${chatId}`);
  return res.data;
}

export function useChat(chatId: string) {
  return useQuery({
    queryKey: ["chat", chatId],
    queryFn: () => fetchChat(chatId),
    enabled: !!chatId,
  });
}

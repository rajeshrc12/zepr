"use client";

import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

async function fetchChat(chatId: string) {
  const res = await api.get(`/chat/${chatId}`);
  return res.data;
}

export function useChat(chatId: string) {
  return useQuery({
    queryKey: ["chat", chatId],
    queryFn: () => fetchChat(chatId),
    enabled: !!chatId,
  });
}

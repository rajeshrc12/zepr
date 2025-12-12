import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

export function useChat(chatId: string) {
  return useQuery({
    queryKey: ["chat", chatId],
    queryFn: async () => {
      const res = await api.get(`/chat/${chatId}`);
      return res.data;
    },
    enabled: !!chatId, // prevent calling API when chatId is null
  });
}

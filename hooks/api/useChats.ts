import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

export function useChats() {
  return useQuery({
    queryKey: ["chats"],
    queryFn: async () => {
      const res = await api.get(`/chat`);
      return res.data;
    },
  });
}

import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

export function useChats() {
  return useQuery({
    queryKey: ["chats"],
    queryFn: async () => {
      const response = await api.get("/chat");
      return response.data;
    },
  });
}

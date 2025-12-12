import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

export function useUser() {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await api.get("/user");
      return response.data;
    },
  });
}

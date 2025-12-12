import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

export function useCsvs() {
  return useQuery({
    queryKey: ["csvs"],
    queryFn: async () => {
      const response = await api.get("/csv");
      return response.data;
    },
  });
}

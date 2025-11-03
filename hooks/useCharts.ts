import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

export function useCharts() {
  return useQuery({
    queryKey: ["charts"],
    queryFn: async () => {
      const response = await api.get("/chart");
      return response.data;
    },
  });
}

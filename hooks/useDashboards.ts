import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

export function useDashboards() {
  return useQuery({
    queryKey: ["dashboards"],
    queryFn: async () => {
      const response = await api.get("/dashboard");
      return response.data;
    },
  });
}

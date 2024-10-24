import { useQuery } from "@tanstack/react-query";

export default function useFetch(endpoint: string) {
  const { data, error, isLoading } = useQuery({
    queryKey: [endpoint],
    queryFn: async () => {
      const URL = `${import.meta.env.VITE_API_BASE_URL}/${endpoint}`;
      const res = await fetch(URL);

      if (!res.ok) {
        throw new Error(`Error: ${res.status} ${res.statusText}`);
      }

      return await res.json();
    },
    refetchInterval: 660000,
  });

  return { data, error, isLoading };
}

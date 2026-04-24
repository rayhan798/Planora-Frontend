import { useQuery } from "@tanstack/react-query";
import { getPublicEvents } from "@/app/(public)/events/_actions";

export const usePublicEvents = () => {
  const { data: events, isLoading, isError } = useQuery({
    queryKey: ['upcoming-public-events'],
    queryFn: async () => {
      const response = await getPublicEvents();
      const eventData = response?.data || response; 
      return Array.isArray(eventData) ? eventData : [];
    },
  });

  return {
    events,
    isLoading,
    isError,
  };
};
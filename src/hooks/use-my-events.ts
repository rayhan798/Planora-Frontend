import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getMyEvents } from "@/app/(public)/events/_actions";

export const useMyEvents = (currentUserId: any) => {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: rawData, isLoading } = useQuery({
    queryKey: ["events", "mine", String(currentUserId)],
    queryFn: async () => {
      const res = await getMyEvents();
      return Array.isArray(res) ? res : (res as any)?.data || [];
    },
    enabled: !!currentUserId,
  });

  const filteredEvents = useMemo(() => {
    const list = Array.isArray(rawData) ? rawData : [];
    if (!searchTerm) return list;
    return list.filter((event: any) =>
      event?.title?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [rawData, searchTerm]);

  return {
    searchTerm,
    setSearchTerm,
    filteredEvents,
    isLoading,
  };
};
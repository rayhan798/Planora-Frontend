import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getEvents } from "@/app/(public)/events/_actions";

export const useEventsFilter = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const { data, isLoading } = useQuery({
    queryKey: ["events"],
    queryFn: getEvents,
  });

  const eventsData = useMemo(() => {
    return data?.data?.data ?? data?.data ?? data ?? [];
  }, [data]);

  const filteredEvents = useMemo(() => {
    return eventsData.filter((event: any) => {
      const title = event?.title || "";
      const description = event?.description || "";

      const matchesSearch =
        title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        description.toLowerCase().includes(searchQuery.toLowerCase());

      const typeString = event?.isPublic
        ? event?.fee === 0
          ? "Public Free"
          : "Public Paid"
        : event?.fee === 0
        ? "Private Free"
        : "Private Paid";

      const matchesFilter =
        activeFilter === "All" || typeString === activeFilter;

      return matchesSearch && matchesFilter;
    });
  }, [eventsData, searchQuery, activeFilter]);

  return {
    searchQuery,
    setSearchQuery,
    activeFilter,
    setActiveFilter,
    filteredEvents,
    isLoading,
  };
};
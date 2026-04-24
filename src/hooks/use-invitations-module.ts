import { useState, useMemo, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getInvitations } from "@/app/(public)/events/_actions";

export const useInvitations = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [refreshInterval, setRefreshInterval] = useState(1000);

  const { 
    data: response, 
    isLoading, 
    isError, 
    refetch,
    isRefetching 
  } = useQuery({
    queryKey: ['invitations'],
    queryFn: async () => await getInvitations(),
    staleTime: 5000,                
    refetchOnMount: "always",       
    refetchOnWindowFocus: true,     
    refetchInterval: refreshInterval, 
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setRefreshInterval(20000);
    }, 1200); 
    return () => clearTimeout(timer);
  }, []);

  const filteredInvites = useMemo(() => {
    const rawData = Array.isArray(response) ? response : (response as any)?.data || [];
    const onlyPending = rawData.filter((invite: any) => invite.status === "PENDING");

    if (!searchTerm) return onlyPending;

    return onlyPending.filter((invite: any) => {
      const title = (invite?.event?.title || "").toLowerCase();
      const host = (invite?.sender?.name || "").toLowerCase();
      const searchLower = searchTerm.toLowerCase();
      return title.includes(searchLower) || host.includes(searchLower);
    });
  }, [searchTerm, response]);

  return {
    searchTerm,
    setSearchTerm,
    filteredInvites,
    isLoading,
    isError,
    refetch,
    isRefetching,
    refreshInterval
  };
};
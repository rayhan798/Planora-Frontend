import { useState, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";
import { getEventById } from "@/services/events.services";

export const useEventDetails = (id: string) => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const syncAuth = () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (token) {
          const decoded: any = jwtDecode(token);
          setCurrentUser(decoded);
        }
      } catch (error) {
        console.error("Auth error:", error);
      } finally {
        setIsAuthLoading(false);
      }
    };
    syncAuth();
  }, []);

  const validId = useMemo(() => (id ? String(id) : ""), [id]);

  const {
    data,
    isLoading: isEventLoading,
    error,
  } = useQuery({
    queryKey: ["event", validId],
    queryFn: () => getEventById(validId),
    enabled: !!validId,
  });

  const event = data?.success ? data.data : (data?.data ?? data);

  const isLoggedIn = !!currentUser;

  const currentUserId = currentUser?.userId || currentUser?.id;
  const isOwner = useMemo(() => {
    if (!isLoggedIn || !event || !currentUserId) return false;
    return String(currentUserId) === String(event?.creatorId);
  }, [isLoggedIn, event, currentUserId]);

  const fee = Number(event?.fee) || 0;

  const typeString = useMemo(() => {
    if (!event) return "";
    const visibility = event.isPublic ? "Public" : "Private";
    const payment = fee === 0 ? "Free" : "Paid";
    return `${visibility} ${payment}`;
  }, [event, fee]);

  return {
    event,
    isOwner,
    isLoggedIn,
    currentUserId,
    typeString,
    fee,
    
    isLoading: !isMounted || isAuthLoading || isEventLoading,
    error
  };
};
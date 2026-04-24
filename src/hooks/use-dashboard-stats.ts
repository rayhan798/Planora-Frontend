import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  getInvitations,
  getNotification,
  getMyEvents,
  getReviews,
} from "@/app/(public)/events/_actions";

export const useDashboardStats = () => {
  const { data: events, isLoading: eventsLoading } = useQuery({
    queryKey: ["my-events-dashboard"],
    queryFn: async () => await getMyEvents(),
  });

  const { data: notifications, isLoading: notifLoading } = useQuery({
    queryKey: ["user-notifications"],
    queryFn: async () => await getNotification(),
  });

  const { data: invitesData, isLoading: invitesLoading } = useQuery({
    queryKey: ["my-invitations"],
    queryFn: async () => await getInvitations(),
    refetchInterval: 5000,
  });

  const { data: reviewsData } = useQuery({
    queryKey: ["reviews", "my"],
    queryFn: async () => {
      const res = await getReviews();
      return Array.isArray(res) ? res : (res as any)?.data || [];
    },
  });

  const stats = useMemo(() => {
    const eventList = Array.isArray(events) ? events : (events as any)?.data || [];
    const inviteList = Array.isArray(invitesData) ? invitesData : (invitesData as any)?.data || [];
    const reviewList = Array.isArray(reviewsData) ? reviewsData : (reviewsData as any)?.data || [];

    const now = new Date();
    const completed = eventList.filter((e: any) => new Date(e.date) < now).length;
    const upcoming = eventList.filter((e: any) => new Date(e.date) >= now).length;
    const pending = inviteList.length;

    const hasData = eventList.length > 0 || inviteList.length > 0;

    return {
      totalEvents: eventList.length,
      pendingInvitations: inviteList.length,
     notificationCount: (notifications as any)?.notifications?.length || (notifications as any)?.data?.length || 0,
      totalReviews: reviewList.length || 0,
      recentEvents: [...eventList].reverse().slice(0, 5),
      pieData: hasData
        ? [
            { name: "Completed", value: completed, color: "#10b981" },
            { name: "Upcoming", value: upcoming, color: "#6366f1" },
            { name: "Pending", value: pending, color: "#f59e0b" },
          ]
        : [{ name: "No Data", value: 1, color: "#f1f5f9" }],
      chartData: [
        { name: "My Events", count: eventList.length },
        { name: "Invites", count: inviteList.length },
        { name: "Reviews", count: reviewList.length },
      ],
    };
  }, [events, invitesData, notifications, reviewsData]);

  return {
    stats,
    isLoading: eventsLoading || notifLoading || invitesLoading,
  };
};
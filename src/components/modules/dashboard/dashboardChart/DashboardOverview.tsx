"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Calendar,
  Clock,
  Bell,
  ArrowUpRight,
  Loader2,
  MessageSquare,
  UserPlus,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  getInvitations,
  getNotification,
  getMyEvents, 
  getReviews,
} from "@/app/(public)/events/_actions";

export default function DashboardOverview() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);


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


    const pendingInvitesOnly = inviteList.filter((inv: any) => inv.status === "PENDING");
    const pendingCount = pendingInvitesOnly.length;

    const completed = eventList.filter((e: any) => new Date(e.date) < now).length;
    const upcoming = eventList.filter((e: any) => new Date(e.date) >= now).length;

    const hasData = eventList.length > 0 || pendingCount > 0;

    return {
      totalEvents: eventList.length,
      pendingInvitations: pendingCount,
      notificationCount: Array.isArray(notifications?.data) ? notifications.data.length : 0,
      totalReviews: reviewList.length || 0,
      recentEvents: [...eventList].reverse().slice(0, 5),

      pieData: hasData
        ? [
            { name: "Completed", value: completed, color: "#10b981" },
            { name: "Upcoming", value: upcoming, color: "#6366f1" },
            { name: "Pending", value: pendingCount, color: "#f59e0b" },
          ]
        : [{ name: "No Data", value: 1, color: "#f1f5f9" }],

      chartData: [
        { name: "My Events", count: eventList.length },
        { name: "Invites", count: pendingCount },
        { name: "Reviews", count: reviewList.length },
      ],
    };
  }, [events, invitesData, notifications, reviewsData]);

  if (!isMounted || eventsLoading || notifLoading || invitesLoading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 bg-slate-50/40 min-h-screen font-sans">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-black tracking-tight text-slate-900 uppercase italic">
          Overview
        </h1>
        <p className="text-slate-500 font-bold">
          Real-time metrics for your hosted events and interactions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="My Events"
          value={stats.totalEvents}
          icon={<Calendar size={20} />}
          color="bg-indigo-50 text-indigo-600"
        />
        <StatCard
          title="Pending Invites"
          value={stats.pendingInvitations} // এখানে ফিল্টার করা ভ্যালু বসবে
          icon={<UserPlus size={20} />}
          color="bg-amber-50 text-amber-500"
        />
        <StatCard
          title="Reviews Received"
          value={stats.totalReviews}
          icon={<MessageSquare size={20} />}
          color="bg-emerald-50 text-emerald-600"
        />
        <StatCard
          title="Notifications"
          value={stats.notificationCount}
          icon={<Bell size={20} />}
          color="bg-rose-50 text-rose-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
        <Card className="lg:col-span-4 border-none shadow-sm rounded-3xl bg-white/80 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="text-lg font-bold">My Activity Metrics</CardTitle>
          </CardHeader>
          <CardContent className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 11, fontWeight: 600 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 11 }} />
                <Tooltip cursor={{ fill: "#f8fafc" }} contentStyle={{ borderRadius: "16px", border: "none" }} />
                <Bar dataKey="count" fill="#6366f1" radius={[10, 10, 0, 0]} barSize={45} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3 border-none shadow-sm rounded-3xl bg-white/80 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-center">Event Distribution</CardTitle>
          </CardHeader>
          <CardContent className="h-[350px] w-full flex flex-col justify-center">
            <ResponsiveContainer width="100%" height="80%">
              <PieChart>
                <Pie
                  data={stats.pieData}
                  innerRadius={80}
                  outerRadius={105}
                  paddingAngle={10}
                  dataKey="value"
                  strokeWidth={0}
                >
                  {stats.pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-6 mt-4">
               {stats.pieData.map((item) => (
                 <div key={item.name} className="flex flex-col items-center">
                   <div className="flex items-center gap-1.5 mb-1">
                     <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                     <span className="text-[11px] font-bold text-slate-500 uppercase">{item.name}</span>
                   </div>
                   <span className="text-sm font-black text-slate-800">{item.value}</span>
                 </div>
               ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-none shadow-sm rounded-3xl bg-white/80 overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between border-b border-slate-50">
          <div>
            <CardTitle className="text-lg font-bold italic">Latest My Events</CardTitle>
            <CardDescription className="text-[11px]">Recent events created by you</CardDescription>
          </div>
          <Link href="/dashboard/my-events">
            <Button variant="outline" size="sm" className="rounded-full font-bold text-xs border-slate-200">View All</Button>
          </Link>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow>
                <TableHead className="font-bold uppercase text-[10px] pl-6">Title</TableHead>
                <TableHead className="font-bold uppercase text-[10px]">Date</TableHead>
                <TableHead className="text-right font-bold uppercase text-[10px] pr-6">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stats.recentEvents.length > 0 ? (
                stats.recentEvents.map((event: any) => (
                  <TableRow key={event.id} className="group hover:bg-slate-50/60">
                    <TableCell className="font-bold text-slate-700 py-4 pl-6">{event.title}</TableCell>
                    <TableCell>
                      <Badge className="font-bold text-[9px] uppercase px-2 py-0.5 bg-indigo-50 text-indigo-700 shadow-none">
                        {new Date(event.date).toLocaleDateString()}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right pr-6">
                      <Link href={`/events/${event.id}`}>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full group-hover:bg-indigo-600 group-hover:text-white">
                          <ArrowUpRight size={14} />
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-16 text-slate-400 italic">No personal events found.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

function StatCard({ title, value, icon, color }: any) {
  return (
    <Card className="border-none shadow-sm rounded-3xl bg-white hover:scale-[1.02] transition-transform duration-300">
      <CardContent className="p-6">
        <div className={`p-3 w-fit rounded-2xl ${color} shadow-sm mb-4`}>{icon}</div>
        <div className="space-y-1">
          <h3 className="text-3xl font-black text-slate-900 tracking-tight">{value}</h3>
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{title}</p>
        </div>
      </CardContent>
    </Card>
  );
}
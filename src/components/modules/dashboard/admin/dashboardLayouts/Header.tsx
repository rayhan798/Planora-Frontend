"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Menu, Bell, Search, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  getInvitations,
  getMyProfile,
  logoutAction,
} from "@/app/(public)/events/_actions";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

export default function Header({ onMenuClick }: { onMenuClick: () => void }) {
  const queryClient = useQueryClient();

  const { data: profile, isLoading: isProfileLoading } = useQuery({
    queryKey: ["user-profile"],
    queryFn: async () => await getMyProfile(),
    retry: false,
  });

  
  const userData = (profile as any)?.data || profile;
  const user = userData && userData.name ? userData : null;

  const { data: invitesData } = useQuery({
    queryKey: ["invitations"],
    queryFn: async () => await getInvitations(),
    enabled: !!user, 
  });

  const handleLogout = async () => {
    try {
      queryClient.clear();
      localStorage.removeItem("token");
      localStorage.removeItem("accessToken");
      await logoutAction();
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout failed:", error);
      window.location.href = "/login";
    }
  };

  const inviteList = useMemo(() => {
    const list = Array.isArray(invitesData)
      ? invitesData
      : (invitesData as any)?.data || [];
    return list;
  }, [invitesData]);
  
  const notificationCount = inviteList.filter((inv: any) => inv.status === "PENDING").length;

  const firstLetter = user?.name
    ? user.name.charAt(0).toUpperCase()
    : "U";

  return (
    <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-100 flex items-center justify-between px-6 sticky top-0 z-30">
      <div className="flex items-center gap-4 flex-1">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={onMenuClick}
        >
          <Menu />
        </Button>

        <div className="hidden md:flex relative w-full max-w-sm group">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors"
            size={16}
          />
          <Input
            placeholder="Search events..."
            className="pl-10 h-11 rounded-xl bg-slate-50 border-none focus-visible:ring-2 focus-visible:ring-indigo-500/20 font-medium"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
      
        <Link href="/dashboard/pending-invitations">
          <Button
            variant="outline"
            size="icon"
            className="rounded-xl relative hover:bg-slate-50 border-slate-200"
          >
            <Bell size={18} className="text-slate-600" />
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center bg-rose-500 text-[10px] font-bold text-white rounded-full border-2 border-white animate-in zoom-in">
                {notificationCount > 9 ? "9+" : notificationCount}
              </span>
            )}
          </Button>
        </Link>

      
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 p-1 pr-3 hover:bg-slate-50 rounded-xl transition-all active:scale-95 group outline-none">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-black shadow-lg shadow-indigo-200 overflow-hidden">
                {user?.image ? (
                  <img
                    src={user.image}
                    alt="user"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  firstLetter
                )}
              </div>

              <div className="text-left hidden sm:block">
                {isProfileLoading ? (
                  <div className="space-y-1">
                    <div className="h-1.5 w-16 bg-slate-200 animate-pulse rounded" />
                    <div className="h-1.5 w-10 bg-slate-100 animate-pulse rounded mt-1" />
                  </div>
                ) : (
                  <>
                    <p className="text-[11px] font-black text-slate-900 leading-none">
                      {user?.name || "User"}
                    </p>
                    <p className="text-[9px] font-bold text-indigo-500 uppercase tracking-tighter mt-1">
                      {user?.role || "Member"}
                    </p>
                  </>
                )}
              </div>
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="w-56 p-2 rounded-2xl border-slate-100 shadow-2xl animate-in slide-in-from-top-2"
          >
            <div className="px-3 py-2">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Signed in as
              </p>
              <p className="text-xs font-bold text-slate-700 truncate">
                {user?.email || "Email not found"}
              </p>
            </div>

            <DropdownMenuSeparator className="bg-slate-50" />

            <Link href="/dashboard/settings/profile">
              <DropdownMenuItem className="rounded-xl font-bold py-3 cursor-pointer flex items-center gap-2 focus:bg-indigo-50 focus:text-indigo-600">
                <User size={16} /> Profile Settings
              </DropdownMenuItem>
            </Link>

            <DropdownMenuSeparator className="bg-slate-50" />

            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault();
                handleLogout();
              }}
              className="rounded-xl font-bold py-3 cursor-pointer text-rose-500 focus:bg-rose-50 focus:text-rose-600 flex items-center gap-2"
            >
              <LogOut size={16} /> Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
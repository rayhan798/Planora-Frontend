"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { 
  Calendar, Mail, Star, Settings, X, LayoutDashboard, User, Bell, ChevronDown 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getInvitations } from "@/app/(public)/events/_actions";

export default function Sidebar({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (val: boolean) => void }) {
  const pathname = usePathname();
  const [isSettingsOpen, setIsSettingsOpen] = useState(pathname.includes("/settings"));

  const { data: invitationsResponse } = useQuery({
    queryKey: ['invitations'], 
    queryFn: async () => {
      const res = await getInvitations();
      return res;
    },
    enabled: !pathname.includes("/payment/success"),
    refetchOnWindowFocus: true, 
  });

  const dynamicInviteCount = useMemo(() => {
    const list = Array.isArray(invitationsResponse) 
      ? invitationsResponse 
      : (invitationsResponse as any)?.data || [];
    
    return list.filter((inv: any) => inv.status === "PENDING").length;
  }, [invitationsResponse]);

  const sidebarItems = [
    { name: "Overview", icon: LayoutDashboard, href: "/dashboard" },
    { name: "My Events", icon: Calendar, href: "/dashboard/my-events" },
    { 
      name: "Pending Invitations", 
      icon: Mail, 
      href: "/dashboard/pending-invitations", 
      badge: dynamicInviteCount 
    },
    { name: "My Reviews", icon: Star, href: "/dashboard/reviews" },
  ];

  const settingSubItems = [
    { name: "Profile", icon: User, href: "/dashboard/settings/profile" },
    { name: "Notifications", icon: Bell, href: "/dashboard/settings/notifications" },
  ];

  return (
    <aside className={cn(
      "fixed lg:static inset-y-0 left-0 z-50 w-72 bg-slate-950 text-white transform transition-transform duration-300 ease-in-out border-r border-white/5",
      isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
    )}>
      <div className="h-screen flex flex-col p-6 sticky top-0"> 
        
        <div className="flex items-center justify-between mb-10 px-2 shrink-0">
          <Link href="/" className="group" onClick={() => setIsOpen(false)}>
            <h2 className="text-2xl font-black tracking-tighter text-white group-hover:text-indigo-400 transition-colors">
              PLAN<span className="text-indigo-500">ORA</span>
            </h2>
          </Link>
          <Button variant="ghost" size="icon" className="lg:hidden text-white hover:bg-white/10" onClick={() => setIsOpen(false)}>
            <X size={20} />
          </Button>
        </div>

        <nav className="flex-grow overflow-y-auto pr-2 custom-scrollbar overflow-x-hidden">
          <div className="space-y-1.5 pb-6">
            {sidebarItems.map((item) => {
              const isActive = pathname === item.href;
              const hasBadge = typeof item.badge === 'number' && item.badge > 0;

              return (
                <Link key={item.name} href={item.href} onClick={() => setIsOpen(false)}>
                  <div className={cn(
                    "flex items-center justify-between px-4 py-3.5 rounded-2xl font-bold transition-all duration-200 group",
                    isActive 
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" 
                      : "text-slate-400 hover:bg-white/5 hover:text-white"
                  )}>
                    <div className="flex items-center gap-3">
                      <item.icon size={20} className={cn(isActive ? "text-white" : "group-hover:scale-110 transition-transform")} />
                      <span className="text-sm tracking-tight">{item.name}</span>
                    </div>
                    
                    {hasBadge && (
                      <span className="bg-rose-500 text-white text-[10px] font-black px-2 py-0.5 rounded-lg shadow-md animate-in zoom-in duration-300">
                        {item.badge}
                      </span>
                    )}
                  </div>
                </Link>
              );
            })}

            <div className="space-y-1">
              <button 
                onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                className={cn(
                  "w-full flex items-center justify-between px-4 py-3.5 rounded-2xl font-bold transition-all duration-200 group",
                  pathname.includes("/settings") ? "text-white bg-white/5" : "text-slate-400 hover:bg-white/5 hover:text-white"
                )}
              >
                <div className="flex items-center gap-3">
                  <Settings size={20} className={cn(pathname.includes("/settings") ? "text-indigo-400" : "group-hover:rotate-45 transition-transform duration-500")} />
                  <span className="text-sm tracking-tight">Settings</span>
                </div>
                <ChevronDown size={16} className={cn("transition-transform duration-300", isSettingsOpen && "rotate-180")} />
              </button>

              {isSettingsOpen && (
                <div className="ml-4 pl-4 border-l border-white/10 space-y-1 mt-1 animate-in slide-in-from-top-2">
                  {settingSubItems.map((sub) => {
                    const isSubActive = pathname === sub.href;
                    return (
                      <Link key={sub.name} href={sub.href} onClick={() => setIsOpen(false)}>
                        <div className={cn(
                          "flex items-center gap-3 px-4 py-2.5 rounded-xl font-bold transition-all duration-200",
                          isSubActive ? "text-indigo-400 bg-indigo-400/10" : "text-slate-500 hover:text-slate-200"
                        )}>
                          <sub.icon size={18} />
                          <span className="text-xs tracking-tight">{sub.name}</span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
}
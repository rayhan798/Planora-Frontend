"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Calendar, 
  Star, 
  Settings, 
  X, 
  LayoutDashboard, 
  Users, 
  Flag, 
  ChevronDown,
  User,
  Bell,
  MessageSquare
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const pathname = usePathname();

  const [isSettingsOpen, setIsSettingsOpen] = useState(pathname.includes("/settings"));

  const sidebarItems = [
    { 
      name: "Overview", 
      icon: LayoutDashboard, 
      href: "/admin" 
    },
    { 
      name: "Events", 
      icon: Calendar, 
      href: "/admin/events" 
    },
    { 
      name: "Users", 
      icon: Users, 
      href: "/admin/users" 
    },
    { 
      name: "Reviews", 
      icon: Star, 
      href: "/admin/reviews" 
    },
    { 
      name: "Messages", 
      icon: MessageSquare, 
      href: "/admin/contact-us" 
    },
  ];

  const settingSubItems = [
    { name: "Profile", icon: User, href: "/admin/settings/profile" },
    { name: "Notifications", icon: Bell, href: "/admin/settings/notifications" },
  ];

  return (
    <aside className={cn(
      "fixed lg:static inset-y-0 left-0 z-50 w-72 bg-slate-950 text-white transform transition-transform duration-300 ease-in-out border-r border-white/5",
      isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
    )}>
      <div className="h-screen flex flex-col p-6 sticky top-0"> 
        
        {/* Logo Section */}
        <div className="flex items-center justify-between mb-10 px-2 shrink-0">
          <Link href="/" className="group" onClick={() => setIsOpen(false)}>
            <h2 className="text-2xl font-black tracking-tighter text-white group-hover:text-indigo-400 transition-colors">
              PLAN<span className="text-indigo-500">ORA</span>
            </h2>
          </Link>
          <Button 
            variant="ghost" 
            size="icon" 
            className="lg:hidden text-white hover:bg-white/10 rounded-xl" 
            onClick={() => setIsOpen(false)}
          >
            <X size={20} />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-grow overflow-y-auto pr-2 custom-scrollbar overflow-x-hidden space-y-1.5">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href;
            
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
                </div>
              </Link>
            );
          })}

          {/* Settings Accordion */}
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
              <ChevronDown size={16} className={cn("transition-transform duration-300 opacity-50", isSettingsOpen && "rotate-180")} />
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
        </nav>

 

      </div>
    </aside>
  );
}
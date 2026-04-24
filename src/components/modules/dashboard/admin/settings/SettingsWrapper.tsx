"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, Bell, Shield, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface SettingsWrapperProps {
  children: React.ReactNode;
}

export default function SettingsWrapper({ children }: SettingsWrapperProps) {
  const pathname = usePathname();

  const SETTINGS_NAV = [
    {
      label: "My Profile",
      href: "/dashboard/settings/profile",
      icon: User,
      desc: "Personal info & bio"
    },
    {
      label: "Notifications",
      href: "/dashboard/settings/notifications",
      icon: Bell,
      desc: "Alerts & email setup"
    }
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      {/* Header with Back Button */}
      <div className="flex flex-col gap-4">
        <Link 
          href="/dashboard" 
          className="flex items-center gap-2 text-slate-400 hover:text-indigo-600 font-bold text-xs uppercase tracking-widest transition-colors w-fit"
        >
          <ArrowLeft size={16} /> Back to Overview
        </Link>
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">
          Account <span className="text-indigo-600">Settings</span>
        </h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-10 items-start">
        {/* Settings Mini-Sidebar */}
        <div className="w-full lg:w-72 space-y-3 shrink-0">
          {SETTINGS_NAV.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.href} 
                href={item.href}
                className={cn(
                  "flex items-center gap-4 p-5 rounded-[2rem] border transition-all duration-300",
                  isActive 
                    ? "bg-slate-900 border-slate-900 text-white shadow-xl shadow-slate-200" 
                    : "bg-white border-slate-100 text-slate-500 hover:border-indigo-200 hover:bg-indigo-50/30"
                )}
              >
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
                  isActive ? "bg-white/10 text-white" : "bg-slate-50 text-slate-400"
                )}>
                  <item.icon size={20} />
                </div>
                <div className="overflow-hidden">
                  <p className="font-black text-sm leading-none">{item.label}</p>
                  <p className={cn(
                    "text-[10px] font-bold uppercase tracking-wider mt-1.5 truncate",
                    isActive ? "text-slate-400" : "text-slate-300"
                  )}>
                    {item.desc}
                  </p>
                </div>
              </Link>
            );
          })}
          
          {/* Decorative Security Info */}
          <div className="p-6 bg-indigo-600 rounded-[2rem] text-white mt-6 hidden lg:block relative overflow-hidden">
            <div className="relative z-10">
              <Shield size={24} className="mb-4 opacity-80" />
              <p className="font-black text-sm leading-tight">Data Privacy</p>
              <p className="text-[10px] font-bold text-indigo-200 mt-2 leading-relaxed">
                Your profile data is encrypted and never shared with third parties.
              </p>
            </div>
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
          </div>
        </div>

        {/* Main Form Content Area */}
        <div className="flex-1 w-full">
          {children}
        </div>
      </div>
    </div>
  );
}
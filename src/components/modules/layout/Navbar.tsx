"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { 
  LogOut, LayoutDashboard, Settings, 
  Menu, Home, Calendar, Layers 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  getMyProfile, 
  logoutAction 
} from "@/app/(public)/events/_actions"; 
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

export default function Navbar() {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);

  const { data: profile, isLoading } = useQuery({
    queryKey: ['user-profile'],
    queryFn: async () => await getMyProfile(),
    retry: false,
  });

 
  const userData = (profile as any)?.data || profile;
  const user = userData && userData.name ? userData : null;

  const handleLogout = async () => {
    try {
      queryClient.clear();
      localStorage.removeItem("token");
      localStorage.removeItem("accessToken");
      await logoutAction();
      window.location.href = "/login";
    } catch (error) {
      window.location.href = "/login";
    }
  };

  const firstLetter = user?.name 
    ? user.name.charAt(0).toUpperCase() 
    : "U";

  const navLinks = [
    { name: "Home", href: "/", icon: Home },
    { name: "Events", href: "/events", icon: Calendar },
    ...(user ? [{ name: "Dashboard", href: "/dashboard", icon: Layers }] : []),
  ];

  return (
    <nav className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        
        {/* Mobile Toggle Button */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-xl">
                <Menu size={24} className="text-slate-600" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px] flex flex-col items-center justify-center bg-white border-r-0">
              <SheetHeader className="sr-only">
                <SheetTitle>Navigation Menu</SheetTitle>
              </SheetHeader>

              <div className="flex flex-col gap-8 text-center w-full">
                <p className="text-3xl font-black text-indigo-600 italic mb-6 tracking-tighter">Planora</p>
                
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-4 text-xl font-black text-slate-800 hover:text-indigo-600 transition-all uppercase tracking-tighter group"
                  >
                    <link.icon size={22} className="group-hover:scale-110 transition-transform" />
                    {link.name}
                  </Link>
                ))}
                
                
                {!user && (
                    <div className="pt-4 px-6">
                        <Link href="/login" onClick={() => setIsOpen(false)}>
                            <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black h-14 shadow-lg transition-all">
                                Login Now
                            </Button>
                        </Link>
                    </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Logo */}
        <Link href="/" className="text-2xl font-black text-indigo-600 tracking-tighter hover:opacity-90 transition italic">
          Planora
        </Link>
        
        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-bold text-slate-600">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} className="hover:text-indigo-600 transition-colors">
              {link.name}
            </Link>
          ))}
        </div>

        {/* Auth Section */}
        <div className="flex items-center gap-3">
          {isLoading ? (
             <div className="w-10 h-10 rounded-xl bg-slate-100 animate-pulse" />
          ) : user ? ( 
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 p-1 hover:bg-slate-50 rounded-xl transition-all outline-none">
                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-black shadow-lg overflow-hidden">
                    {user.image ? (
                      <img src={user.image} alt="user" className="w-full h-full object-cover" />
                    ) : (
                      firstLetter
                    )}
                  </div>
                  <div className="text-left hidden sm:block pr-2">
                    <p className="text-[11px] font-black text-slate-900 leading-none">
                      {user.name}
                    </p>
                    <p className="text-[9px] font-bold text-indigo-500 uppercase mt-1">Online</p>
                  </div>
                </button>
              </DropdownMenuTrigger>
              
              <DropdownMenuContent align="end" className="w-56 p-2 rounded-2xl border-slate-100 shadow-2xl">
                <div className="px-3 py-2">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Account</p>
                  <p className="text-xs font-bold text-slate-700 truncate">{user.email}</p>
                </div>
                
                <DropdownMenuSeparator />

                <Link href="/dashboard">
                  <DropdownMenuItem className="rounded-xl font-bold py-3 cursor-pointer gap-2">
                    <LayoutDashboard size={16} /> Dashboard
                  </DropdownMenuItem>
                </Link>

                <Link href="/dashboard/settings/profile">
                  <DropdownMenuItem className="rounded-xl font-bold py-3 cursor-pointer gap-2">
                    <Settings size={16} /> Settings
                  </DropdownMenuItem>
                </Link>

                <DropdownMenuSeparator />

                <DropdownMenuItem 
                  onSelect={(e) => {
                    e.preventDefault();
                    handleLogout();
                  }}
                  className="rounded-xl font-bold py-3 cursor-pointer text-rose-500 focus:bg-rose-50 focus:text-rose-600 gap-2"
                >
                  <LogOut size={16} /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link href="/login" className="hidden sm:block">
                <Button variant="ghost" className="font-bold text-slate-600 hover:text-indigo-600">
                  Login
                </Button>
              </Link>
              
              <Link href="/register">
                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl px-6 font-bold shadow-lg transition-all active:scale-95">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
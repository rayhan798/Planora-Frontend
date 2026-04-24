"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { 
  Search, 
  MoreVertical, 
  UserX, 
  ShieldCheck, 
  Mail, 
  ShieldAlert,
  Trash2,
  Filter,
  UserCheck,
  Loader2
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getAllUsers, deleteUser } from "@/app/(public)/events/_actions";

export default function UsersManagementPage() {
  const [search, setSearch] = useState("");

  const { data: apiResponse, isLoading, refetch } = useQuery({
    queryKey: ["all-users"],
    queryFn: async () => await getAllUsers(),
  });

  const users = useMemo(() => {
    if (!apiResponse) return [];
    const rawData = Array.isArray(apiResponse) ? apiResponse : (apiResponse as any)?.data || [];
    return Array.isArray(rawData) ? rawData : [];
  }, [apiResponse]);

  const filteredUsers = useMemo(() => {
    return users.filter((user: any) => 
      user?.name?.toLowerCase().includes(search.toLowerCase()) || 
      user?.email?.toLowerCase().includes(search.toLowerCase())
    );
  }, [users, search]);

  const handleDeleteUser = async (id: any) => {
    if (confirm("Are you sure you want to delete this user forever?")) {
      try {
        const res = await deleteUser(id);
        if (res) {
          alert("User removed successfully!");
          refetch(); 
        }
      } catch (error: any) {
        alert(error.message || "Failed to delete user");
      }
    }
  };

  const toggleUserStatus = (id: string, currentStatus: string) => {
      alert(`Updating status for user: ${id}. Current: ${currentStatus}`);
  };

  if (isLoading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-slate-50">
        <Loader2 className="animate-spin text-indigo-600 mb-4" size={48} />
        <p className="text-slate-400 font-black uppercase tracking-widest text-[10px]">Syncing User Database...</p>
      </div>
    );
  }

  return (
    <div className="p-8 bg-slate-50 min-h-screen font-sans">
      {/* --- Header Section --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-black text-slate-900 italic tracking-tighter uppercase leading-none">
            User <span className="text-indigo-600">Management</span>
          </h1>
          <p className="text-slate-500 font-bold text-sm mt-2">Monitor and control all registered users on the platform.</p>
        </div>
        <div className="flex items-center gap-3">
            <Badge className="bg-white text-indigo-600 border-indigo-100 px-5 py-2 rounded-2xl font-black italic shadow-sm">
                Total Users: {users.length}
            </Badge>
        </div>
      </div>

      {/* --- Search & Filter Bar --- */}
      <div className="bg-white p-4 rounded-[2rem] shadow-sm border border-slate-100 mb-8 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            placeholder="Search by name or email..." 
            className="pl-12 h-12 rounded-2xl border-none bg-slate-50 font-bold w-full outline-none focus:ring-2 focus:ring-indigo-100 transition-all" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button variant="outline" className="h-12 rounded-2xl border-slate-100 font-bold gap-2 px-6 bg-white">
          <Filter size={18} /> Role: All
        </Button>
      </div>

      {/* --- Users Table --- */}
      <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 overflow-hidden border border-slate-50">
        <Table>
          <TableHeader className="bg-slate-50/50">
            <TableRow className="hover:bg-transparent border-none">
              <TableHead className="px-8 py-6 font-black uppercase text-[10px] tracking-[0.2em] text-slate-400">User Identity</TableHead>
              <TableHead className="font-black uppercase text-[10px] tracking-[0.2em] text-slate-400">Joined Date</TableHead>
              <TableHead className="font-black uppercase text-[10px] tracking-[0.2em] text-slate-400">Role</TableHead>
              <TableHead className="font-black uppercase text-[10px] tracking-[0.2em] text-slate-400">Status</TableHead>
              <TableHead className="text-right px-8 font-black uppercase text-[10px] tracking-[0.2em] text-slate-400">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <AnimatePresence mode="popLayout">
              {filteredUsers.map((user: any) => {
                const userId = user.id || user._id;
                const joinedDate = user.joined || (user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A");
                const userStatus = (user.status || "ACTIVE").toUpperCase();
                const userRole = (user.role || "USER").toUpperCase();
                
                return (
                  <motion.tr 
                    key={userId} 
                    layout
                    initial={{ opacity: 0, y: 10 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    exit={{ opacity: 0, scale: 0.95 }} 
                    className="group border-b border-slate-50 hover:bg-slate-50/50 transition-colors"
                  >
                    <TableCell className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12 rounded-2xl border-2 border-white shadow-sm shrink-0">
                          <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`} />
                          <AvatarFallback className="font-black bg-indigo-50 text-indigo-600">{user?.name?.[0] || "U"}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-black text-slate-900 italic tracking-tight text-lg leading-tight mb-0.5">{user.name}</div>
                          <div className="flex items-center gap-1.5 text-slate-400 font-bold text-xs">
                            <Mail size={12} /> {user.email}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-bold text-slate-600 text-sm">
                      {joinedDate}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`rounded-lg font-black text-[10px] uppercase px-3 py-1 ${userRole === 'ADMIN' ? 'border-indigo-200 text-indigo-600 bg-indigo-50/30' : 'border-slate-200 text-slate-500'}`}>
                        {userRole}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={`rounded-full px-4 py-1 font-black text-[10px] uppercase border-none ${userStatus === 'ACTIVE' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                        {userStatus}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right px-8">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-10 w-10 p-0 rounded-xl hover:bg-slate-100">
                            <MoreVertical size={20} className="text-slate-400" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="rounded-2xl border-slate-100 w-56 p-2 shadow-2xl">
                          <DropdownMenuLabel className="font-black italic text-[10px] uppercase tracking-widest text-slate-400 p-3">Admin Panel</DropdownMenuLabel>
                          
                          <DropdownMenuItem className="rounded-xl font-bold py-3 cursor-pointer gap-3">
                            <ShieldCheck size={16} className="text-slate-400" /> View Log
                          </DropdownMenuItem>

                          <DropdownMenuItem 
                              className={`rounded-xl font-bold py-3 cursor-pointer gap-3 ${userStatus === 'ACTIVE' ? 'text-amber-600' : 'text-emerald-600'}`}
                              onClick={() => toggleUserStatus(userId, userStatus)}
                          >
                            {userStatus === 'ACTIVE' ? (
                                <><ShieldAlert size={16} /> Ban User</>
                            ) : (
                                <><UserCheck size={16} /> Unban User</>
                            )}
                          </DropdownMenuItem>

                          <DropdownMenuSeparator className="bg-slate-50" />
                          
                          <DropdownMenuItem 
                            className="rounded-xl font-bold py-3 cursor-pointer gap-3 text-red-500 focus:bg-red-50 focus:text-red-600"
                            onClick={() => handleDeleteUser(userId)}
                          >
                            <Trash2 size={16} /> Remove Account
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </motion.tr>
                );
              })}
            </AnimatePresence>
          </TableBody>
        </Table>
        
        {!isLoading && filteredUsers.length === 0 && (
          <div className="p-24 text-center">
             <div className="w-20 h-20 bg-slate-50 rounded-[2rem] flex items-center justify-center mx-auto mb-6">
                <UserX size={40} className="text-slate-200" />
             </div>
             <h3 className="text-xl font-black italic text-slate-900 tracking-tight">Zero Results</h3>
             <p className="text-slate-400 font-bold text-sm">We couldn't find any users matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
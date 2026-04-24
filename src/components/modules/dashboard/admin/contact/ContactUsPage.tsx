"use client";

import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { getAllContactMessages } from "@/app/(public)/events/_actions";
import { Card } from "@/components/ui/card";
import { 
  Loader2, Mail, Calendar, MessageSquare, 
  AlertCircle, ChevronRight, Search, Filter 
} from "lucide-react";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const AdminContactMessages = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading, isError, refetch, isFetching } = useQuery({
    queryKey: ["contact-messages"], 
    queryFn: async () => {
      const response = await getAllContactMessages();
      const messages = Array.isArray(response) ? response : response?.data || [];
      return messages;
    },
    staleTime: 1000 * 60 * 5, 
  });

  const filteredMessages = useMemo(() => {
    const list = Array.isArray(data) ? data : [];
    if (!searchTerm) return list;
    
    const lowerTerm = searchTerm.toLowerCase();
    return list.filter((msg: any) =>
      msg?.name?.toLowerCase().includes(lowerTerm) ||
      msg?.subject?.toLowerCase().includes(lowerTerm) ||
      msg?.email?.toLowerCase().includes(lowerTerm)
    );
  }, [data, searchTerm]);

  if (isLoading) {
    return (
      <div className="h-[70vh] flex flex-col items-center justify-center space-y-4">
        <div className="relative flex justify-center items-center">
            <div className="absolute h-16 w-16 animate-ping rounded-full bg-indigo-100 opacity-75"></div>
            <Loader2 className="animate-spin text-indigo-600 relative" size={48} />
        </div>
        <p className="text-slate-500 font-black uppercase tracking-widest text-xs animate-pulse">
            Syncing Inquiries...
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-10 max-w-7xl mx-auto animate-in fade-in duration-700">
      
      {/* --- Header Section --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight uppercase italic">
            Admin <span className="text-indigo-600">Messages</span>
          </h1>
          <p className="text-slate-400 font-bold text-sm mt-1 italic">
             Managing {filteredMessages.length} total inquiries.
          </p>
        </div>
        <Button 
          disabled={isFetching}
          onClick={() => refetch()}
          className="rounded-2xl font-black uppercase tracking-widest px-6 h-12 bg-slate-50 text-slate-900 hover:bg-indigo-600 hover:text-white transition-all border border-slate-100"
        >
          {isFetching ? <Loader2 className="animate-spin mr-2" size={16} /> : null}
          Refresh
        </Button>
      </div>

      {/* --- Search Bar --- */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1 group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <Input 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by sender, subject or email..." 
            className="pl-14 h-16 bg-white rounded-[1.5rem] shadow-sm font-bold border-slate-100 outline-none focus:ring-2 focus:ring-indigo-500 transition-all" 
          />
        </div>
        <Button variant="outline" className="h-16 px-8 rounded-[1.5rem] font-black gap-3 bg-white border-slate-100">
          <Filter size={20} /> Filter
        </Button>
      </div>

      {/* --- Main Content --- */}
      {isError ? (
        <div className="text-center p-12 bg-red-50 rounded-[3rem] border border-red-100">
          <AlertCircle className="mx-auto text-red-500 mb-4" size={48} />
          <h2 className="text-xl font-bold text-red-800 tracking-tighter uppercase italic">Connection Failed</h2>
          <Button 
            onClick={() => refetch()} 
            className="mt-4 bg-red-600 hover:bg-red-700 text-white font-black px-8 h-12 rounded-xl transition-all shadow-lg"
          >
            RETRY NOW
          </Button>
        </div>
      ) : filteredMessages.length === 0 ? (
        <div className="text-center py-24 bg-slate-50 rounded-[4rem] border-2 border-dashed border-slate-200">
          <MessageSquare className="mx-auto text-slate-300 mb-4" size={48} />
          <p className="text-slate-400 font-bold italic text-lg">No messages found in your inbox.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredMessages.map((msg: any, index: number) => (
              <motion.div
                key={msg.id || msg._id || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="group p-0 rounded-[2.5rem] border-none shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-500 bg-white overflow-hidden border border-transparent hover:border-indigo-100">
                  <div className="flex flex-col md:flex-row">
                    
                    {/* Left Panel */}
                    <div className="md:w-1/4 p-8 bg-slate-50/50 group-hover:bg-indigo-50/30 transition-colors flex flex-col justify-between border-r border-slate-100/50">
                      <div className="space-y-4">
                        <div className="flex items-center gap-4">
                           <div className="h-12 w-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white font-black text-xl shadow-lg uppercase">
                              {msg.name?.charAt(0) || "A"}
                           </div>
                           <div className="flex flex-col overflow-hidden">
                              <span className="font-black text-slate-800 truncate leading-none mb-1 uppercase text-sm tracking-tighter">
                                {msg.name || "Anonymous"}
                              </span>
                              <span className="text-[10px] font-black w-fit px-2 py-0.5 rounded-md bg-amber-100 text-amber-600 uppercase">
                                {msg.status || "NEW"}
                              </span>
                           </div>
                        </div>
                        
                        <div className="space-y-2 pt-4 border-t border-slate-200/50">
                          <div className="flex items-center gap-3 text-slate-500">
                            <Mail size={14} className="flex-shrink-0" />
                            <span className="text-[11px] font-bold truncate">{msg.email}</span>
                          </div>
                          <div className="flex items-center gap-3 text-slate-400">
                            <Calendar size={14} className="flex-shrink-0" />
                            <span className="text-[11px] font-bold uppercase tracking-tight">
                              {msg.createdAt ? format(new Date(msg.createdAt), "dd MMM, yyyy") : "Date Pending"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Content Panel */}
                    <div className="md:w-3/4 p-8 relative flex flex-col justify-center">
                      <div className="relative z-10 space-y-3">
                        <h3 className="text-xl font-black text-slate-800 group-hover:text-indigo-600 transition-colors uppercase italic tracking-tighter">
                          {msg.subject || "No Subject"}
                        </h3>
                        <p className="text-slate-600 text-sm leading-relaxed font-bold bg-slate-50/50 p-6 rounded-[1.5rem] border border-slate-100/50">
                          {msg.message}
                        </p>
                      </div>

     
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default AdminContactMessages;
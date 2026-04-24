"use client";

import React, { useState, useMemo } from "react";
import { Search, Filter, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import EventTable from "./EventTable";
import { useQuery } from "@tanstack/react-query";
import { getEvents } from "@/app/(public)/events/_actions"; 

export default function AllEventsModule() {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: rawData, isLoading, isError } = useQuery({
    queryKey: ["events", "all"], 
    queryFn: async () => {
      const res = await getEvents();
      return Array.isArray(res) ? res : (res as any)?.data || [];
    },
  });

  const filteredEvents = useMemo(() => {
    const list = Array.isArray(rawData) ? rawData : [];
    if (!searchTerm) return list;
    
    const lowerSearch = searchTerm.toLowerCase();
    return list.filter((event: any) =>
      event?.title?.toLowerCase().includes(lowerSearch) ||
      event?.category?.toLowerCase().includes(lowerSearch) ||
      event?.location?.toLowerCase().includes(lowerSearch)
    );
  }, [rawData, searchTerm]);

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      
      {/* --- Header Section (Create Button Removed) --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight uppercase italic">
            Global <span className="text-indigo-600">Events</span>
          </h1>
          <p className="text-slate-400 font-bold text-sm mt-1 italic">
              Managing {filteredEvents.length} total events in platform.
          </p>
        </div>
      </div>

      {/* --- Search & Filter Bar --- */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1 group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <Input 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search events by title, category or location..." 
            className="pl-14 h-16 bg-white rounded-[1.5rem] shadow-sm font-bold border-slate-100 outline-none focus:ring-2 focus:ring-indigo-500 transition-all" 
          />
        </div>
        <Button variant="outline" className="h-16 px-8 rounded-[1.5rem] font-black gap-3 bg-white border-slate-100 hover:bg-slate-50 transition-colors">
          <Filter size={20} /> Filter
        </Button>
      </div>

      {/* --- Content Section --- */}
      {isLoading ? (
        <div className="h-80 flex flex-col items-center justify-center bg-white rounded-[4rem] border border-slate-50 shadow-inner">
          <Loader2 className="animate-spin text-indigo-600 mb-4" size={48} />
          <p className="text-slate-400 font-black uppercase tracking-widest text-xs animate-pulse">
            Syncing Events Database...
          </p>
        </div>
      ) : isError ? (
        <div className="text-center py-20 bg-red-50 rounded-[4rem] border border-red-100">
           <p className="text-red-500 font-bold italic">Failed to load events. Please try again.</p>
        </div>
      ) : filteredEvents.length === 0 ? (
        <div className="text-center py-20 bg-slate-50 rounded-[4rem] border-2 border-dashed border-slate-200">
           <p className="text-slate-400 font-bold italic">No events found matching your search.</p>
        </div>
      ) : (
        <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-sm">
           <EventTable events={filteredEvents} />
        </div>
      )}
    </div>
  );
}
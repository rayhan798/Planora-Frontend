"use client";

import React from "react";
import { Search, Filter, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import EventTable from "./EventTable";
import CreateEventModal from "./CreateEventModal";
import { useMyEvents } from "../../../../hooks/use-my-events";

export default function MyEventsModule({ currentUserId }: { currentUserId: any }) {
  const { searchTerm, setSearchTerm, filteredEvents, isLoading } = useMyEvents(currentUserId);

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">
            My <span className="text-indigo-600">Events</span>
          </h1>
          <p className="text-slate-400 font-bold text-sm mt-1 italic">
             Managing {filteredEvents.length} events hosted by you.
          </p>
        </div>
        <CreateEventModal />
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1 group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <Input 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search my events..." 
            className="pl-14 h-16 bg-white rounded-[1.5rem] shadow-sm font-bold border-slate-100 outline-none focus:ring-2 focus:ring-indigo-500" 
          />
        </div>
        <Button variant="outline" className="h-16 px-8 rounded-[1.5rem] font-black gap-3 bg-white">
          <Filter size={20} /> Filter
        </Button>
      </div>

      {isLoading ? (
        <div className="h-80 flex flex-col items-center justify-center bg-white rounded-[4rem] border border-slate-50">
          <Loader2 className="animate-spin text-indigo-600 mb-4" size={48} />
          <p className="text-slate-400 font-black">Syncing Your Events...</p>
        </div>
      ) : (
        <EventTable events={filteredEvents} />
      )}

      {!isLoading && filteredEvents.length === 0 && (
        <div className="text-center py-20 bg-slate-50 rounded-[4rem] border-2 border-dashed border-slate-200">
           <p className="text-slate-400 font-bold">No events found in your account.</p>
        </div>
      )}
    </div>
  );
}
"use client";

import React, { useState } from "react";
import { Search, Inbox, RefreshCcw, Loader2, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import InvitationCard from "./InvitationCard";
import PaymentModal from "./PaymentModal";
import { useInvitations } from "../../../../hooks/use-invitations-module";

export default function InvitationsModule() {
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const {
    searchTerm,
    setSearchTerm,
    filteredInvites,
    isLoading,
    isError,
    refetch,
    isRefetching,
    refreshInterval
  } = useInvitations();

  return (
    <div className="space-y-10 p-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-black text-slate-900 uppercase italic">
          My <span className="text-indigo-600">Invitations</span>
        </h1>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider">
              {refreshInterval === 1000 ? "Initializing..." : "Live Sync (20s)"}
            </span>
          </div>

          <Button 
            onClick={() => refetch()} 
            variant="outline" 
            className="gap-2 rounded-xl border-slate-200 font-bold hover:bg-indigo-50 hover:text-indigo-600 transition-all"
            disabled={isRefetching}
          >
            <RefreshCcw size={16} className={isRefetching ? "animate-spin" : ""} /> 
            {isRefetching ? "Updating..." : "Refresh"}
          </Button>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
        <Input 
          placeholder="Search by event title or host name..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="h-14 pl-12 rounded-2xl border-none bg-white shadow-sm ring-1 ring-slate-100 focus-visible:ring-indigo-600 transition-all text-lg"
        />
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-32 space-y-4">
          <Loader2 className="h-10 w-10 animate-spin text-indigo-600" />
          <p className="text-slate-500 font-bold animate-pulse">Syncing invitations...</p>
        </div>
      ) : isError ? (
        <div className="text-center py-20 bg-rose-50 rounded-[2rem] border-2 border-dashed border-rose-200">
          <AlertCircle className="mx-auto mb-3 text-rose-500" size={40} />
          <p className="text-rose-600 font-bold">Failed to sync data.</p>
          <Button onClick={() => refetch()} variant="ghost" className="mt-4 text-rose-600 hover:bg-rose-100">Try Again</Button>
        </div>
      ) : filteredInvites.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInvites.map((invite: any) => (
            <div key={invite.id} className="animate-in fade-in slide-in-from-bottom-2 duration-500">
              <InvitationCard 
                invite={invite} 
                onPayClick={(item) => setSelectedEvent(item)} 
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-slate-50/50 rounded-[2.5rem] border-2 border-dashed border-slate-200">
          <div className="bg-white w-20 h-20 rounded-3xl shadow-sm flex items-center justify-center mx-auto mb-6">
            <Inbox className="text-slate-300" size={32} />
          </div>
          <h3 className="text-xl font-bold text-slate-800">
            {searchTerm ? "No match found" : "No active invitations"}
          </h3>
          <p className="text-slate-400 mt-1 font-medium italic text-sm">
            {searchTerm ? "Try searching with a different keyword" : "Waiting for new invitations..."}
          </p>
        </div>
      )}

      {selectedEvent && (
        <PaymentModal 
          isOpen={!!selectedEvent} 
          onClose={() => setSelectedEvent(null)} 
          event={selectedEvent} 
        />
      )}
    </div>
  );
}
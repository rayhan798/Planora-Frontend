"use client";

import React, { useState } from "react";
import { MoreVertical, Edit, Trash2, Globe, Lock, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import ParticipantManager from "./ParticipantManager";
import EditEventModal from "./EditEventModal";
import { useEventActions } from "../../../../hooks/use-event-table-row";

export default function EventTableRow({ event }: { event: any }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { deleteEvent, isDeleting } = useEventActions();

  const eventId = event.id || event._id;

  return (
    <>
      <tr className="hover:bg-slate-50/50 transition-all border-b border-slate-100 last:border-0 group">
        <td className="px-8 py-7">
          <div className="flex items-center gap-5">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border ${
              event.type?.toLowerCase() === 'public' 
                ? 'bg-indigo-50 text-indigo-600 border-indigo-100' 
                : 'bg-amber-50 text-amber-600 border-amber-100'
            }`}>
              {event.type?.toLowerCase() === 'public' ? <Globe size={22} /> : <Lock size={22} />}
            </div>
            <div>
              <p className="font-black text-slate-900 text-lg leading-tight tracking-tight">{event.title}</p>
              <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">
                {event.date} • {event.time}
              </p>
            </div>
          </div>
        </td>

        <td className="px-8 py-7">
          <ParticipantManager 
            eventId={eventId} 
            eventTitle={event.title} 
            totalParticipants={event.participantCount || 0}
          />
        </td>

        <td className="px-8 py-7">
          <span className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border ${
            event.status?.toLowerCase() === 'active' || event.status?.toLowerCase() === 'published'
              ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
              : 'bg-slate-50 text-slate-400 border-slate-100'
          }`}>
            {event.status || "Draft"}
          </span>
        </td>

        <td className="px-8 py-7 text-right">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-xl h-10 w-10 text-slate-400 hover:text-slate-900">
                {isDeleting ? <Loader2 size={18} className="animate-spin" /> : <MoreVertical size={18} />}
              </Button>
            </DropdownMenuTrigger>
            
            <DropdownMenuContent align="end" className="rounded-[1.5rem] p-2 w-52 shadow-2xl border-none">
              <DropdownMenuItem 
                onSelect={(e) => {
                   e.preventDefault();
                   setIsEditModalOpen(true);
                }}
                className="rounded-xl gap-3 font-black text-[11px] uppercase tracking-wider py-4 px-4 cursor-pointer text-slate-700"
              >
                <Edit size={16} className="text-indigo-500" /> Update Event
              </DropdownMenuItem>
              
              <DropdownMenuItem 
                onClick={() => confirm("Delete this event?") && deleteEvent(eventId)}
                className="rounded-xl gap-3 font-black text-[11px] uppercase tracking-wider py-4 px-4 text-rose-600 cursor-pointer"
              >
                <Trash2 size={16} /> Delete Event
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </td>
      </tr>

      <EditEventModal 
        event={event} 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)} 
      />
    </>
  );
}
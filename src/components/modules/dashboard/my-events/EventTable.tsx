"use client";

import React from "react";
import { Globe, Lock, Edit, Trash2, Calendar, Clock, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import ParticipantManager from "./ParticipantManager";
import EditEventModal from "./EditEventModal";
import { useEventTableActions } from "../../../../hooks/use-event-table";

export default function EventTable({ events }: { events: any }) {
  const {
    isEditModalOpen,
    selectedEvent,
    isDeleting,
    deleteEvent,
    handleEditClick,
    closeEditModal
  } = useEventTableActions();

  const eventList = Array.isArray(events) 
    ? events 
    : (events?.data || events?.events || []);

  if (!eventList || eventList.length === 0) {
    return (
      <div className="text-center p-20 bg-white rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/50 animate-in fade-in zoom-in duration-500">
        <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-200">
          <Globe size={48} />
        </div>
        <h3 className="text-2xl font-black text-slate-900">No events found</h3>
        <p className="text-slate-400 font-bold mt-2 italic max-w-xs mx-auto">
          Your hosting journey starts here. Launch your first experience today!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6">
      {eventList.map((event: any) => {
        const eventId = event.id || event._id;
        const isPaid = event.fee > 0;
        const isPublic = event.isPublic === true;

        return (
          <div 
            key={eventId} 
            className="bg-white p-6 md:p-8 rounded-[3rem] border border-slate-100 flex flex-col lg:flex-row items-center justify-between group hover:border-indigo-200 hover:shadow-2xl hover:shadow-indigo-500/5 transition-all duration-500"
          >
            <div className="flex flex-col md:flex-row items-center gap-6 w-full lg:w-auto text-center md:text-left">
              <div className={`w-20 h-20 rounded-[1.8rem] flex items-center justify-center shrink-0 shadow-inner transition-transform group-hover:scale-105 duration-500 ${
                isPublic ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
              }`}>
                {isPublic ? <Globe size={32} /> : <Lock size={32} />}
              </div>
              
              <div className="space-y-2">
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                  <h4 className="font-black text-slate-900 text-xl tracking-tight leading-tight">{event.title}</h4>
                  <span className={`text-[10px] px-3 py-1 rounded-xl font-black uppercase tracking-widest border shadow-sm ${
                    isPaid ? 'border-indigo-100 bg-indigo-50 text-indigo-600' : 'border-slate-100 bg-slate-50 text-slate-400'
                  }`}>
                    {isPaid ? `Paid ($${event.fee})` : 'Free'}
                  </span>
                </div>
                
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs font-bold text-slate-400 uppercase tracking-wider italic">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={14} className="text-indigo-400" /> 
                    {event.date ? new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Date TBD'}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock size={14} className="text-indigo-400" /> 
                    {event.time || 'Time TBD'}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-5 w-full lg:w-auto mt-8 lg:mt-0 pt-6 lg:pt-0 border-t lg:border-t-0 border-slate-50 justify-between md:justify-end">
              <ParticipantManager 
                eventId={eventId} 
                eventTitle={event.title} 
                totalParticipants={event.participantCount || 0}
              />

              <div className="flex items-center gap-3">
                <Button 
                  onClick={() => handleEditClick(event)}
                  variant="ghost" 
                  className="h-14 w-14 rounded-2xl bg-slate-50 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 hover:border-indigo-100 border border-transparent transition-all"
                >
                  <Edit size={20} />
                </Button>
                
                <Button 
                  onClick={() => {
                    if(confirm(`Are you sure you want to delete "${event.title}"?`)) {
                      deleteEvent(eventId);
                    }
                  }}
                  disabled={isDeleting}
                  variant="ghost" 
                  className="h-14 w-14 rounded-2xl bg-slate-50 text-slate-400 hover:text-rose-600 hover:bg-rose-50 hover:border-rose-100 border border-transparent transition-all"
                >
                  {isDeleting ? <Loader2 className="animate-spin" size={20} /> : <Trash2 size={20} />}
                </Button>
              </div>
            </div>
          </div>
        );
      })}

      {selectedEvent && (
        <EditEventModal 
          event={selectedEvent} 
          isOpen={isEditModalOpen} 
          onClose={closeEditModal} 
        />
      )}
    </div>
  );
}
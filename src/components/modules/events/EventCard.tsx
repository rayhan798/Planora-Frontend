"use client";

import React from "react";
import Link from "next/link";
import { Calendar, User, Ticket, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Event } from "@/types/event.types";
import { useEventCard } from "../../../hooks/use-event-card";

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  const { numericFee, typeString, formattedDate } = useEventCard(event);

  return (
    <div className="group bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden hover:shadow-[0_30px_60px_rgba(0,0,0,0.06)] hover:-translate-y-2 transition-all duration-500">
      <div className="relative h-52 overflow-hidden bg-slate-100">
        <img
          src={event.image || "https://via.placeholder.com/800x400?text=Event+Image"}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://via.placeholder.com/800x400?text=No+Image";
          }}
        />

        <div className="absolute top-4 left-4">
          <span className="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-900 shadow-sm border border-white/50">
            {typeString}
          </span>
        </div>
      </div>

      <div className="p-8">
        <h3 className="text-xl font-black text-slate-900 mb-4 line-clamp-1 group-hover:text-indigo-600 transition-colors">
          {event.title}
        </h3>

        <div className="space-y-3 mb-8 text-slate-500">
          <div className="flex items-center gap-3">
            <Calendar size={16} className="text-indigo-500" />
            <span className="text-sm font-bold">{formattedDate}</span>
          </div>

          <div className="flex items-center gap-3">
            <User size={16} className="text-indigo-500" />
            <span className="text-sm font-semibold">
              {event.creator?.name || "Organizer"}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Ticket size={16} className="text-indigo-500" />
            <span className="text-sm font-black text-slate-900">
              {numericFee === 0 ? (
                <span className="text-emerald-600">FREE</span>
              ) : (
                `$${numericFee}`
              )}
            </span>
          </div>
        </div>

        <Link href={`/events/${event.id}`}>
          <Button className="w-full h-14 bg-slate-50 hover:bg-indigo-600 hover:text-white text-slate-900 rounded-[1.25rem] font-black transition-all flex items-center justify-center gap-2 border-none">
            View Details
            <ArrowRight size={18} />
          </Button>
        </Link>
      </div>
    </div>
  );
}
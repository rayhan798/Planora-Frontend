"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, User, ShieldCheck, Clock } from "lucide-react";
import Link from "next/link";
import EventActionButtons from "./EventActionButtons";
import EventOwnerControls from "./EventOwnerControls";
import EventReviews from "./EventReviews";
import { useEventDetails } from "../../../hooks/use-event-details";

export default function EventDetailsClient({ id }: { id: string }) {
  const {
    event,
    isOwner,
    isLoggedIn,
    currentUserId,
    typeString,
    fee,
    isLoading,
    error
  } = useEventDetails(id);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-40 min-h-screen bg-white">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600 mb-4" />
        <p className="text-slate-500 animate-pulse">
          Synchronizing authentication...
        </p>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="text-center py-40">
        <h2 className="text-2xl font-black">Event not found!</h2>
        <Link
          href="/events"
          className="text-indigo-600 font-bold hover:underline"
        >
          Go back
        </Link>
      </div>
    );
  }

  return (
    <div className="pb-20 bg-slate-50/30">
      <div className="relative h-[400px] w-full overflow-hidden">
        <motion.img
          src={event.image}
          className="w-full h-full object-cover"
          alt={event.title}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 -mt-32 relative z-10">
        <div className="bg-white rounded-[3rem] p-10 shadow-2xl border border-slate-100">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="flex-grow space-y-8">
              <div>
                <h1 className="text-4xl font-black text-slate-900">
                  {event.title}
                </h1>
                <span className="text-indigo-600 font-bold text-sm uppercase tracking-widest">
                  {typeString}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoItem
                  icon={<Calendar />}
                  label="Date"
                  value={event.date ? new Date(event.date).toDateString() : "TBA"}
                />
                <InfoItem
                  icon={<Clock />}
                  label="Time"
                  value={event.time || "TBA"}
                />
                <InfoItem
                  icon={<MapPin />}
                  label="Venue"
                  value={event.venue || "TBA"}
                />
                <InfoItem
                  icon={<User />}
                  label="Organizer"
                  value={event.creator?.name || "Organizer"}
                />
              </div>

              <p className="text-slate-600 leading-relaxed">
                {event.description}
              </p>
              <EventReviews eventId={String(event.id)} />
            </div>

            <div className="w-full lg:w-[380px]">
              <div className="sticky top-10 space-y-6">
                {isOwner ? (
                  <EventOwnerControls eventData={event} />
                ) : (
                  <EventActionButtons
                    key={isLoggedIn ? `auth-${currentUserId}` : "guest"}
                    event={event}
                    type={typeString}
                    fee={fee}
                  />
                )}

                <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <ShieldCheck className="text-emerald-500" />
                  <p className="text-xs font-bold text-slate-500">
                    Secure System & Verified Users
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-100">
      <div className="text-indigo-600">{icon}</div>
      <div>
        <p className="text-[10px] text-slate-400 font-black uppercase">
          {label}
        </p>
        <p className="font-bold text-slate-900">{value}</p>
      </div>
    </div>
  );
}
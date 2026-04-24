"use client";

import { Edit, Trash2, UserCheck, Ban, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEventControls } from "../../../hooks/use-event-controls";

interface EventOwnerControlsProps {
  eventData: {
    id: number | string;
    title: string;
    creatorId: number | string;
  };
}

export default function EventOwnerControls({ eventData }: EventOwnerControlsProps) {
  const {
    eventId,
    handleViewRequests,
    handleDelete,
    handleEdit,
    handleAnalytics,
  } = useEventControls({ id: eventData?.id });

  return (
    <div className="space-y-6 p-8 bg-slate-950 rounded-[2.5rem] text-white">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">
            Control Panel
          </p>
          <h4 className="text-lg font-bold text-indigo-400">Organizer Tools</h4>
        </div>
      </div>

      <div className="flex gap-3">
        <Button
          onClick={handleEdit}
          className="flex-1 h-12 bg-white/10 hover:bg-white/20 border-white/5 rounded-2xl gap-2"
        >
          <Edit size={16} /> Edit
        </Button>

        <Button
          onClick={handleDelete}
          variant="destructive"
          className="flex-1 h-12 rounded-2xl gap-2 bg-rose-500/10 hover:bg-rose-500 text-rose-500 hover:text-white border-rose-500/20"
        >
          <Trash2 size={16} /> Delete
        </Button>
      </div>

      <div className="pt-6 border-t border-white/10 space-y-3">
        <Button
          onClick={handleViewRequests}
          className="w-full h-14 bg-indigo-600 hover:bg-indigo-500 rounded-2xl gap-3 font-bold shadow-lg shadow-indigo-500/20"
        >
          <UserCheck size={18} /> Approve Requests
        </Button>

        <Button
          onClick={handleAnalytics}
          className="w-full h-14 bg-white/5 hover:bg-white/10 rounded-2xl gap-3 font-bold border border-white/5"
        >
          <BarChart3 size={18} /> Analytics
        </Button>

        <Button
          variant="ghost"
          className="w-full h-14 rounded-2xl gap-3 font-bold text-slate-400 hover:text-rose-400 hover:bg-rose-400/10"
        >
          <Ban size={18} /> Ban Users
        </Button>
      </div>

      <div className="mt-4 flex items-center justify-between text-[10px] text-slate-500 font-mono bg-white/5 p-3 rounded-xl border border-white/5">
        <span>EVENT REFERENCE</span>
        <span className="text-indigo-400 font-bold">ID: {eventId}</span>
      </div>
    </div>
  );
}
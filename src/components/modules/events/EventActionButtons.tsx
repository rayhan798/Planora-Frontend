"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { UserPlus, Send, Loader2 } from "lucide-react";
import { useEventActions } from "../../../hooks/use-event-actions";

interface EventActionButtonsProps {
  event: any;
  type: string;
  fee: number | string;
}

export default function EventActionButtons({
  event,
  type,
  fee,
}: EventActionButtonsProps) {
  const { onActionClick, isPending } = useEventActions(event);

  const parsedFee = Number(fee) || 0;
  const isPrivate = type?.toLowerCase().includes("private");

  return (
    <div className="w-full space-y-4">
      <div className="p-6 bg-white rounded-[2rem] border border-slate-100 shadow-sm mb-4">
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">
          Ticket Price
        </p>
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-black text-slate-900">
            {parsedFee === 0 ? "FREE" : `$${parsedFee}`}
          </span>
        </div>
      </div>

      <div className="space-y-3">
        <Button
          disabled={isPending}
          onClick={onActionClick}
          className="w-full h-16 rounded-[1.5rem] font-bold gap-3 bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-200 transition-all active:scale-95"
        >
          {isPending ? (
            <Loader2 className="animate-spin" />
          ) : isPrivate ? (
            <Send size={20} />
          ) : (
            <UserPlus size={20} />
          )}

          {isPrivate ? "Request Invitation" : "Join Event Now"}
        </Button>
      </div>
    </div>
  );
}
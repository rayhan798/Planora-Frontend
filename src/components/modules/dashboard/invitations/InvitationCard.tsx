"use client";

import React from "react";
import { Calendar, User, Ticket, Check, CreditCard, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useInvitationActions } from "../../../../hooks/use-invitation-card";

interface InvitationCardProps {
  invite: any;
  onPayClick: (invite: any) => void;
}

export default function InvitationCard({ invite, onPayClick }: InvitationCardProps) {
  const { respondToInvite, isPending } = useInvitationActions(invite.id);

  const event = invite?.event || {};
  const sender = invite?.sender || {};
  const fee = Number(event.fee || invite.fee || 0);
  const isPaid = fee > 0;

  const handleFreeAccept = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    respondToInvite("ACCEPTED");
  };

  const handleDecline = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    respondToInvite("DECLINED");
  };

  const handlePayClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onPayClick(invite);
  };

  return (
    <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl overflow-hidden group hover:-translate-y-2 transition-all duration-500">
      <div className="h-48 relative overflow-hidden bg-slate-100">
        <img 
          src={event.image || "/placeholder.jpg"} 
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
        <div className="absolute bottom-5 left-6">
          <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/20 backdrop-blur-md ${isPaid ? 'bg-indigo-600' : 'bg-emerald-500'} text-white`}>
            {isPaid ? 'Premium Event' : 'Free Entry'}
          </span>
        </div>
      </div>

      <div className="p-8 space-y-6">
        <div>
          <h3 className="text-xl font-black text-slate-900 line-clamp-2">{event.title || "Untitled Event"}</h3>
          <p className="text-slate-400 text-xs font-bold mt-2 flex items-center gap-1.5 uppercase">
            <User size={14} className="text-indigo-500" /> By: {sender.name || "Host"}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-slate-50 p-3 rounded-2xl flex items-center gap-2">
            <Calendar size={16} className="text-indigo-400" />
            <span className="text-[11px] font-black">{event.date ? new Date(event.date).toLocaleDateString() : "TBD"}</span>
          </div>
          <div className="bg-slate-50 p-3 rounded-2xl flex items-center gap-2">
            <Ticket size={16} className="text-indigo-500" />
            <span className="text-[11px] font-black">
              {isPaid ? `$${fee}.00` : 'FREE'}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {isPaid ? (
            <Button 
              type="button"
              onClick={handlePayClick}
              className="w-full h-14 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black gap-2 shadow-lg shadow-indigo-100 transition-all active:scale-95"
            >
              <CreditCard size={18} /> Pay & Accept (${fee})
            </Button>
          ) : (
            <Button 
              type="button"
              onClick={handleFreeAccept}
              disabled={isPending}
              className="w-full h-14 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-black gap-2 shadow-lg shadow-emerald-100 transition-all active:scale-95"
            >
              {isPending ? <Loader2 className="animate-spin" size={18} /> : <Check size={18} />}
              {isPending ? "Accepting..." : "Accept Free Entry"}
            </Button>
          )}
          
          <Button 
            type="button"
            onClick={handleDecline}
            disabled={isPending}
            variant="ghost" 
            className="w-full h-12 text-slate-400 hover:text-rose-500 font-bold transition-colors"
          >
            Decline Invitation
          </Button>
        </div>
      </div>
    </div>
  );
}
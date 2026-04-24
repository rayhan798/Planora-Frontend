"use client";

import React from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogDescription // এটি যোগ করা হয়েছে ওয়ার্নিং ফিক্স করতে
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Users, CheckCircle2, XCircle, User, Loader2, UserMinus } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getPendingParticipants, updateParticipantStatus } from "@/app/(public)/events/_actions";

interface ParticipantManagerProps {
  eventId: string;
  eventTitle: string;
  totalParticipants?: number;
}

export default function ParticipantManager({ eventId, eventTitle, totalParticipants = 0 }: ParticipantManagerProps) {
  const queryClient = useQueryClient();

  // ১. পেন্ডিং পার্টিসিপেন্ট ফেচ করা
  const { data: pendingRequests, isLoading } = useQuery({
    queryKey: ["pending-participants", eventId],
    queryFn: () => getPendingParticipants(eventId),
    enabled: !!eventId,
  });

  // ২. Approve/Reject মিউটেশন
  const { mutate: handleStatusUpdate, isPending: isUpdating } = useMutation({
    mutationFn: async ({ userId, status }: { userId: string | number, status: 'APPROVED' | 'REJECTED' }) => {
      const res = await updateParticipantStatus(eventId, userId.toString(), status);
      if (!res.success) throw new Error(res.message);
      return res;
    },
    onSuccess: (_, variables) => {
      // ক্যাশ ইনভ্যালিডেট করে ডাটা রিফ্রেশ করা
      queryClient.invalidateQueries({ queryKey: ["pending-participants", eventId] });
      queryClient.invalidateQueries({ queryKey: ["events"] }); 
      
      const msg = variables.status === 'APPROVED' ? "Guest Approved!" : "Request Rejected";
      toast.success(msg);
    },
    onError: (error: any) => {
      toast.error(error.message || "Something went wrong");
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="rounded-xl font-black gap-2 text-indigo-600 hover:bg-indigo-50 px-4 transition-all active:scale-95">
          <Users size={16} /> Manage
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-xl bg-white rounded-[3rem] border-none p-8 md:p-10 shadow-2xl">
        <DialogHeader className="mb-6">
          <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mb-4">
            <Users size={28} />
          </div>
          <DialogTitle className="text-3xl font-black text-slate-900 leading-tight">
            Manage <span className="text-indigo-600">Requests</span>
          </DialogTitle>
          
          {/* ✅ Accessibility fix: DialogDescription যোগ করা হয়েছে (স্ক্রিনে দেখা যাবে না) */}
          <DialogDescription className="sr-only">
            View and manage participant requests for {eventTitle}
          </DialogDescription>

          <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.2em] mt-1 line-clamp-1">
            {eventTitle}
          </p>
        </DialogHeader>

        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-3 custom-scrollbar">
          {isLoading ? (
            <div className="py-20 flex flex-col items-center justify-center gap-3">
              <Loader2 className="animate-spin text-indigo-500" size={32} />
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Searching for guests...</p>
            </div>
          ) : !pendingRequests || pendingRequests.length === 0 ? (
            <div className="py-16 text-center bg-slate-50/50 rounded-[2.5rem] border-2 border-dashed border-slate-100">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                <UserMinus className="text-slate-300" size={28} />
              </div>
              <p className="text-sm font-bold text-slate-500">No pending requests found</p>
              <p className="text-[10px] text-slate-400 font-medium uppercase mt-1">Check back later</p>
            </div>
          ) : (
            pendingRequests.map((request: any) => (
              <div 
                key={request.id} 
                className="p-5 bg-white rounded-[2rem] border border-slate-100 flex items-center justify-between group hover:border-indigo-100 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-500 transition-colors overflow-hidden">
                    {request.user?.image ? (
                        <img src={request.user.image} alt="User" className="w-full h-full object-cover" />
                    ) : (
                        <User size={24} />
                    )}
                  </div>
                  <div>
                    <p className="font-black text-slate-800 leading-none">{request.user?.name || "Unknown User"}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight mt-1">{request.user?.email}</p>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    disabled={isUpdating}
                    onClick={() => handleStatusUpdate({ userId: request.userId, status: 'APPROVED' })}
                    size="icon" 
                    className="w-11 h-11 bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white rounded-2xl transition-all border border-emerald-100 shadow-sm active:scale-90"
                  >
                    {isUpdating ? <Loader2 className="animate-spin" size={18} /> : <CheckCircle2 size={20} />}
                  </Button>
                  <Button 
                    disabled={isUpdating}
                    onClick={() => handleStatusUpdate({ userId: request.userId, status: 'REJECTED' })}
                    size="icon" 
                    className="w-11 h-11 bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white rounded-2xl transition-all border border-rose-100 shadow-sm active:scale-90"
                  >
                    <XCircle size={20} />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="mt-8 pt-6 border-t border-slate-100 flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest leading-none">Accepted Members</span>
            <span className="text-2xl font-black text-slate-900 mt-1">{totalParticipants}</span>
          </div>
          <Button variant="link" className="text-indigo-600 font-black uppercase text-[11px] tracking-widest hover:no-underline hover:text-slate-900 transition-colors">
            View All Members
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
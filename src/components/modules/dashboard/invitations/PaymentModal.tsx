"use client";

import React from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CreditCard, ShieldCheck, ArrowRight, Loader2, Info } from "lucide-react";
import { usePayment } from "../../../../hooks/use-payment";

export default function PaymentModal({ isOpen, onClose, event: invite }: any) {
  const eventData = invite?.event || {};
  const eventId = invite?.eventId || eventData?.id; 
  
  const registrationFee = Number(eventData?.fee || 0);
  const serviceFee = 2; // Extra $2 logic
  const totalAmount = registrationFee + serviceFee;

  const { handlePayment, isProcessing } = usePayment(eventId);

  if (!invite) return null;

  const onPaymentClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    handlePayment();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="max-w-md bg-white rounded-[2.5rem] p-10 border-none shadow-2xl"
        onOpenAutoFocus={(e) => e.preventDefault()} 
      >
        <DialogHeader className="items-center text-center">
          <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-[2rem] flex items-center justify-center mb-6">
            <CreditCard size={36} />
          </div>
          
          <DialogTitle className="text-2xl font-black text-slate-900 leading-tight">
            Confirm Payment
          </DialogTitle>

          <DialogDescription className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mt-2 px-4">
            Workshop: {eventData.title || "Registration Fee"}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-8 space-y-6">
          {/* Detailed Price Breakdown */}
          <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-slate-500 font-bold text-xs uppercase tracking-wider">Registration Fee</span>
              <span className="text-slate-700 font-black">${registrationFee.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1.5">
                <span className="text-slate-500 font-bold text-xs uppercase tracking-wider">Service Fee</span>
                <Info size={12} className="text-indigo-400 cursor-help" />
              </div>
              <span className="text-slate-700 font-black">${serviceFee.toFixed(2)}</span>
            </div>

            <div className="pt-3 border-t border-slate-200 flex justify-between items-center">
              <span className="text-indigo-900 font-black uppercase text-xs tracking-wider">Total Payable</span>
              <span className="text-2xl text-indigo-600 font-black">
                ${totalAmount.toFixed(2)}
              </span>
            </div>
          </div>

          <Button 
            type="button" 
            disabled={isProcessing}
            onClick={onPaymentClick}
            className="w-full h-16 bg-slate-900 hover:bg-black text-white rounded-2xl font-black text-lg shadow-xl relative z-[50] cursor-pointer pointer-events-auto transition-all active:scale-95"
          >
            {isProcessing ? (
              <Loader2 className="animate-spin" size={24} />
            ) : (
              <span className="flex items-center gap-3">Pay Now <ArrowRight size={20} /></span>
            )}
          </Button>

          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center justify-center gap-2 text-emerald-500 font-black text-[10px] uppercase tracking-[0.2em]">
              <ShieldCheck size={16} /> Secure Stripe Gateway
            </div>
            <p className="text-[9px] text-slate-400 font-medium text-center leading-relaxed">
              * The $2 service fee covers secure transaction processing and platform maintenance.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
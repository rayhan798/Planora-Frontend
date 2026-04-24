"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Check, ArrowRight, Home, CalendarCheck } from "lucide-react";
import { motion } from "framer-motion";

const PaymentSuccessPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (!sessionId) {
      router.push("/");
    }
  }, [sessionId, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-lg w-full bg-white p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-50 text-center relative overflow-hidden"
      >
        {/* Background Accent */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-400 to-teal-500" />

        <div className="flex justify-center mb-8">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
            className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center relative"
          >
            <div className="absolute inset-0 rounded-full bg-emerald-100 animate-ping opacity-20" />
            <Check className="text-emerald-500 w-12 h-12 stroke-[3px]" />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-4">
            Payment Confirmed!
          </h1>
          <p className="text-slate-500 font-medium leading-relaxed mb-10 max-w-[320px] mx-auto">
            Your transaction was successful. Your spot has been secured and a confirmation email is on its way.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 gap-4">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/events"
              className="flex items-center justify-center gap-2 w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-indigo-600 transition-all shadow-xl shadow-indigo-100"
            >
              <CalendarCheck size={18} />
              View My Events
              <ArrowRight size={16} className="ml-1 opacity-50" />
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/"
              className="flex items-center justify-center gap-2 w-full py-4 bg-slate-50 text-slate-600 rounded-2xl font-bold hover:bg-slate-100 transition-all"
            >
              <Home size={18} />
              Back to Home
            </Link>
          </motion.div>
        </div>

        <p className="mt-8 text-xs font-bold text-slate-300 uppercase tracking-[0.2em]">
          Transaction ID: {sessionId?.slice(0, 12)}...
        </p>
      </motion.div>
    </div>
  );
};

export default PaymentSuccessPage;
"use client";

import React from "react";
import Link from "next/link";
import { PlusCircle, Search, Sparkles } from "lucide-react";

export default function CTA() {
  const isLoggedIn = true; 

  return (
    <section className="py-12 px-4 bg-white"> 
      <div className="max-w-7xl mx-auto bg-indigo-600 rounded-[3rem] p-8 md:p-14 text-center relative overflow-hidden shadow-[0_40px_100px_-15px_rgba(79,70,229,0.3)]">
        
        {/* --- Decorative Background Elements --- */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-[80px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-indigo-400/30 rounded-full translate-x-1/2 translate-y-1/2 blur-[60px] pointer-events-none" />
        
        <div className="relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-indigo-500/30 text-indigo-100 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6 border border-white/10">
            <Sparkles size={14} className="text-yellow-300" />
            Get Started Today
          </div>

          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-[1.1] italic tracking-tighter">
            Ready to Bring <span className="text-indigo-200">People Together?</span>
          </h2>
          
          <p className="text-indigo-100 text-lg md:text-xl mb-10 max-w-3xl mx-auto font-medium opacity-90 leading-relaxed">
            Whether it's a small meetup or a massive tech conference, 
            <span className="font-bold text-white"> Planora</span> gives you the tools to manage it like a pro.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            {/* Create Event Button */}
            <Link 
              href={isLoggedIn ? "/dashboard/my-events" : "/login"} 
              className="w-full sm:w-auto"
            >
              <button className="w-full flex items-center justify-center gap-3 bg-white text-indigo-600 px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-indigo-50 transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-indigo-900/20 group">
                <PlusCircle size={20} className="transition-transform group-hover:rotate-90" />
                Create Event
              </button>
            </Link>
            
            {/* Join/Explore Button */}
            <Link href="/events" className="w-full sm:w-auto">
              <button className="w-full flex items-center justify-center gap-3 bg-indigo-500/40 text-white border-2 border-indigo-400/30 px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-indigo-500/60 transition-all backdrop-blur-sm">
                <Search size={20} />
                Explore events
              </button>
            </Link>
          </div>

          {/* Bottom Trust Text */}
          <p className="mt-8 text-indigo-300/60 text-[10px] font-bold uppercase tracking-widest">
            No credit card required • Unlimited event hosting
          </p>
        </div>
      </div>
    </section>
  );
}
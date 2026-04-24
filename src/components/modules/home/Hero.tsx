"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image"; 
import { motion } from "framer-motion";

export default function Hero() {
  const [imgSrc, setImgSrc] = useState("https://images.unsplash.com/photo-1540575861501-7ad05823c95b?auto=format&fit=crop&q=80&w=1600");

  return (
    <section className="relative py-20 bg-gradient-to-r from-indigo-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">

        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="order-2 md:order-1"
        >
          <span className="bg-indigo-100 text-indigo-700 px-4 py-1.5 rounded-full text-[10px] font-black tracking-[0.2em] uppercase shadow-sm">
            Featured Event
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 mt-6 leading-[1.1] tracking-tighter italic">
            International <br />
            <span className="text-indigo-600 not-italic">Tech Summit</span> 2026
          </h1>
          <p className="text-lg text-slate-500 mt-6 font-medium leading-relaxed max-w-lg">
            Join the biggest tech gathering of the year on <span className="text-indigo-600 font-bold">Planora</span>. Connect with industry leaders and innovators.
          </p>
          
          <div className="mt-10 flex flex-wrap items-center gap-8">
            <div className="flex flex-col border-l-4 border-indigo-600 pl-4">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Date</span>
              <span className="text-slate-900 font-black italic text-lg uppercase">Oct 24, 2026</span>
            </div>
            
            <Link href="/events">
              <button className="group relative px-10 py-4 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-indigo-200 hover:bg-indigo-700 transition-all cursor-pointer active:scale-95 overflow-hidden">
                <span className="relative z-10">Join Event Now</span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </button>
            </Link>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="order-1 md:order-2 relative h-[450px] w-full bg-slate-200 rounded-[3rem] overflow-hidden shadow-[0_30px_60px_-15px_rgba(79,70,229,0.3)] border-[12px] border-white group"
        >
          <Image 
            src={imgSrc} 
            alt="Planora Event" 
            fill
            priority 
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            onError={() => setImgSrc("https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=1600")}
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/60 via-transparent to-transparent pointer-events-none" />
          
          <div className="absolute top-6 right-6 bg-rose-500 text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest animate-pulse shadow-lg z-10">
            Live Event
          </div>

          <div className="absolute bottom-8 left-8 right-8 bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20 shadow-2xl z-10">
              <div className="flex justify-between items-center">
                <div>
                   <p className="text-[10px] font-black text-indigo-200 uppercase tracking-tighter">Event Location</p>
                   <p className="text-sm font-bold text-white mt-1 uppercase">Grand Center, NY</p>
                </div>
                <div className="flex flex-col items-end">
                   <p className="text-xs font-black text-white italic tracking-tighter">PLANORA</p>
                </div>
              </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
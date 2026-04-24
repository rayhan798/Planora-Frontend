"use client";

import React from "react";
import { motion } from "framer-motion";
import { Users, Target, Rocket, Award, CheckCircle2 } from "lucide-react";
import CountUp from "react-countup";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const stats = [
  { 
    label: "Events Organized", 
    value: 10, 
    suffix: "K+", 
    icon: Rocket, 
    color: "text-blue-600" 
  },
  { 
    label: "Happy Users", 
    value: 50, 
    suffix: "K+", 
    icon: Users, 
    color: "text-emerald-600" 
  },
  { 
    label: "Cities Reached", 
    value: 120, 
    suffix: "+", 
    icon: Target, 
    color: "text-purple-600" 
  },
  { 
    label: "Awards Won", 
    value: 15, 
    suffix: "+", 
    icon: Award, 
    color: "text-orange-600" 
  },
];

const values = [
  {
    title: "Innovation First",
    description: "We constantly push the boundaries of event management technology.",
  },
  {
    title: "Community Driven",
    description: "Built for people, by people who understand the power of gathering.",
  },
  {
    title: "Seamless Experience",
    description: "We believe technology should be invisible and work flawlessly.",
  },
];

export default function AboutUs() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="bg-white min-h-screen font-sans">
      {/* --- Hero Section --- */}
      <section className="relative py-24 overflow-hidden bg-slate-50">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-indigo-600/5 blur-[120px] rounded-full -translate-y-1/2" />
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div {...fadeIn} className="text-center max-w-3xl mx-auto">
            <Badge variant="outline" className="mb-4 px-4 py-1 border-indigo-200 text-indigo-600 font-black uppercase tracking-[0.2em] text-[10px]">
              Our Story
            </Badge>
            <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 italic tracking-tighter leading-tight">
              We Make Every <span className="text-indigo-600 underline decoration-indigo-200">Moment</span> Count
            </h1>
            <p className="text-lg text-gray-600 font-medium leading-relaxed">
              Planora was born out of a simple idea: that organizing events should be as joyful as attending them. 
              Today, we help thousands of creators bring their visions to life.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- Stats Section (CountUp Integrated) --- */}
      <section className="py-20 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center group"
            >
              <div className={`mx-auto w-14 h-14 flex items-center justify-center rounded-2xl bg-white shadow-lg mb-4 transition-transform group-hover:rotate-12 ${stat.color}`}>
                <stat.icon size={26} />
              </div>
              <h3 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tighter italic">
                <CountUp 
                  end={stat.value} 
                  duration={2.5} 
                  suffix={stat.suffix} 
                  enableScrollSpy={true} 
                  scrollSpyOnce={true} 
                />
              </h3>
              <p className="text-[10px] md:text-xs text-gray-500 font-black uppercase tracking-[0.2em] mt-2">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- Mission & Vision --- */}
      <section className="py-24 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 italic tracking-tighter">
              A Platform Built for the <span className="text-indigo-600">Future of Connection.</span>
            </h2>
            <p className="text-gray-600 font-medium text-lg leading-relaxed">
              In a world where digital noise is everywhere, physical and focused digital gatherings are more important than ever. 
              Planora provides the infrastructure for meaningful interaction.
            </p>
            <ul className="space-y-4">
              {["Secure Ticketing System", "Advanced Attendee Management", "Seamless Communication Tools"].map((item, i) => (
                <li key={i} className="flex items-center gap-3 font-bold text-gray-700">
                  <CheckCircle2 className="text-indigo-500" size={20} />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <div className="grid gap-6">
            {values.map((val, i) => (
              <Card key={i} className="border-2 border-slate-50 hover:border-indigo-100 transition-colors shadow-none rounded-[2rem] overflow-hidden">
                <CardContent className="p-8">
                  <h4 className="text-xl font-black text-gray-900 mb-2 italic tracking-tight">{val.title}</h4>
                  <p className="text-gray-500 font-medium leading-relaxed">{val.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* --- Final CTA --- */}
      <section className="py-24 text-center max-w-5xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-indigo-600 rounded-[3rem] p-10 md:p-16 relative overflow-hidden shadow-2xl shadow-indigo-200"
        >
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none" />
          <h2 className="text-3xl md:text-5xl font-black text-white italic tracking-tighter mb-6 relative z-10">
            Be Part of Our Journey
          </h2>
          <p className="text-indigo-100 font-medium mb-10 text-lg relative z-10 max-w-2xl mx-auto opacity-90">
            We are always looking for passionate people and amazing event creators. 
            Join us and help shape the future of events.
          </p>
          <div className="relative z-10 flex flex-wrap justify-center gap-4">
            <button className="bg-white text-indigo-600 px-10 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-50 transition-all hover:scale-105 active:scale-95 shadow-xl">
              Join the Team
            </button>
            <button className="bg-indigo-500/40 text-white border-2 border-indigo-400/30 px-10 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-500/60 transition-all backdrop-blur-sm">
              Contact Us
            </button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
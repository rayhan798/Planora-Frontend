"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  Lock, 
  Eye, 
  Database, 
  Cookie, 
  Mail, 
  FileText,
  Clock,
  CalendarDays,
  Ticket
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function PrivacyPolicy() {
  const lastUpdated = "April 11, 2026";

  const sections = [
    {
      id: "event-collection",
      icon: CalendarDays,
      title: "Event & Personal Information",
      content: "When you organize or register for an event, we collect information such as names, email addresses, and event preferences. For organizers, we also store event details, location data, and schedule information to facilitate the planning process."
    },
    {
      id: "ticket-processing",
      icon: Ticket,
      title: "Ticketing & Payments",
      content: "Planora collects transaction data when tickets are purchased. While we don't store full credit card details (handled by secure partners like Stripe or SSLCommerz), we maintain records of successful registrations to manage event entries and refunds."
    },
    {
      id: "usage",
      icon: Eye,
      title: "Event Management Usage",
      content: "Data is used to generate attendee lists, send event reminders via email, and provide organizers with analytics on event performance. We ensure that organizers only see the data necessary to manage their specific event."
    },
    {
      id: "security",
      icon: Lock,
      title: "Data Security & Encryption",
      content: "We use high-level SSL encryption for all data transfers. Your event database is isolated and protected with industry-standard protocols to prevent unauthorized access to attendee or organizer details."
    },
    {
      id: "rights",
      icon: ShieldCheck,
      title: "User Control & Privacy",
      content: "Attendees can request to be removed from an event mailing list at any time. Organizers have the right to export or delete their event data, ensuring full control over the information they bring to the Planora platform."
    }
  ];

  return (
    <div className="bg-white min-h-screen pb-20 font-sans">
      {/* --- Header Section --- */}
      <section className="bg-slate-50 py-24 border-b border-slate-100 relative overflow-hidden">
        {/* Abstract Background Blobs */}
        <div className="absolute top-0 left-0 w-80 h-80 bg-indigo-600/5 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-indigo-400/5 blur-[120px] rounded-full translate-x-1/2 translate-y-1/2" />
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="outline" className="mb-6 border-indigo-200 text-indigo-600 font-black uppercase tracking-[0.25em] text-[10px] px-5 py-1.5 rounded-full">
              Safe & Secure Events
            </Badge>
            <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 italic tracking-tighter leading-tight">
              Privacy <span className="text-indigo-600">Policy</span>
            </h1>
            <div className="flex items-center justify-center gap-2 text-gray-500 font-bold text-xs uppercase tracking-[0.15em] opacity-80">
              <Clock size={14} className="text-indigo-500" />
              Effective Date: {lastUpdated}
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- Content Section --- */}
      <section className="max-w-4xl mx-auto px-4 mt-20">
        <div className="grid gap-14">
          
          {/* Introduction */}
          <div className="prose prose-slate max-w-none">
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 italic tracking-tight mb-5 flex items-center gap-3">
              <FileText className="text-indigo-600" size={28} />
              Platform Commitment
            </h2>
            <p className="text-gray-600 font-medium leading-relaxed text-lg">
              At <span className="font-bold text-indigo-600">Planora</span>, we believe great events start with trust. 
              This policy explains how we collect, use, and protect data specifically related to 
              <span className="text-gray-900 font-bold"> event organization, ticketing, and attendee management.</span> 
              Your privacy is built into every feature we develop.
            </p>
          </div>

          <Separator className="bg-slate-100" />

          {/* Event-Specific Accordion Sections */}
          <div>
            <Accordion type="single" collapsible className="w-full space-y-5">
              {sections.map((section) => (
                <AccordionItem 
                  value={section.id} 
                  key={section.id}
                  className="border-2 border-slate-50 rounded-[2rem] px-6 md:px-8 transition-all hover:border-indigo-100 data-[state=open]:border-indigo-200 data-[state=open]:shadow-xl data-[state=open]:shadow-indigo-500/5 data-[state=open]:bg-white"
                >
                  <AccordionTrigger className="hover:no-underline py-7">
                    <div className="flex items-center gap-5 text-left">
                      <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 border border-indigo-100 shrink-0">
                        <section.icon size={22} />
                      </div>
                      <span className="text-xl font-black text-gray-900 italic tracking-tight">
                        {section.title}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-8 text-gray-600 font-medium leading-relaxed text-lg pl-0 md:pl-[68px]">
                    <div className="max-w-2xl">
                       {section.content}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Support CTA */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-indigo-600 rounded-[3rem] p-10 md:p-16 text-center relative overflow-hidden shadow-[0_30px_60px_-15px_rgba(79,70,229,0.3)]"
          >
             <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-[80px]" />
             <div className="absolute bottom-0 left-0 w-40 h-40 bg-indigo-400/20 rounded-full blur-[80px]" />
             
             <h3 className="text-3xl md:text-4xl font-black text-white italic tracking-tighter mb-5 relative z-10">
               Privacy Concerns?
             </h3>
             <p className="text-indigo-100 mb-10 font-medium text-lg relative z-10 opacity-90">
               Our legal and support teams are here to clarify how we handle your event data.
             </p>
             <a href="mailto:privacy@planora.com" className="relative z-10 inline-block">
               <button className="bg-white text-indigo-600 px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-indigo-50 transition-all hover:scale-105 active:scale-95 shadow-2xl flex items-center gap-3">
                 <Mail size={18} />
                 Contact Privacy Team
               </button>
             </a>
          </motion.div>

        </div>
      </section>
    </div>
  );
}
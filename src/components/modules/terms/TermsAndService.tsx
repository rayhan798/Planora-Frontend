"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Gavel, 
  UserCheck, 
  AlertTriangle, 
  Ban, 
  Scale, 
  Mail,
  ScrollText,
  ShieldAlert
} from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function TermsOfService() {
  const lastUpdated = "April 11, 2026";

  const terms = [
    {
      value: "accounts",
      icon: UserCheck,
      title: "User Accounts",
      content: "To use Planora, you must create an account. You are responsible for maintaining the confidentiality of your login credentials and for all activities that occur under your account. You must be at least 18 years old to organize events or 13 years old (with parental consent) to attend events."
    },
    {
      value: "events",
      icon: ScrollText,
      title: "Event Guidelines",
      content: "Organizers are solely responsible for the content, accuracy, and legality of the events they create. Planora reserves the right to remove any event that promotes illegal activities, hate speech, or violates our community standards without prior notice."
    },
    {
      value: "payments",
      icon: Scale,
      title: "Payments & Fees",
      content: "Planora may charge service fees for ticket sales. All fees are non-refundable unless specified otherwise by the event organizer's specific refund policy. We use secure third-party processors and do not store sensitive financial data directly on our servers."
    },
    {
      value: "prohibited",
      icon: Ban,
      title: "Prohibited Conduct",
      content: "Users agree not to: (a) reverse engineer the platform, (b) use automated systems to scrape data, (c) upload malicious code, or (d) harass other users or organizers. Violation of these terms will lead to immediate account suspension."
    },
    {
      value: "liability",
      icon: AlertTriangle,
      title: "Limit of Liability",
      content: "Planora is a platform provider and is not responsible for any cancellations, injuries, or losses incurred during physical or virtual events organized through our service. Attendance and organization are at your own risk."
    }
  ];

  return (
    <div className="bg-white min-h-screen pb-20 font-sans">
      {/* --- Header Section --- */}
      <section className="bg-slate-950 py-24 relative overflow-hidden text-white">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/20 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Badge className="mb-6 bg-indigo-500 hover:bg-indigo-600 text-white border-none font-black uppercase tracking-[0.25em] text-[10px] px-5 py-1.5">
              Platform Rules
            </Badge>
            <h1 className="text-4xl md:text-6xl font-black mb-6 italic tracking-tighter leading-tight">
              Terms of <span className="text-indigo-400">Service</span>
            </h1>
            <p className="text-slate-400 font-bold text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2">
              <Gavel size={14} className="text-indigo-400" />
              Effective Date: {lastUpdated}
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- Main Content Section --- */}
      <section className="max-w-5xl mx-auto px-4 mt-20">
        <Tabs defaultValue="accounts" className="w-full">
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Sidebar-style Tab List */}
            <div className="lg:w-1/3">
              <div className="sticky top-24">
                <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6 px-4">Navigation</h3>
                <TabsList className="flex flex-col h-auto bg-transparent gap-2 w-full p-0">
                  {terms.map((term) => (
                    <TabsTrigger
                      key={term.value}
                      value={term.value}
                      className="w-full justify-start gap-4 px-6 py-4 rounded-2xl border-2 border-transparent data-[state=active]:border-indigo-100 data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-600 transition-all text-slate-600 font-bold italic tracking-tight text-lg"
                    >
                      <term.icon size={20} />
                      {term.title}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
            </div>

            {/* Content Display */}
            <div className="lg:w-2/3">
              {terms.map((term) => (
                <TabsContent 
                  key={term.value} 
                  value={term.value} 
                  className="mt-0 focus-visible:ring-0"
                >
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-slate-50 border-2 border-slate-100 rounded-[2.5rem] p-8 md:p-12"
                  >
                    <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-indigo-600 mb-8 border border-slate-200">
                      <term.icon size={32} />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-black text-slate-900 italic tracking-tighter mb-6">
                      {term.title}
                    </h2>
                    <Separator className="mb-8 bg-slate-200" />
                    <div className="prose prose-slate max-w-none">
                      <p className="text-slate-600 text-lg leading-relaxed font-medium">
                        {term.content}
                      </p>
                    </div>
                    
                    <div className="mt-12 flex items-start gap-4 p-5 bg-indigo-50/50 rounded-2xl border border-indigo-100/50">
                      <ShieldAlert className="text-indigo-500 shrink-0 mt-1" size={20} />
                      <p className="text-xs text-indigo-700 font-bold leading-normal">
                        Important: By using Planora, you acknowledge that you have read and agree to these terms. Failure to comply may result in temporary or permanent ban from the platform.
                      </p>
                    </div>
                  </motion.div>
                </TabsContent>
              ))}
            </div>
          </div>
        </Tabs>

        {/* --- Final Agreement CTA --- */}
        <section className="mt-24 text-center">
          <div className="bg-slate-900 rounded-[3rem] p-10 md:p-16 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent opacity-50" />
            <h3 className="text-3xl md:text-5xl font-black text-white italic tracking-tighter mb-6 relative z-10">
              Questions about these <span className="text-indigo-400 text-6xl">Terms?</span>
            </h3>
            <p className="text-slate-400 font-medium mb-10 text-lg relative z-10 max-w-xl mx-auto">
              If you need clarification on any part of our Terms of Service, don't hesitate to reach out.
            </p>
            <div className="flex flex-wrap justify-center gap-4 relative z-10">
              <a href="mailto:legal@planora.com">
                <button className="bg-indigo-600 text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-indigo-700 transition-all hover:scale-105 active:scale-95 shadow-xl flex items-center gap-3">
                  <Mail size={18} />
                  Contact Legal
                </button>
              </a>
            </div>
            
          </div>
        </section>
      </section>
    </div>
  );
}
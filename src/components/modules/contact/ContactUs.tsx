"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useContact } from "../../../hooks/use-contact";

export default function ContactUs() {
  const { register, handleSubmit, errors, isSubmitting } = useContact();

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      details: "support@planora.com",
      subText: "Online support 24/7",
      color: "text-blue-600",
      bg: "bg-blue-50"
    },
    {
      icon: Phone,
      title: "Call Us",
      details: "+880 1234-567890",
      subText: "Mon - Fri, 9am - 6pm",
      color: "text-emerald-600",
      bg: "bg-emerald-50"
    },
    {
      icon: MapPin,
      title: "Office",
      details: "GEC Circle, Chattogram",
      subText: "Bangladesh",
      color: "text-purple-600",
      bg: "bg-purple-50"
    }
  ];

  return (
    <div className="bg-white min-h-screen pb-20 font-sans">
      <section className="relative py-24 bg-slate-900 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 pointer-events-none" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-600/20 blur-[120px] rounded-full" />
        
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Badge className="mb-6 bg-indigo-500 hover:bg-indigo-600 text-white border-none font-black uppercase tracking-[0.3em] text-[10px] px-6 py-2 rounded-full">
              Get In Touch
            </Badge>
            <h1 className="text-4xl md:text-7xl font-black text-white mb-6 italic tracking-tighter leading-tight">
              Let's Start a <span className="text-indigo-400">Conversation</span>
            </h1>
            <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
              Have a question about organizing an event or need technical support? 
              Our team is here to help you make your next event a success.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 -mt-16 relative z-20">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-[2.5rem] border-2 border-slate-50 shadow-xl shadow-slate-200/50 group hover:border-indigo-100 transition-all"
              >
                <div className={`w-14 h-14 ${info.bg} ${info.color} rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:rotate-12`}>
                  <info.icon size={28} />
                </div>
                <h3 className="text-xl font-black text-slate-900 italic tracking-tight mb-2">{info.title}</h3>
                <p className="text-lg font-bold text-slate-700 mb-1">{info.details}</p>
                <p className="text-sm text-slate-400 font-medium">{info.subText}</p>
              </motion.div>
            ))}
          </div>

          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white p-8 md:p-16 rounded-[3rem] border-2 border-slate-50 shadow-2xl shadow-slate-200/60"
            >
              <div className="mb-12">
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 italic tracking-tighter mb-4">
                  Send us a Message
                </h2>
                <p className="text-slate-500 font-medium">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Full Name</label>
                    <Input 
                      {...register("name")}
                      placeholder="Abbas Uddin" 
                      className={`h-14 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-indigo-500 transition-all px-6 font-bold ${errors.name ? "border-red-500" : ""}`} 
                    />
                    {errors.name && <p className="text-red-500 text-[10px] font-bold ml-1">{errors.name.message}</p>}
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Email Address</label>
                    <Input 
                      {...register("email")}
                      type="email" 
                      placeholder="abbas@example.com" 
                      className={`h-14 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-indigo-500 transition-all px-6 font-bold ${errors.email ? "border-red-500" : ""}`} 
                    />
                    {errors.email && <p className="text-red-500 text-[10px] font-bold ml-1">{errors.email.message}</p>}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Subject</label>
                  <Input 
                    {...register("subject")}
                    placeholder="Event Partnership" 
                    className={`h-14 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-indigo-500 transition-all px-6 font-bold ${errors.subject ? "border-red-500" : ""}`} 
                  />
                  {errors.subject && <p className="text-red-500 text-[10px] font-bold ml-1">{errors.subject.message}</p>}
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Your Message</label>
                  <Textarea 
                    {...register("message")}
                    placeholder="How can we help you?" 
                    className={`min-h-[180px] rounded-[2rem] border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-indigo-500 transition-all p-6 font-bold resize-none ${errors.message ? "border-red-500" : ""}`} 
                  />
                  {errors.message && <p className="text-red-500 text-[10px] font-bold ml-1">{errors.message.message}</p>}
                </div>

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-indigo-600 disabled:bg-indigo-400 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:bg-indigo-700 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-2xl shadow-indigo-200 flex items-center justify-center gap-3"
                >
                  {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="mt-20 text-center">
        <p className="text-slate-400 font-bold text-sm">
          Already have an account? <span className="text-indigo-600 underline cursor-pointer hover:text-indigo-700">Check our Support Dashboard</span>
        </p>
      </section>
    </div>
  );
}
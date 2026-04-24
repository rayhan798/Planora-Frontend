"use client";

import React from "react";
import { Calendar, User, ArrowRight, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { usePublicEvents } from "../../../hooks/use-public-events-slider";

export default function EventSlider() {
  const { events, isLoading, isError } = usePublicEvents();

  return (
    <section className="py-24 bg-[#f8fafc] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full relative"
        >
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="space-y-2">
              <Badge variant="outline" className="text-indigo-600 border-indigo-200 bg-indigo-50/50 px-4 py-1 rounded-full uppercase tracking-widest text-[10px] font-bold">
                Discover
              </Badge>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                Upcoming Public <span className="text-indigo-600">Events</span>
              </h2>
              <p className="text-slate-500 text-lg max-w-md leading-relaxed font-medium">
                Explore world-class events curated just for your professional growth.
              </p>
            </div>

            <div className="flex gap-3 relative">
              <CarouselPrevious className="static translate-y-0 h-12 w-12 rounded-2xl border-slate-200 hover:bg-white hover:text-indigo-600 hover:border-indigo-600 transition-all duration-300 shadow-sm" />
              <CarouselNext className="static translate-y-0 h-12 w-12 rounded-2xl bg-slate-900 text-white hover:bg-indigo-600 border-none transition-all duration-300 shadow-lg shadow-indigo-100" />
            </div>
          </div>

          <CarouselContent className="-ml-4">
            {isLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <CarouselItem key={i} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="h-[380px] w-full bg-slate-200 animate-pulse rounded-[2.5rem]" />
                </CarouselItem>
              ))
            ) : isError || !events || events.length === 0 ? (
              <div className="w-full py-20 text-center text-slate-400 font-bold italic">
                No upcoming events found at the moment.
              </div>
            ) : (
              events.map((ev: any) => (
                <CarouselItem key={ev.id || ev._id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="group h-full bg-white border border-slate-100 rounded-[2.5rem] p-2 hover:border-indigo-100 transition-all duration-500 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)]">
                    <div className="bg-slate-50 rounded-[2rem] p-6 h-full flex flex-col justify-between transition-colors group-hover:bg-white">
                      <div>
                        <div className="flex justify-between items-start mb-8">
                          <div className="p-3 bg-white rounded-2xl shadow-sm group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                            <Calendar className="w-5 h-5" />
                          </div>
                          <Badge 
                            className={`px-4 py-1.5 rounded-xl font-black text-[10px] uppercase tracking-tighter border-none shadow-sm ${
                              Number(ev.fee) === 0 
                              ? "bg-emerald-500 text-white" 
                              : "bg-indigo-600 text-white"
                            }`}
                          >
                            {Number(ev.fee) === 0 ? "Free" : `Paid • $${ev.fee}`}
                          </Badge>
                        </div>

                        <h3 className="text-xl font-black text-slate-800 mb-4 leading-tight group-hover:text-indigo-600 transition-colors h-14 line-clamp-2 italic tracking-tighter">
                          {ev.title}
                        </h3>

                        <div className="space-y-3 mb-8">
                          <div className="flex items-center gap-3 text-slate-500">
                            <MapPin size={16} className="text-slate-400" />
                            <span className="text-sm font-bold uppercase tracking-tight line-clamp-1">
                              {ev.venue || ev.location || "Online"}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 text-slate-500">
                            <User size={16} className="text-slate-400" />
                            <span className="text-sm font-bold">
                              {ev.creator?.name || ev.user?.name || "Organizer"}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                           {ev.date ? new Date(ev.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : "TBA"}
                        </span>
                        <Link href={`/events/${ev.id || ev._id}`}>
                          <Button variant="ghost" size="sm" className="group/btn text-indigo-600 font-black hover:bg-indigo-50 rounded-xl px-4 uppercase text-[10px] tracking-widest">
                            Details 
                            <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))
            )}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
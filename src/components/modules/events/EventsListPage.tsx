"use client";

import React from "react";
import { Search, Inbox } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import EventCard from "./EventCard";
import { useEventsFilter } from "../../../hooks/use-events-list";

const filterOptions = [
  "All",
  "Public Free",
  "Public Paid",
  "Private Free",
  "Private Paid",
];

export default function EventsListPage() {
  const {
    searchQuery,
    setSearchQuery,
    activeFilter,
    setActiveFilter,
    filteredEvents,
    isLoading,
  } = useEventsFilter();

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      <div className="bg-white border-b border-slate-200 pt-12 pb-8 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-black text-slate-900 mb-6">
            Explore <span className="text-indigo-600">Events</span>
          </h1>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <Input
                placeholder="Search events..."
                className="pl-12 h-14 bg-slate-50 rounded-2xl"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex gap-2 overflow-x-auto">
              {filterOptions.map((filter) => (
                <Button
                  key={filter}
                  variant="ghost"
                  onClick={() => setActiveFilter(filter)}
                  className={`h-14 px-6 rounded-2xl font-bold border ${
                    activeFilter === filter
                      ? "bg-slate-900 text-white"
                      : "bg-white"
                  }`}
                >
                  {filter}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-12">
        {isLoading ? (
          <div className="text-center py-24">Loading events...</div>
        ) : filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event: any) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-slate-500">
            <Inbox className="mb-3" />
            No events found
          </div>
        )}
      </div>
    </div>
  );
}
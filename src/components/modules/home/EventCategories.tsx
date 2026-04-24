"use client";

import React from "react";
import { useEventCategories } from "../../../hooks/use-event-categories";

export default function EventCategories() {
  const { handleFilter, categories } = useEventCategories();

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-indigo-50 text-indigo-600 border-none px-4 py-1">
            Categories
          </Badge>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
            Explore by <span className="text-indigo-600">Event Types</span>
          </h2>
          <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
            Find the perfect event that fits your needs. Whether it's a public gathering or an exclusive private session.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleFilter(cat.params)}
              className={`group relative p-8 rounded-[2.5rem] border-2 ${cat.borderColor} ${cat.bgColor} text-left transition-all hover:shadow-2xl hover:-translate-y-2 cursor-pointer overflow-hidden`}
            >
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/40 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
              
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-white shadow-sm transition-transform group-hover:rotate-12 ${cat.color}`}>
                <cat.icon size={28} />
              </div>

              <h3 className="text-xl font-black text-gray-900 mb-2 italic tracking-tight">
                {cat.label}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed font-medium">
                {cat.description}
              </p>

              <div className={`mt-6 inline-flex items-center text-[10px] font-black uppercase tracking-widest ${cat.color}`}>
                Browse Events
                <svg
                  className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`inline-block rounded-full text-[10px] font-black uppercase tracking-[0.2em] ${className}`}>
      {children}
    </span>
  );
}
"use client";

import React from "react";
import { Star, Edit3, Trash2, Calendar, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useReviewActions } from "../../../../hooks/use-review-card";

export default function ReviewCard({ review }: { review: any }) {
  const { handleEdit, handleDelete } = useReviewActions(review);

  return (
    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/30 flex flex-col md:flex-row justify-between items-start gap-6 group hover:border-indigo-100 transition-all">
      <div className="space-y-4 flex-1">
        <div className="flex items-center gap-2">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              size={18} 
              className={`${i < review.rating ? "text-amber-500 fill-amber-500" : "text-slate-200"}`} 
            />
          ))}
          <span className="text-xs font-black text-slate-400 uppercase tracking-widest ml-2 flex items-center gap-1">
            <Calendar size={12} /> {review.date}
          </span>
        </div>

        <div>
          <h3 className="text-xl font-black text-slate-900 tracking-tight">{review.eventTitle}</h3>
          <p className="text-slate-500 font-medium mt-2 leading-relaxed italic">
            "{review.comment}"
          </p>
        </div>
      </div>

      <div className="flex gap-2 self-end md:self-start">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-12 w-12 rounded-2xl bg-slate-50 text-slate-400 hover:text-indigo-600">
              <MoreHorizontal size={20} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="rounded-2xl p-2 w-40 border-none shadow-2xl">
            <DropdownMenuItem 
              onClick={handleEdit}
              className="rounded-xl gap-3 font-bold py-3 cursor-pointer"
            >
              <Edit3 size={16} className="text-indigo-600" /> Edit Review
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={handleDelete}
              className="rounded-xl gap-3 font-bold py-3 text-rose-600 focus:bg-rose-500 focus:text-white cursor-pointer"
            >
              <Trash2 size={16} /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
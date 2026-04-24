"use client";

import React from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useEventReviews } from "../../../hooks/use-event-reviews";

interface EventReviewsProps {
  eventId: string;
}

export default function EventReviews({ eventId }: EventReviewsProps) {
  const {
    rating,
    setRating,
    hover,
    setHover,
    comment,
    setComment,
    reviews,
    isLoading,
    isPending,
    handleSubmit,
  } = useEventReviews(eventId);

  return (
    <div className="mt-16 space-y-10">
      <div className="flex items-center justify-between">
        <h3 className="text-3xl font-black text-slate-900">
          Experience & <span className="text-indigo-600">Feedback</span>
        </h3>
      </div>

      <div className="bg-white p-8 rounded-[2.5rem] border-2 border-slate-50">
        <p className="font-bold mb-4">How was your experience?</p>

        <div className="flex gap-2 mb-6">
          {[1, 2, 3, 4, 5].map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setRating(s)}
              onMouseEnter={() => setHover(s)}
              onMouseLeave={() => setHover(0)}
            >
              <Star
                size={30}
                className={`${
                  (hover || rating) >= s
                    ? "fill-amber-400 text-amber-400"
                    : "text-slate-200"
                }`}
              />
            </button>
          ))}
        </div>

        <Textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your review..."
          className="min-h-[120px]"
        />

        <div className="flex justify-end mt-4">
          <Button
            onClick={handleSubmit}
            disabled={isPending}
            className="bg-indigo-600 text-white rounded-2xl"
          >
            {isPending ? "Posting..." : "Post Review"}
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        {isLoading ? (
          <p className="text-slate-500">Loading reviews...</p>
        ) : reviews.length === 0 ? (
          <p className="text-slate-400">No reviews yet</p>
        ) : (
          reviews.map((review: any) => (
            <div
              key={review.id}
              className="bg-white p-6 rounded-2xl border border-slate-100"
            >
              <div className="flex items-center justify-between mb-2">
                <p className="font-bold text-slate-800">
                  {review.user?.name || "Anonymous"}
                </p>

                <div className="flex">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      size={18}
                      className={`${
                        review.rating >= s
                          ? "fill-amber-400 text-amber-400"
                          : "text-slate-200"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <p className="text-slate-600 text-sm">{review.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
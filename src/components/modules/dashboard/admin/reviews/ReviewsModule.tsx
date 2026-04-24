// src/components/modules/dashboard/reviews/ReviewsModule.tsx
"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getReviews,
  deleteReviewAction,
  updateReviewAction,
} from "@/app/(public)/events/_actions";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { Edit, Trash2, Star, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const ReviewsModule = ({ eventId }: { eventId?: string }) => {
  const queryClient = useQueryClient();
  const [selectedReview, setSelectedReview] = useState<any>(null);

  // 1. DATA FETCH
 const { data: reviewsData } = useQuery({
     queryKey: ["reviews"],
     queryFn: async () => await getReviews("all"),
   });


  const reviews = Array.isArray(reviewsData)
    ? reviewsData
    : Array.isArray(reviewsData?.data)
    ? reviewsData.data
    : Array.isArray(reviewsData?.reviews)
    ? reviewsData.reviews
    : [];

  // 2. DELETE
  const deleteMutation = useMutation({
    mutationFn: deleteReviewAction,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["reviews", String(eventId)],
      });
      toast.success("Review deleted successfully");
    },
    onError: () => toast.error("Failed to delete review"),
  });

  // 3. UPDATE
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) =>
      updateReviewAction(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["reviews", String(eventId)], 
      });
      toast.success("Review updated!");
      setSelectedReview(null);
    },

    onError: () => toast.error("Failed to update"),
  });

 

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <Table>
        <TableHeader className="bg-slate-50/50">
          <TableRow>
            <TableHead>Event Detail</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Comment</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {reviews.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-20">
                <MessageSquare className="w-10 h-10 mx-auto mb-3 opacity-20" />
                <p>No reviews found</p>
              </TableCell>
            </TableRow>
          ) : (
            reviews.map((review: any) => (
              <TableRow key={review.id}>
                <TableCell>
                  <p className="font-semibold">
                    {review.event?.title || "No Event"}
                  </p>
                  <p className="text-xs text-slate-500">
                    {review.event?.date
                      ? new Date(review.event.date).toDateString()
                      : ""}
                  </p>
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-1">
                    {review.rating}
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  </div>
                </TableCell>

                <TableCell className="max-w-[200px] truncate">
                  {review.comment}
                </TableCell>

                <TableCell className="text-right space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSelectedReview(review)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteMutation.mutate(review.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {/* EDIT MODAL */}
      <Dialog
        open={!!selectedReview}
        onOpenChange={() => setSelectedReview(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Review</DialogTitle>
          </DialogHeader>

          <form
            onSubmit={(e) => {
              e.preventDefault();

              updateMutation.mutate({
                id: selectedReview.id,
                data: {
                  rating: Number(selectedReview.rating),
                  comment: selectedReview.comment,
                },
              });
            }}
            className="space-y-4 pt-4"
          >
            <Input
              type="number"
              min="1"
              max="5"
              value={selectedReview?.rating || ""}
              onChange={(e) =>
                setSelectedReview({
                  ...selectedReview,
                  rating: e.target.value,
                })
              }
            />

            <Textarea
              value={selectedReview?.comment || ""}
              onChange={(e) =>
                setSelectedReview({
                  ...selectedReview,
                  comment: e.target.value,
                })
              }
            />

            <Button type="submit" className="w-full">
              Save Changes
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReviewsModule;
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import {
  getReviews,
  deleteReviewAction,
  updateReviewAction,
} from "@/app/(public)/events/_actions";

export const useReviews = (eventId?: string) => {
  const queryClient = useQueryClient();
  const [selectedReview, setSelectedReview] = useState<any>(null);

  const { data: reviewsData, isLoading } = useQuery({
    queryKey: ["reviews", String(eventId)],
    queryFn: () => getReviews(eventId),
  });

  const reviews = Array.isArray(reviewsData)
    ? reviewsData
    : Array.isArray(reviewsData?.data)
    ? reviewsData.data
    : Array.isArray(reviewsData?.reviews)
    ? reviewsData.reviews
    : [];

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

  return {
    reviews,
    isLoading,
    selectedReview,
    setSelectedReview,
    deleteMutation,
    updateMutation,
  };
};
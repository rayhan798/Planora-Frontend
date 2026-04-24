import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { httpClient } from "@/lib/axios/httpClient";
import { getReviews } from "@/app/(public)/events/_actions";

export const useEventReviews = (eventId: string) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const queryClient = useQueryClient();

  const { data: reviewsData, isLoading } = useQuery({
    queryKey: ["reviews", eventId],
    queryFn: () => getReviews(eventId),
  });

  const reviews = Array.isArray(reviewsData)
    ? reviewsData
    : reviewsData?.data ?? reviewsData?.reviews ?? [];

  const mutation = useMutation({
    mutationFn: async () => {
      const res = await httpClient.post("/reviews", {
        eventId: Number(eventId),
        rating,
        comment,
      });
      return res.data;
    },
    onSuccess: () => {
      setRating(0);
      setComment("");
      queryClient.invalidateQueries({
        queryKey: ["reviews", String(eventId)],
      });
    },
    onError: (err: any) => {
      alert(err?.response?.data?.message || "Failed to submit review");
    },
  });

  const handleSubmit = () => {
    if (!rating) return alert("Please select rating");
    if (!comment.trim()) return alert("Write a comment");
    mutation.mutate();
  };

  return {
    rating,
    setRating,
    hover,
    setHover,
    comment,
    setComment,
    reviews,
    isLoading,
    isPending: mutation.isPending,
    handleSubmit,
  };
};
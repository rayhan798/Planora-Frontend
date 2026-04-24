import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateEvent } from "@/app/(public)/events/_actions";

export const useEditEvent = (event: any, isOpen: boolean, onClose: () => void) => {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    description: "",
    fee: "0",
    privacy: "public",
  });

  useEffect(() => {
    if (isOpen && event) {
      setFormData({
        title: event.title || "",
        date: event.date ? event.date.split('T')[0] : "",
        time: event.time || "",
        location: event.venue || event.location || "",
        description: event.description || "",
        fee: String(event.fee || "0"),
        privacy: event.isPublic === false ? "private" : "public",
      });
    }
  }, [isOpen, event]);

  const { mutate: handleUpdate, isPending } = useMutation({
    mutationFn: async () => {
      const eventId = event.id || event._id;
      const res = await updateEvent(eventId, formData);
      if (!res.success) throw new Error(res.message || "Update failed");
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      toast.success("Experience updated successfully!");
      onClose();
    },
    onError: (error: any) => {
      toast.error(error.message || "Something went wrong");
    },
  });

  return {
    formData,
    setFormData,
    handleUpdate,
    isPending,
  };
};
import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createEvent as createEventAction } from "@/app/(public)/events/_actions";

export const eventSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "A valid date is required",
  }),
  time: z.string().min(1, "Time is required"),
  venue: z.string().min(3, "Venue/Location is required"),
  isPublic: z.boolean(),
  fee: z.string().min(1, "Fee is required"),
  description: z.string().min(20, "Description should be more detailed"),
});

export type EventFormValues = z.infer<typeof eventSchema>;

export const useCreateEvent = (onSuccessCallback: () => void) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      isPublic: true,
      fee: "0",
      title: "",
      date: "",
      time: "",
      venue: "",
      description: ""
    }
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size must be less than 5MB");
        return;
      }
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const { mutate: handleCreateEvent, isPending } = useMutation({
    mutationFn: async (data: EventFormValues) => {
      const formData = new FormData();
      if (imageFile) formData.append("image", imageFile);
      
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("date", data.date);
      formData.append("time", data.time);
      formData.append("venue", data.venue);
      formData.append("fee", data.fee);
      formData.append("isPublic", String(data.isPublic));

      const res = await createEventAction(formData);
      if (!res.success) throw new Error(res.message || "Something went wrong");
      return res;
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      toast.success(res.message || "Event launched successfully!");
      form.reset();
      removeImage();
      onSuccessCallback();
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to create event");
    }
  });

  return {
    form,
    previewUrl,
    fileInputRef,
    isPending,
    handleImageChange,
    removeImage,
    handleCreateEvent
  };
};
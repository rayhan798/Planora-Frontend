import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteEventAction } from "@/app/(public)/events/_actions";

export const useEventTableActions = () => {
  const queryClient = useQueryClient();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  const { mutate: deleteEvent, isPending: isDeleting } = useMutation({
    mutationFn: async (id: string) => {
      const res = await deleteEventAction(id);
      if (!res?.success) throw new Error(res?.message || "Server error occurred");
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      toast.success("Event deleted successfully");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to delete event");
    }
  });

  const handleEditClick = (event: any) => {
    setSelectedEvent(event);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedEvent(null);
  };

  return {
    isEditModalOpen,
    selectedEvent,
    isDeleting,
    deleteEvent,
    handleEditClick,
    closeEditModal
  };
};
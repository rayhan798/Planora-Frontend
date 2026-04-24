import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteEventAction } from "@/app/(public)/events/_actions";

export const useEventActions = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteEvent, isPending: isDeleting } = useMutation({
    mutationFn: async (id: string) => {
      const res = await deleteEventAction(id);
      if (!res?.success) throw new Error(res?.message || "Delete failed");
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      toast.success("Event deleted successfully");
    },
    onError: (error: any) => toast.error(error.message),
  });

  return {
    deleteEvent,
    isDeleting,
  };
};
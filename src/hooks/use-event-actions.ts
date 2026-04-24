import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { sendInvitationAction } from "@/app/(public)/events/_actions";

export const useEventActions = (event: any) => {
  const { mutate: handleInvite, isPending } = useMutation({
    mutationFn: async () => {
      const res = await sendInvitationAction({
        eventId: Number(event.id),
        receiverId: Number(event.creatorId),
      });

      if (!res.success) {
        throw new Error(res.message || "Action failed");
      }
      return res;
    },
    onSuccess: () => {
      toast.success("Invitation request sent successfully!");
    },
    onError: (err: any) => {
      toast.error(err.message || "Please login first!");
    },
  });

  const onActionClick = (e: React.MouseEvent) => {
    e.preventDefault();
    handleInvite();
  };

  return {
    onActionClick,
    isPending,
  };
};
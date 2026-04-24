import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { respondToInvitationAction } from "@/app/(public)/events/_actions";

export const useInvitationActions = (inviteId: string) => {
  const queryClient = useQueryClient();

  const { mutate: respondToInvite, isPending } = useMutation({
    mutationFn: async (status: "ACCEPTED" | "DECLINED") => {
      const res = await respondToInvitationAction(inviteId, status);
      if (!res.success) throw new Error(res.message || "Failed to respond");
      return res;
    },
    onSuccess: (_, status) => {
      queryClient.invalidateQueries({ queryKey: ["invitations"] });
      toast.success(status === "ACCEPTED" ? "Invitation Accepted!" : "Invitation Declined");
    },
    onError: (err: any) => {
      toast.error(err.message || "Something went wrong!");
    }
  });

  return {
    respondToInvite,
    isPending
  };
};
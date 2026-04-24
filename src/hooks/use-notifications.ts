import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getNotification, updateNotificationAction } from "@/app/(public)/events/_actions";

interface NotificationSettings {
  data?: {
    emailEnabled: boolean;
    pushEnabled: boolean;
    smsEnabled: boolean;
  };
}

export const useNotifications = () => {
  const queryClient = useQueryClient();
  const NOTIFICATION_KEY = ['notification'];

  const { data: settingsData, isLoading } = useQuery<NotificationSettings>({
    queryKey: NOTIFICATION_KEY,

    queryFn: async () => (await getNotification()) as any,
  });

  const mutation = useMutation({

    mutationFn: async (variables: { type: string; enabled: boolean }) => 
      (await updateNotificationAction(variables)) as any,
    
    onMutate: async (newSetting: { type: string; enabled: boolean }) => {
      await queryClient.cancelQueries({ queryKey: NOTIFICATION_KEY });
      const previousSettings = queryClient.getQueryData<NotificationSettings>(NOTIFICATION_KEY);

      queryClient.setQueryData<NotificationSettings>(NOTIFICATION_KEY, (old) => {
        if (!old) return old;
        const fieldMap: Record<string, keyof NonNullable<NotificationSettings['data']>> = {
          email: "emailEnabled",
          push: "pushEnabled",
          sms: "smsEnabled",
        };
        const fieldName = fieldMap[newSetting.type];
        return {
          ...old,
          data: { ...old.data!, [fieldName]: newSetting.enabled },
        };
      });
      return { previousSettings };
    },
    onError: (err, newSetting, context) => {
      if (context?.previousSettings) {
        queryClient.setQueryData(NOTIFICATION_KEY, context.previousSettings);
      }
      toast.error("Preference update failed! Please try again.");
    },
    onSuccess: (res: any) => {
      if (res.success) {
        toast.success(res.message || "Preference updated successfully!");
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: NOTIFICATION_KEY });
    },
  });

  return { settingsData, isLoading, mutation };
};
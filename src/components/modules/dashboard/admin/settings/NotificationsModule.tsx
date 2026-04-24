"use client";

import React from 'react';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getNotification, updateNotificationAction } from "@/app/(public)/events/_actions";
import { Bell, Mail, Smartphone, ShieldCheck, Info, Loader2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";


interface NotificationSettings {
  emailEnabled: boolean;
  pushEnabled: boolean;
  smsEnabled: boolean;
}

interface ApiResponse {
  success: boolean;
  data: NotificationSettings;
  message?: string;
}

const NotificationsModule = () => {
  const queryClient = useQueryClient();
  const NOTIFICATION_KEY = ['notification'];

 
  const { data: settingsData, isLoading } = useQuery<ApiResponse>({
    queryKey: NOTIFICATION_KEY,
    queryFn: getNotification,
    staleTime: 1000 * 60 * 5, 
  });

  const mutation = useMutation({
    mutationFn: updateNotificationAction,
    onMutate: async (newSetting: { type: string; enabled: boolean }) => {

      await queryClient.cancelQueries({ queryKey: NOTIFICATION_KEY });

      
      const previousSettings = queryClient.getQueryData<ApiResponse>(NOTIFICATION_KEY);

      
      queryClient.setQueryData(NOTIFICATION_KEY, (old: ApiResponse | undefined) => {
        if (!old) return old;
        
        const fieldMap: Record<string, keyof NotificationSettings> = {
          email: "emailEnabled",
          push: "pushEnabled",
          sms: "smsEnabled",
        };
        const fieldName = fieldMap[newSetting.type];

        return {
          ...old,
          data: {
            ...old.data,
            [fieldName]: newSetting.enabled,
          },
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
      if (res?.success) {
        toast.success(res.message || "Setting saved successfully.");
      }
    },
    onSettled: () => {
      
      queryClient.invalidateQueries({ queryKey: NOTIFICATION_KEY });
    },
  });

  const handleToggle = (type: string, enabled: boolean) => {
    mutation.mutate({ type, enabled });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Loader2 className="animate-spin text-indigo-600" size={40} />
      </div>
    );
  }


  const notificationOptions = [
    { 
      id: 'email', 
      title: 'Email Notifications', 
      desc: 'Event invites, approval status, and receipts.', 
      icon: Mail, 
      color: 'bg-blue-500', 
      enabled: settingsData?.data?.emailEnabled ?? false 
    },
    { 
      id: 'push', 
      title: 'Push Notifications', 
      desc: 'Real-time alerts for browser and device.', 
      icon: Bell, 
      color: 'bg-purple-500', 
      enabled: settingsData?.data?.pushEnabled ?? false 
    },
    { 
      id: 'sms', 
      title: 'SMS Alerts', 
      desc: 'Critical updates and emergency changes.', 
      icon: Smartphone, 
      color: 'bg-emerald-500', 
      enabled: settingsData?.data?.smsEnabled ?? false 
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Notification Settings
        </h1>
        <p className="text-slate-500 font-medium text-sm md:text-base">
          Manage how Planora keeps you updated about your event activities.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      
        <div className="md:col-span-1 space-y-4">
          <div className="p-5 bg-indigo-50/50 border border-indigo-100 rounded-[2rem]">
            <ShieldCheck className="text-indigo-600 mb-3" size={28} />
            <h3 className="font-bold text-indigo-900 text-sm">Privacy Guaranteed</h3>
            <p className="text-[11px] text-indigo-700/80 mt-1 leading-relaxed font-semibold">
              We only send essential updates. You can toggle off non-critical alerts anytime.
            </p>
          </div>
          <div className="p-5 bg-amber-50/50 border border-amber-100 rounded-[2rem]">
            <Info className="text-amber-600 mb-3" size={28} />
            <h3 className="font-bold text-amber-900 text-sm">System Alerts</h3>
            <p className="text-[11px] text-amber-700/80 mt-1 leading-relaxed font-semibold">
              Security alerts and payment receipts cannot be disabled for your protection.
            </p>
          </div>
        </div>

   
        <div className="md:col-span-2 space-y-4">
          {notificationOptions.map((item) => (
            <Card key={item.id} className="group border-none shadow-sm hover:shadow-md transition-all duration-300 rounded-[2rem] p-6 bg-white border border-slate-100">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-5">
                  <div className={`shrink-0 w-12 h-12 rounded-2xl ${item.color} bg-opacity-10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}>
                    <item.icon size={22} className={item.color.replace('bg-', 'text-')} />
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="font-bold text-slate-900 text-sm md:text-base">{item.title}</h4>
                    <p className="text-xs text-slate-500 max-w-[200px] md:max-w-[300px] leading-snug font-medium">
                      {item.desc}
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col items-end gap-2">
                  <div className="flex items-center gap-3">
                    {mutation.isPending && (mutation.variables as any)?.type === item.id && (
                      <Loader2 className="w-4 h-4 animate-spin text-indigo-500" />
                    )}
                    <Switch 
                      checked={item.enabled}
                      onCheckedChange={(checked) => handleToggle(item.id, checked)}
                      disabled={mutation.isPending}
                      className="data-[state=checked]:bg-indigo-600 transition-colors"
                    />
                  </div>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">
                    {item.id}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div className="pt-6 border-t border-slate-100 flex justify-end">
        <div className="text-xs font-bold text-slate-400 flex items-center gap-2">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          Settings are automatically saved
        </div>
      </div>
    </div>
  );
};

export default NotificationsModule;
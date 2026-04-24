"use client";

import React from 'react';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getNotification, updateNotificationAction } from "@/app/(public)/events/_actions";
import { Bell, Mail, Smartphone, ShieldCheck, Info, Loader2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

const NotificationsModule = () => {
  const queryClient = useQueryClient();
  const NOTIFICATION_KEY = ['notification'];

  // 1. Fetching Settings
  const { data: settingsData, isLoading } = useQuery({
    queryKey: NOTIFICATION_KEY,
    queryFn: getNotification,
  });

  const mutation = useMutation({
    mutationFn: updateNotificationAction,
    onMutate: async (newSetting) => {
      await queryClient.cancelQueries({ queryKey: NOTIFICATION_KEY });
      const previousSettings = queryClient.getQueryData(NOTIFICATION_KEY);

      queryClient.setQueryData(NOTIFICATION_KEY, (old: any) => {
        const fieldMap: Record<string, string> = {
          email: "emailEnabled",
          push: "pushEnabled",
          sms: "smsEnabled",
        };
        const fieldName = fieldMap[newSetting.type];
        
        return {
          ...old,
          data: {
            ...old?.data,
            [fieldName]: newSetting.enabled,
          },
        };
      });

      return { previousSettings };
    },
    onError: (err, newSetting, context) => {
      queryClient.setQueryData(NOTIFICATION_KEY, context?.previousSettings);
      toast.error("Preference update failed!");
    },
    onSuccess: (res: any) => {
      if (res.success) {
        toast.success(res.message || "Preference updated!");
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
      desc: 'Receive event invites, approval status, and payment receipts via email.', 
      icon: Mail, 
      color: 'bg-blue-500', 
      enabled: (settingsData?.data as any)?.emailEnabled ?? false 
    },
    { 
      id: 'push', 
      title: 'Push Notifications', 
      desc: 'Get real-time browser alerts when someone requests to join your event.', 
      icon: Bell, 
      color: 'bg-purple-500', 
      enabled: (settingsData?.data as any)?.pushEnabled ?? false 
    },
    { 
      id: 'sms', 
      title: 'SMS Alerts', 
      desc: 'Receive critical updates and emergency event changes directly to your phone.', 
      icon: Smartphone, 
      color: 'bg-emerald-500', 
      enabled: (settingsData?.data as any)?.smsEnabled ?? false 
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Notification Settings
        </h1>
        <p className="text-slate-500 font-medium">
          Manage how Planora keeps you updated about your event activities.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-4">
          <div className="p-5 bg-indigo-50 border border-indigo-100 rounded-3xl">
            <ShieldCheck className="text-indigo-600 mb-3" size={28} />
            <h3 className="font-bold text-indigo-900">Privacy First</h3>
            <p className="text-xs text-indigo-700/80 mt-1 leading-relaxed font-semibold">
              We only send essential updates. You can toggle off non-critical alerts anytime.
            </p>
          </div>
          <div className="p-5 bg-amber-50 border border-amber-100 rounded-3xl">
            <Info className="text-amber-600 mb-3" size={28} />
            <h3 className="font-bold text-amber-900">Important Note</h3>
            <p className="text-xs text-amber-700/80 mt-1 leading-relaxed font-semibold">
              System security alerts and payment receipts cannot be disabled for your protection.
            </p>
          </div>
        </div>

        <div className="md:col-span-2 space-y-4">
          {notificationOptions.map((item) => (
            <Card key={item.id} className="group border-none shadow-sm hover:shadow-md transition-all duration-300 rounded-[2rem] p-6 bg-white border border-slate-100">
              <div className="flex items-center justify-between">
                <div className="flex gap-5">
                  <div className={`w-14 h-14 rounded-2xl ${item.color} bg-opacity-10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}>
                    <item.icon size={24} className={item.color.replace('bg-', 'text-')} />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-slate-900">{item.title}</h4>
                    <p className="text-sm text-slate-500 max-w-[280px] leading-snug font-medium">
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
                      className="data-[state=checked]:bg-indigo-600 transition-colors shadow-sm"
                    />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {item.id}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div className="pt-6 border-t border-slate-100 flex justify-end">
        <button 
          onClick={() => toast.info("Preferences are auto-saved on change.")}
          className="px-8 py-3 bg-slate-900 text-white font-bold rounded-2xl hover:bg-indigo-600 transition-all active:scale-95 shadow-lg shadow-indigo-100"
        >
          Preferences Secured
        </button>
      </div>
    </div>
  );
};

export default NotificationsModule;
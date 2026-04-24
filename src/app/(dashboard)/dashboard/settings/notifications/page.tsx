// src/app/dashboard/settings/notifications/page.tsx
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import React from 'react';
import { getNotification } from '@/app/(public)/events/_actions';
import NotificationsModule from '@/components/modules/dashboard/settings/NotificationsModule';

export const dynamic = 'force-dynamic';

const NotificationSettingsPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notification'],
    queryFn: getNotification,
  });

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NotificationsModule />
      </HydrationBoundary>
    </div>
  );
};

export default NotificationSettingsPage;
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import React from 'react';
import { getMyEvents } from '@/app/(public)/events/_actions'; 
import MyEventsModule from '@/components/modules/dashboard/my-events/MyEventsModule';
import { cookies } from 'next/headers';
import { jwtDecode } from 'jwt-decode';

const MyEventsPage = async () => {
  const queryClient = new QueryClient();
  
  const cookieStore = await cookies(); 
  const token = cookieStore.get('accessToken')?.value;
  
  let currentUserId: string | number | null = null;

  if (token) {
    try {
      const decoded: any = jwtDecode(token);
      currentUserId = decoded.userId || decoded.id || decoded.sub;
    } catch (error) {
      console.error("❌ Server Side Token Decode Error:", error);
    }
  }

  if (currentUserId) {
    await queryClient.prefetchQuery({
      queryKey: ['events', 'mine', String(currentUserId)], 
      queryFn: async () => {
        const response = await getMyEvents();


        
        return Array.isArray(response) ? response : response?.data || [];
      },
    });
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MyEventsModule currentUserId={currentUserId} />
    </HydrationBoundary>
  );
};

export default MyEventsPage;
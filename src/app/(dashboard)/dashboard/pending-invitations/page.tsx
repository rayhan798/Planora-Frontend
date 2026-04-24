// src/app/(dashboard)/invitations/page.tsx
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import React from 'react';
import { getInvitations } from '@/app/(public)/events/_actions';
import InvitationsModule from '@/components/modules/dashboard/invitations/InvitationsModule';

const InvitationsPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['invitations'],
    queryFn: getInvitations,
  });

  return (
    <>
    
        <HydrationBoundary state={dehydrate(queryClient)}>
          <InvitationsModule />
        </HydrationBoundary>
    </>
  );
};

export default InvitationsPage;
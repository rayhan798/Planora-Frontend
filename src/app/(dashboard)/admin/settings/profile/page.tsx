// src/app/(dashboard)/settings/profile/page.tsx
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { getMyProfile } from '@/app/(public)/events/_actions';
import ProfileModule from '@/components/modules/dashboard/admin/settings/ProfileModule';

export const dynamic = 'force-dynamic';

export default async function ProfilePage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['my-profile'],
    queryFn: getMyProfile,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProfileModule />
    </HydrationBoundary>
  );
}
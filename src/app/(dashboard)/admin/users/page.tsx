import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { getAllUsers } from '@/app/(public)/events/_actions';
import AllUsersPage from '@/components/modules/dashboard/admin/users/AllUsersPage';

export const dynamic = 'force-dynamic';

export default async function UsersPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["all-users"],
    queryFn: getAllUsers,
  });

  return (

    <HydrationBoundary state={dehydrate(queryClient)}>
      <AllUsersPage />
    </HydrationBoundary>
  );
}
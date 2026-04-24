import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import EventsListPage from "@/components/modules/events/EventsListPage";
import { getEvents } from "./_actions";

export default async function EventsPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["events"],
    queryFn: getEvents,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <EventsListPage />
    </HydrationBoundary>
  );
}
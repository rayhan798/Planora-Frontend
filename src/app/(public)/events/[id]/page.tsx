import EventDetailsClient from "@/components/modules/events/EventsDetailsPage";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EventDetailsPage({ params }: PageProps) {
  const { id } = await params;

  if (!id) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500 font-bold">
        Event ID is missing
      </div>
    );
  }

  return <EventDetailsClient id={id} />;
}
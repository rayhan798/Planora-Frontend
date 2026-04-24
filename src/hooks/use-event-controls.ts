import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface UseEventControlsProps {
  id: number | string;
}

export const useEventControls = ({ id }: UseEventControlsProps) => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const eventId = id ?? "N/A";

  const handleViewRequests = () => {
    if (eventId === "N/A") return;
    router.push(`/dashboard/events/${eventId}/requests`);
  };

  const handleDelete = async () => {
    const confirmDelete = confirm("Are you sure you want to delete this event?");
    if (confirmDelete) {
      toast.info("Delete functionality needs to be connected to API");
    }
  };

  const handleEdit = () => {
    router.push(`/dashboard/events/${eventId}/edit`);
  };

  const handleAnalytics = () => {
    router.push(`/dashboard/analytics/${eventId}`);
  };

  return {
    eventId,
    isDeleting,
    handleViewRequests,
    handleDelete,
    handleEdit,
    handleAnalytics,
  };
};
import { toast } from "sonner";

export const useReviewActions = (review: any) => {
  const handleEdit = () => {
    toast.info(`Editing review for: ${review.eventTitle}`);
  };

  const handleDelete = () => {
    toast.error(`Review for ${review.eventTitle} deleted`);
  };

  return {
    handleEdit,
    handleDelete,
  };
};
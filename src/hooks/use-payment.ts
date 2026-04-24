import { useState } from "react";
import { toast } from "sonner";
import { initiatePaymentAction } from "@/app/(public)/events/_actions";

export const usePayment = (eventId: string) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    if (!eventId) {
      toast.error("Event ID missing!");
      return;
    }

    setIsProcessing(true);
    try {
      const response: any = await initiatePaymentAction(eventId);
      
      if (response?.success && response?.data?.paymentUrl) {
        toast.success("Redirecting to Stripe...");
        window.location.href = response.data.paymentUrl;
      } else {
        toast.error(response?.message || "Payment gateway unavailable");
      }
    } catch (error: any) {
      toast.error("Something went wrong!");
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    handlePayment,
    isProcessing,
  };
};
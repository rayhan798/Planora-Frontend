import { useState, useEffect } from "react";
import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { httpClient } from "@/lib/axios/httpClient";
import { toast } from "sonner";

export const useForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [userEmail, setUserEmail] = useState("");
  const router = useRouter();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const emailForm = useForm({
    defaultValues: { email: "" },
    onSubmit: async ({ value }) => {
      setIsLoading(true);
      try {
        await httpClient.post("/auth/forget-password", value);
        setUserEmail(value.email);
        setStep(2);
        setCountdown(60);
        toast.success("Code sent to your email!");
      } catch (err: any) {
        toast.error(err.response?.data?.message || "Failed to send code!");
      } finally {
        setIsLoading(false);
      }
    },
  });

  const resetForm = useForm({
    defaultValues: { otp: "", newPassword: "" },
    onSubmit: async ({ value }) => {
      const payload = {
        email: userEmail,
        otp: value.otp,
        newPassword: value.newPassword,
      };

      setIsLoading(true);
      try {
        await httpClient.post("/auth/reset-password", payload);
        toast.success("Password reset successful!");
        router.push("/login");
      } catch (err: any) {
        toast.error(err.response?.data?.message || "Invalid OTP or request failed!");
      } finally {
        setIsLoading(false);
      }
    },
  });

  return {
    step,
    isLoading,
    countdown,
    emailForm,
    resetForm,
    setCountdown
  };
};
import { useState, useEffect } from "react";
import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import * as z from "zod";
import { useRouter, useSearchParams } from "next/navigation";
import { httpClient } from "@/lib/axios/httpClient";

export const verifySchema = z.object({
  code: z.string().length(6, "Code must be exactly 6 digits"),
});

export type VerifyValues = z.infer<typeof verifySchema>;

export const useVerifyEmail = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const email = searchParams.get("email") || "";

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const form = useForm({
    defaultValues: {
      code: "",
    } as VerifyValues,
    validatorAdapter: zodValidator() as any,
    onSubmit: async ({ value }: { value: VerifyValues }) => {
      setIsLoading(true);
      setError(null);
      try {
        await httpClient.post("/auth/verify-email", {
          email,
          otp: value.code,
        });
        router.push("/login?verified=true");
      } catch (err: any) {
        setError(err.response?.data?.message || "Invalid or expired code.");
      } finally {
        setIsLoading(false);
      }
    },
  } as any);

  const handleResend = async () => {
    if (resendLoading || countdown > 0) return;
    
    setResendLoading(true);
    setError(null);
    try {
      await httpClient.post("/auth/resend-otp", { email });
      setCountdown(60);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to resend OTP.");
    } finally {
      setResendLoading(false);
    }
  };

  return {
    form,
    email,
    isLoading,
    resendLoading,
    countdown,
    error,
    handleResend
  };
};
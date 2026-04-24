import { useState } from "react";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { httpClient } from "@/lib/axios/httpClient";

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type RegisterValues = z.infer<typeof registerSchema>;

export const useRegisterForm = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    } as RegisterValues,
    validatorAdapter: zodValidator() as any,
    onSubmit: async ({ value }: any) => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await httpClient.post("/auth/register", value);
        console.log("Registered Successfully:", res);
        router.push(`/verify-email?email=${encodeURIComponent(value.email)}`);
      } catch (err: any) {
        setError(err.response?.data?.message || "Registration failed. Please try again.");
      } finally {
        setIsLoading(false);
      }
    },
  } as any);

  return {
    form,
    error,
    isLoading,
    showPassword,
    setShowPassword,
  };
};
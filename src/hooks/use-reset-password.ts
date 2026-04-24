import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import * as z from "zod";
import { useRouter } from "next/navigation";

export const passwordSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
});

export type ResetValues = z.infer<typeof passwordSchema>;

export const useResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
    } as ResetValues,
    validatorAdapter: zodValidator() as any,
    onSubmit: async ({ value }: any) => {
      setIsLoading(true);
      try {
        await new Promise((r) => setTimeout(r, 2000));
        router.push("/login?reset=success");
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    },
  } as any);

  return {
    form,
    showPassword,
    setShowPassword,
    isLoading,
  };
};
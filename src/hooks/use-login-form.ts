// hooks/use-login-form.ts
import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { useMutation } from "@tanstack/react-query";
import { loginAction } from "@/app/(public)/(auth)/login/_actions";
import { ILoginPayload, loginZodSchema } from "@/zod/auth.validation";

export const useLoginForm = (redirectPath?: string) => {
  const [serverError, setServerError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (payload: ILoginPayload) => loginAction(payload, redirectPath),
  });

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    } as ILoginPayload,
    validatorAdapter: zodValidator() as any,
    onSubmit: async ({ value }: any) => {
      setServerError(null);
      try {
        const result = (await mutateAsync(value)) as any;

        if (result.success && result.data?.accessToken) {
          localStorage.setItem("accessToken", result.data.accessToken);
          window.location.href = redirectPath || "/events";
        } else if (!result.success) {
          setServerError(result.message || "Login failed");
        }
      } catch (error: any) {
        setServerError(`Login failed: ${error.message}`);
      }
    },
  } as any);

  return {
    form,
    serverError,
    setServerError,
    showPassword,
    setShowPassword,
    isPending,
  };
};
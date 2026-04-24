/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { getDefaultDashboardRoute, isValidRedirectForRole, UserRole } from "@/lib/authutils";
import { httpClient } from "@/lib/axios/httpClient";
import { setTokenInCookies } from "@/lib/tokenUtils";
import { ApiErrorResponse } from "@/types/api.types";
import { ILoginResponse } from "@/types/auth.types";
import { ILoginPayload, loginZodSchema } from "@/zod/auth.validation";
import { redirect } from "next/navigation";

// login action
export const loginAction = async (
  payload: ILoginPayload,
  redirectPath?: string
): Promise<ILoginResponse | ApiErrorResponse> => {
  const parsedPayload = loginZodSchema.safeParse(payload);

  if (!parsedPayload.success) {
    const firstError = parsedPayload.error.issues[0].message || "Invalid input";
    return {
      success: false,
      message: firstError,
    };
  }

  let targetPath = "";

  try {
    // Make login request
    const response = await httpClient.post("/auth/login", parsedPayload.data);

    // Destructure tokens and user info
    const { accessToken, refreshToken, user } = response.data;
    const { role, needPasswordChange, email } = user;

    // Set JWT tokens in cookies
    await setTokenInCookies("accessToken", accessToken);
    await setTokenInCookies("refreshToken", refreshToken);
    await setTokenInCookies("userRole", user.role, 24 * 60 * 60);

    // Handle password reset requirement logic
    if (needPasswordChange) {
      targetPath = `/reset-password?email=${email}`;
    } else {
      // Determine redirect path based on role
      targetPath =
        redirectPath && isValidRedirectForRole(redirectPath, role as UserRole)
          ? redirectPath
          : getDefaultDashboardRoute(role as UserRole);
    }
  } catch (error: any) {
    if (error.digest?.startsWith("NEXT_REDIRECT")) {
      throw error;
    }

    // Handle email not verified
    if (error?.response?.data?.message === "Email not verified") {
      targetPath = `/verify-email?email=${payload.email}`;
    } else {
      console.log("login error", error.message);
      return {
        success: false,
        message: `Login failed: ${error.response?.data?.message || error.message}`,
      };
    }
  }

  if (targetPath) {
    redirect(targetPath);
  }

  return {
    success: true,
    message: "Login successful",
  };
};
// src/services/auth.services.ts
"use server";

import { setTokenInCookies } from "@/lib/tokenUtils";
import { cookies } from "next/headers";

const BASE_API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!BASE_API_URL) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL is not defined");
}

/**
 * Set token in cookies using next/headers cookies API
 */
async function setCookie(name: string, value: string, maxAgeSeconds?: number) {
  const cookieStore = await cookies();
  cookieStore.set({
    name,
    value,
    httpOnly: true,
    path: "/",
    maxAge: maxAgeSeconds,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
}

/**
 * Refresh JWT tokens using refresh token
 */
export async function refreshTokens(refreshToken: string): Promise<boolean> {
  try {
    const res = await fetch(`${BASE_API_URL}/auth/refresh-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `refreshToken=${refreshToken}`,
      },
    });

    if (!res.ok) return false;

    const { data } = await res.json();
    const { accessToken, refreshToken: newRefreshToken } = data;

    if (accessToken) await setCookie("accessToken", accessToken, 15 * 60); // 15 min
    if (newRefreshToken) await setCookie("refreshToken", newRefreshToken, 7 * 24 * 60 * 60); // 7 days

    return true;
  } catch (error) {
    console.error("Error refreshing tokens:", error);
    return false;
  }
}

/**
 * Get authenticated user info using accessToken
 */
export async function getUserInfo() {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) return null;

    const res = await fetch(`${BASE_API_URL}/auth/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      console.error("Failed to fetch user info:", res.status, res.statusText);
      return null;
    }

    const { data } = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching user info:", error);
    return null;
  }
}

/**
 * Login user and set JWT cookies
 */
export async function loginUser(email: string, password: string) {
  try {
    const res = await fetch(`${BASE_API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) throw new Error(`Login failed: ${res.statusText}`);

    const { data } = await res.json();
    const { accessToken, refreshToken } = data;

    await setCookie("accessToken", accessToken, 15 * 60); // 15 min
    await setCookie("refreshToken", refreshToken, 7 * 24 * 60 * 60); // 7 days

    return data.user;
  } catch (error) {
    console.error("Login error:", error);
    return null;
  }
}

/**
 * Logout user and clear cookies
 */
export async function logoutUser() {
  const cookieStore = await cookies();
  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");
}
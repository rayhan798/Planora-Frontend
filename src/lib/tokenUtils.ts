"use server";

import jwt, { JwtPayload } from "jsonwebtoken";
import { setCookie } from "./cookieUtils";

/**
 * Returns remaining seconds for a JWT before it expires
 */
const getTokenSecondsRemaining = (token: string): number => {
  if (!token) return 0;

  try {
    const tokenPayload = jwt.decode(token) as JwtPayload;

    if (!tokenPayload || !tokenPayload.exp) {
      return 0;
    }

    const remainingSeconds = tokenPayload.exp - Math.floor(Date.now() / 1000);
    return remainingSeconds > 0 ? remainingSeconds : 0;
  } catch (error) {
    console.error("Error decoding token:", error);
    return 0;
  }
};

/**
 * Sets JWT token in cookies with proper maxAge
 */
export const setTokenInCookies = async (
  name: string,
  token: string,
  fallbackMaxAgeInSeconds = 60 * 60 * 24 // 1 day
) => {
  let maxAgeInSeconds: number = fallbackMaxAgeInSeconds;

  // calculate remaining time for JWT unless it's a generic session token
  if (name !== "session_token") {
    maxAgeInSeconds = getTokenSecondsRemaining(token);
  }

  await setCookie(name, token, maxAgeInSeconds || fallbackMaxAgeInSeconds);
};

/**
 * Checks if token is about to expire within a threshold (default 5 minutes)
 */
export async function isTokenExpiringSoon(
  token: string,
  thresholdInSeconds = 300
): Promise<boolean> {
  const remainingSeconds = getTokenSecondsRemaining(token);
  return remainingSeconds > 0 && remainingSeconds <= thresholdInSeconds;
}

/**
 * Checks if token is expired
 */
export async function isTokenExpired(token: string): Promise<boolean> {
  return getTokenSecondsRemaining(token) === 0;
}
// src/middleware/proxy.ts
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import {
  getDefaultDashboardRoute,
  getRouteOwner,
  isAuthRoute,
  UserRole,
} from "@/lib/authutils";
import { jwtUtils } from "@/lib/jwtUtils";
import { isTokenExpiringSoon } from "@/lib/tokenUtils";
import { refreshTokens, getUserInfo } from "@/services/auth.services";

/**
 * Helper: refresh access token using refresh token
 */
async function refreshTokenMiddleware(refreshToken: string): Promise<boolean> {
  try {
    const refreshed = await refreshTokens(refreshToken);
    return refreshed;
  } catch (error) {
    console.error("Error refreshing token in middleware:", error);
    return false;
  }
}

/**
 * Main Proxy Middleware
 */
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.includes("/payment/success")) {
    console.log("Payment success bypass triggered");
    return NextResponse.next();
  }

  try {
    const pathWithQuery = `${pathname}${request.nextUrl.search}`;
    const accessToken = request.cookies.get("accessToken")?.value;
    const refreshToken = request.cookies.get("refreshToken")?.value;

    let userRole: UserRole | null = null; // Decode access token verify

    const verification = accessToken
      ? jwtUtils.verifyToken(
          accessToken,
          process.env.JWT_ACCESS_SECRET as string
        )
      : { success: false, data: null };

    const decodedAccessToken = verification.data;
    const isValidAccessToken = verification.success;

    if (decodedAccessToken) {
      userRole = decodedAccessToken.role as UserRole;
    } // unify SUPER_ADMIN to ADMIN for routing simplicity

    if (userRole === "SUPER_ADMIN") userRole = "ADMIN";

    const routerOwner = getRouteOwner(pathname);
    const isAuth = isAuthRoute(pathname); // =========================
    // Proactive token refresh
    // =========================

    if (
      isValidAccessToken &&
      refreshToken &&
      (await isTokenExpiringSoon(accessToken as string))
    ) {
      const refreshed = await refreshTokenMiddleware(refreshToken);
      if (refreshed) {
        // Refresh
        return NextResponse.next();
      }
    } // =========================
    // Rule 1: Logged-in user blocking auth pages (Fix: Skip for OTP/Reset)
    // =========================

    if (
      isAuth &&
      isValidAccessToken &&
      pathname !== "/verify-email" &&
      pathname !== "/reset-password"
    ) {
      return NextResponse.redirect(
        new URL(getDefaultDashboardRoute(userRole as UserRole), request.url)
      );
    } // =========================
    // Rule 2: Reset password handling (Fix: Added Error Handling)
    // =========================

    if (pathname === "/reset-password") {
      const email = request.nextUrl.searchParams.get("email");
      if (isValidAccessToken && email) {
        try {
          const userInfo = await getUserInfo();
          if (userInfo?.needPasswordChange) return NextResponse.next();
          return NextResponse.redirect(
            new URL(getDefaultDashboardRoute(userRole as UserRole), request.url)
          );
        } catch (err) {
          console.error("UserInfo fetch failed in Rule 2:", err);
          return NextResponse.next();
        }
      }
      if (email) return NextResponse.next();

      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathWithQuery);
      return NextResponse.redirect(loginUrl);
    } // =========================
    // Rule 3: Public routes
    // =========================

    if (routerOwner === null) return NextResponse.next(); // =========================
    // Rule 4: Access protected route without valid access token
    // =========================

    if (!isValidAccessToken) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathWithQuery);
      return NextResponse.redirect(loginUrl);
    }

    // =========================
    // Rule 5: Enforce verify-email / reset-password scenarios (Fixed with Try-Catch)
    // =========================

    if (isValidAccessToken) {
      try {
        const userInfo = await getUserInfo();
        if (userInfo) {
          if (!userInfo.emailVerified && pathname !== "/verify-email") {
            const verifyUrl = new URL("/verify-email", request.url);
            verifyUrl.searchParams.set("email", userInfo.email);
            return NextResponse.redirect(verifyUrl);
          }

          if (userInfo.emailVerified && pathname === "/verify-email") {
            return NextResponse.redirect(
              new URL(
                getDefaultDashboardRoute(userRole as UserRole),
                request.url
              )
            );
          }

          if (userInfo.needPasswordChange && pathname !== "/reset-password") {
            const resetUrl = new URL("/reset-password", request.url);
            resetUrl.searchParams.set("email", userInfo.email);
            return NextResponse.redirect(resetUrl);
          }

          if (!userInfo.needPasswordChange && pathname === "/reset-password") {
            return NextResponse.redirect(
              new URL(
                getDefaultDashboardRoute(userRole as UserRole),
                request.url
              )
            );
          }
        }
      } catch (err) {
        // API কল ফেইল করলে লুপে না ফেলে ইউজারকে ড্যাশবোর্ডে যেতে দিন
        console.error("UserInfo fetch failed in Rule 5 (Bypassing):", err);
      }
    }

    // =========================
    // Rule 6: Common protected routes
    // =========================

    if ((routerOwner as any) === "COMMON") return NextResponse.next(); // =========================
    // Rule 7: Role-based protected route enforcement
    // =========================

    if ((routerOwner as any) === "ADMIN" && userRole !== "ADMIN") {
      return NextResponse.redirect(
        new URL(getDefaultDashboardRoute(userRole as UserRole), request.url)
      );
    }

    if ((routerOwner as any) === "USER" && userRole === "ADMIN") {
      return NextResponse.redirect(new URL("/admin", request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Error in proxy middleware:", error);
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.well-known|dashboard/payment/success).*)",
  ],
};
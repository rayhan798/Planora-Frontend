/* eslint-disable @typescript-eslint/no-explicit-any */

export type UserRole = "USER" | "ADMIN" | "SUPER_ADMIN";

export const authRoutes = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/verify-email",
];

export const isAuthRoute = (pathname: string) => {
  return authRoutes.includes(pathname);
};

export type RouteConfig = {
  exact: string[];
  pattern: RegExp[];
};

export const userOnlyRoutes: RouteConfig = {
  exact: [],
  pattern: [/^\/dashboard(?!\/payment\/success).*/], 
};

export const commonProtectedRoutes: RouteConfig = {
  exact: ["/my-profile", "/change-password"],
  pattern: [],
};


export const adminProtectedRoutes: RouteConfig = {
  exact: ["/admin"],
  pattern: [/^\/admin\/dashboard/, /^\/admin\/.*/], 
};

// ৪. SUPER_ADMIN
export const superAdminProtectedRoutes: RouteConfig = {
  exact: ["/super-admin/dashboard"],
  pattern: [/^\/super-admin\/dashboard/],
};

export const isRouteMatches = (pathname: string, routes: RouteConfig) => {
  if (routes.exact.includes(pathname)) {
    return true;
  }
  return routes.pattern.some((pattern: RegExp) => pattern.test(pathname));
};

export const getRouteOwner = (pathname: string): UserRole | null => {
  if (isRouteMatches(pathname, superAdminProtectedRoutes)) {
    return "SUPER_ADMIN";
  }

  if (isRouteMatches(pathname, adminProtectedRoutes)) {
    return "ADMIN";
  }

  if (isRouteMatches(pathname, userOnlyRoutes)) {
    return "USER";
  }

  if (isRouteMatches(pathname, commonProtectedRoutes)) {
    return null; 
  }

  return null; 
};

export const getDefaultDashboardRoute = (role: UserRole) => {
  switch (role) {
    case "SUPER_ADMIN":
    case "ADMIN":
      return "/admin";

    case "USER":
      return "/dashboard";

    default:
      return "/";
  }
};

export const isValidRedirectForRole = (
  redirectPath: string,
  role: UserRole
) => {
  const sanitizedRedirectPath = redirectPath.split("?")[0] || redirectPath;

  // commonProtectedRoutes
  if (isRouteMatches(sanitizedRedirectPath, commonProtectedRoutes)) {
    return true;
  }

  const routeOwner = getRouteOwner(sanitizedRedirectPath);

  if (routeOwner === null) {
    return true;
  }

  if (role === "ADMIN" || role === "SUPER_ADMIN") {

    if (isRouteMatches(sanitizedRedirectPath, userOnlyRoutes)) {
      return false;
    }

    return routeOwner === "ADMIN" || routeOwner === "SUPER_ADMIN";
  }

  if (role === "USER") {
    if (routeOwner === "ADMIN" || routeOwner === "SUPER_ADMIN") {
      return false;
    }
    return routeOwner === "USER";
  }

  return false;
};
import { NavSection } from "@/types/dashboard.types";
import { getDefaultDashboardRoute, UserRole } from "./authutils";


export const getCommonNavItems = (role: UserRole): NavSection[] => {
  const defaultDashboard = getDefaultDashboardRoute(role);

  return [
    {
      items: [
        {
          title: "Home",
          href: "/",
          icon: "Home",
        },
        {
          title: "Events",
          href: "/events",
          icon: "Calendar",
        },
        {
          title: "Dashboard",
          href: defaultDashboard,
          icon: "LayoutDashboard",
        },
        {
          title: "My Profile",
          href: "/my-profile",
          icon: "User",
        },
      ],
    },
    {
      title: "Settings",
      items: [
        {
          title: "Change Password",
          href: "/change-password",
          icon: "Settings",
        },
      ],
    },
  ];
};

/**
 * 🔹 USER NAVIGATION
 */
export const userNavItems: NavSection[] = [
  {
    title: "Event Management",
    items: [
      {
        title: "My Events",
        href: "/dashboard/my-events",
        icon: "Calendar",
      },
      {
        title: "Create Event",
        href: "/dashboard/create-event",
        icon: "PlusCircle",
      },
      {
        title: "Participants",
        href: "/dashboard/participants",
        icon: "Users",
      },
    ],
  },
  {
    title: "Participation",
    items: [
      {
        title: "Pending Invitations",
        href: "/dashboard/invitations",
        icon: "Mail",
      },
      {
        title: "My Joined Events",
        href: "/dashboard/joined-events",
        icon: "CheckCircle",
      },
    ],
  },
  {
    title: "Reviews",
    items: [
      {
        title: "My Reviews",
        href: "/dashboard/my-reviews",
        icon: "Star",
      },
    ],
  },
];

/**
 * 🔹 ADMIN NAVIGATION
 */
export const adminNavItems: NavSection[] = [
  {
    title: "Admin Panel",
    items: [
      {
        title: "All Events",
        href: "/admin/dashboard/events",
        icon: "Calendar",
      },
      {
        title: "All Users",
        href: "/admin/dashboard/users",
        icon: "Users",
      },
    ],
  },
  {
    title: "Moderation",
    items: [
      {
        title: "Manage Reviews",
        href: "/admin/dashboard/reviews",
        icon: "Star",
      },
      {
        title: "Payments",
        href: "/admin/dashboard/payments",
        icon: "CreditCard",
      },
    ],
  },
];

/**
 * 🔹 ROLE BASED NAVIGATION
 */
export const getNavItemsByRole = (role: UserRole): NavSection[] => {
  const commonNavItems = getCommonNavItems(role);

  switch (role) {
    case "ADMIN":
    case "SUPER_ADMIN":
      return [...commonNavItems, ...adminNavItems];

    case "USER":
      return [...commonNavItems, ...userNavItems];

    default:
      return commonNavItems;
  }
};
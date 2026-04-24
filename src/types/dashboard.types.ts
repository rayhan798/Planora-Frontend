// ================= NAV TYPES =================

export interface NavItem {
  title: string;
  href: string;
  icon: string;
}

export interface NavSection {
  title?: string;
  items: NavItem[];
}

// ================= USER DASHBOARD NAV =================

export const userDashboardNav: NavSection[] = [
  {
    title: "Main",
    items: [
      { title: "Dashboard", href: "/dashboard", icon: "home" },
      { title: "My Events", href: "/dashboard/events", icon: "calendar" },
      { title: "Invitations", href: "/dashboard/invitations", icon: "mail" },
      { title: "My Reviews", href: "/dashboard/reviews", icon: "star" },
    ],
  },
  {
    title: "Settings",
    items: [
      { title: "Profile", href: "/dashboard/profile", icon: "user" },
      { title: "Settings", href: "/dashboard/settings", icon: "settings" },
    ],
  },
];

// ================= ADMIN DASHBOARD NAV =================

export const adminDashboardNav: NavSection[] = [
  {
    title: "Admin Panel",
    items: [
      { title: "Dashboard", href: "/admin/dashboard", icon: "home" },
      { title: "All Events", href: "/admin/events", icon: "calendar" },
      { title: "Users", href: "/admin/users", icon: "users" },
      { title: "Payments", href: "/admin/payments", icon: "credit-card" },
    ],
  },
];


// ================= CHART TYPES =================

export interface PieChartData {
  status: string; // e.g. "APPROVED", "PENDING"
  count: number;
}

export interface BarChartData {
  month: Date | string;
  count: number;
}


// ================= ADMIN DASHBOARD DATA =================

export interface IAdminDashboardData {
  totalEvents: number;
  totalUsers: number;
  totalPayments: number;
  totalRevenue: number;

  adminCount: number;
  userCount: number;

  pendingEvents: number;
  approvedEvents: number;
  rejectedEvents: number;

  barChartData: BarChartData[];
  pieChartData: PieChartData[];
}


// ================= USER DASHBOARD DATA =================

export interface IUserDashboardData {
  totalEventsCreated: number;
  totalParticipatedEvents: number;
  pendingInvitations: number;
  totalReviews: number;

  upcomingEvents: number;
  pastEvents: number;

  barChartData: BarChartData[];
  pieChartData: PieChartData[];
}
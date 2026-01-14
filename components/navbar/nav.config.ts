export type NavItem = {
  title: string;
  href: string;
  description?: string;
};

export type NavSection = {
  label: string;
  items: NavItem[];
  requiresAuth?: boolean;
};

export const NAV_SECTIONS: NavSection[] = [
  {
    label: "Events",
    items: [
      {
        title: "Popular Events",
        href: "/events?popular",
        description: "Top-selling events happening right now.",
      },
      {
        title: "Upcoming Events",
        href: "/events?upcoming",
        description: "Shows, concerts, and experiences coming soon.",
      },
      {
        title: "Categories",
        href: "/events?categories",
        description: "Browse by music, sports, festivals, theatre, and more.",
      },
    ],
  },
  {
    label: "My Tickets",
    items: [
      {
        title: "My Tickets",
        href: "/dashboard/tickets",
        description: "View and manage your purchased tickets.",
      },
      {
        title: "Order History",
        href: "/dashboard/tickets?filter=past#past-events",
        description: "See your order receipts and payment records.",
      },
      {
        title: "Support",
        href: "/support",
        description: "Get help with orders, refunds, or event issues.",
      },
    ],
  },
  {
    label: "Account",
    requiresAuth: true,
    items: [
      { title: "My Profile", href: "/dashboard/account/profile" },
      { title: "Dashboard", href: "/dashboard" },
      { title: "Notifications", href: "/dashboard/notifications" },
    ],
  },
];

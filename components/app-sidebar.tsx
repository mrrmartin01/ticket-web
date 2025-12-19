"use client";

import * as React from "react";
import { Ticket, Bookmark, Bell, User, LifeBuoy } from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import Image from "next/image";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },

  navMain: [
    {
      title: "My Tickets",
      url: "/dashboard/tickets",
      icon: Ticket,
      isActive: true,
      items: [
        { title: "Upcoming", url: "/dashboard/tickets?filter=upcoming#upcoming-events" },
        { title: "Past Orders", url: "/dashboard/tickets?filter=past#past-events" },
      ],
    },
    {
      title: "Saved Events",
      url: "/dashboard/saved",
      icon: Bookmark,
    },
    {
      title: "Notifications",
      url: "/dashboard/notifications",
      icon: Bell,
    },
    {
      title: "Account Settings",
      url: "/dashboard/account",
      icon: User,
      items: [
        { title: "Profile", url: "/dashboard/account/profile" },
        { title: "Security", url: "/dashboard/account/security" },
      ],
    },
  ],

  navSecondary: [{ title: "Support", url: "/support", icon: LifeBuoy }],
};

export function DashBoardSidebar(props: React.ComponentProps<typeof Sidebar>) {
  console.log(process.env.NEXT_PUBLIC_APP_NAME);
  return (
    <Sidebar
      className="top-(--header-height) h-[calc(100svh-var(--header-height))]!"
      {...props}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Image
                    src={"/logo.png"}
                    alt={`${process.env.NEXT_PUBLIC_APP_NAME} Logo`}
                    width={24}
                    height={24}
                  />
                </div>

                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">
                    {process.env.NEXT_PUBLIC_APP_NAME} Dashboard
                  </span>
                  <span className="truncate text-xs">Event Booking</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}

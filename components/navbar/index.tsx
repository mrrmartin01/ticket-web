"use client";
import { useAppSelector } from "@/redux/reduxHook";
import React from "react";
import { NavigationMenuLink } from "../ui/navigation-menu";
import { cn } from "@/lib/utils";
import { NAV_SECTIONS } from "./nav.config";
import Link from "next/link";
import Image from "next/image";
import { DesktopNav } from "./desktopNav";
import { MobileNav } from "./mobileNav";
import { UserMenu } from "./userMenu";
import AuthButtons from "./authButtons";

/* ----- Shared List Item ----- */
export const ListItem = React.forwardRef<
  React.ComponentRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { title: string }
>(({ className, title, children, ...props }, ref) => (
  <li>
    <NavigationMenuLink asChild>
      <a
        ref={ref}
        className={cn(
          "block space-y-1 rounded-md p-3 no-underline hover:bg-accent transition-colors",
          className
        )}
        {...props}
      >
        <div className="text-sm font-medium leading-none">{title}</div>
        <p className="line-clamp-2 text-sm text-muted-foreground">{children}</p>
      </a>
    </NavigationMenuLink>
  </li>
));
ListItem.displayName = "ListItem";




export const Navbar = () => {
  const { user, isAuthInitialized } = useAppSelector(
    (state) => state.auth
  );

  if (!isAuthInitialized) return null;

  const visibleSections = NAV_SECTIONS.filter(
    (s) => !s.requiresAuth || user
  );

  return (
    <div className="sticky top-0 z-50 bg-white border-b px-4 md:px-8 h-14 flex items-center justify-between">
      <Link href="/" className="flex items-center space-x-2">
        <Image src="/logo.png" alt="Tickets" width={28} height={28} />
        <span className="text-lg font-medium">Tickets</span>
      </Link>

      <DesktopNav sections={visibleSections} />
      <MobileNav sections={visibleSections} />

      {!user ? <AuthButtons /> : <UserMenu user={user} />}
    </div>
  );
};

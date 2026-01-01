"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useAppSelector } from "@/redux/reduxHook";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { IconChevronDown } from "@tabler/icons-react";
import { maskEmail } from "@/lib/emailMask";
import { useSignout } from "@/hooks/auth";

const eventCategories = [
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
  {
    title: "Venues",
    href: "/events?venues",
    description: "Find events happening at venues near you.",
  },
];

const ticketCategories = [
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
];

const loggedInMenuItems = [
  { title: "My Profile", href: "/dashboard/account/profile" },
  { title: "Dashboard", href: "/dashboard" },
  { title: "Notifications", href: "/dashboard/notifications" },
];

/* ----- Desktop Navigation ----- */
export function Nav() {
  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Events</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <Link
                    href="/events"
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-linear-to-b from-muted/50 to-muted p-6"
                  >
                    <Image
                      src="/logo.png"
                      alt="Tickets"
                      width={24}
                      height={24}
                      className="h-16 w-16 mx-auto"
                    />
                    <div className="mb-2 mt-4 text-lg font-medium">
                      Browse Events
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Discover concerts, sports, festivals, and more.
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>

              {eventCategories.slice(0, 3).map((item) => (
                <ListItem key={item.title} href={item.href} title={item.title}>
                  {item.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>My Tickets</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] p-4 gap-3 md:w-[500px] md:grid-cols-2">
              {ticketCategories.map((item) => (
                <ListItem key={item.title} href={item.href} title={item.title}>
                  {item.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/about" className={navigationMenuTriggerStyle()}>
              About
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

/* ----- Shared List Item ----- */
const ListItem = React.forwardRef<
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

/* ----- Mobile Navigation ----- */
export function MobileNav() {
  const { user, isAuthInitialized } = useAppSelector(
    (state) => state.auth
  );
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="w-[300px] sm:w-[350px]">
        <SheetTitle className="sr-only">Menu</SheetTitle>
        <SheetDescription className="sr-only">
          Mobile navigation
        </SheetDescription>

        <div className="flex flex-col gap-6 py-6 px-5">
          <Link href="/" className="flex items-center space-x-2 mb-5">
            <Image src="/logo.png" alt="Tickets" width={30} height={30} />
            <span className="text-lg font-medium">Tickets</span>
          </Link>

          <MobileSection
            title="Events"
            items={eventCategories}
            linkKey="href"
          />
          <MobileSection
            title="My Tickets"
            items={ticketCategories}
            linkKey="href"
          />

          <Link
            href="/about"
            className="hover:underline text-sm text-muted-foreground hover:text-foreground border-b pb-4"
          >
            About
          </Link>

          {isAuthInitialized && user && (
            <MobileSection
              title="Porfile"
              items={loggedInMenuItems}
              linkKey="href"
            />
          )}
          {!isAuthInitialized && (
            <div className="flex flex-col space-y-2 mt-10">
              <Button variant="outline" asChild className="w-full rounded-2xl">
                <Link href="/register">Register</Link>
              </Button>
              <Button asChild className="w-full rounded-2xl">
                <Link href="/login">Login</Link>
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

/* ----- Mobile Section Helper ----- */
function MobileSection<T extends { title: string }>(props: {
  title: string;
  items: T[];
  linkKey: keyof T;
}) {
  return (
    <div className="flex flex-col space-y-2 border-b pb-4">
      <h4 className="font-medium">{props.title}</h4>
      {props.items.map((item) => (
        <Link
          key={item.title}
          href={item[props.linkKey] as string}
          className="text-sm text-muted-foreground hover:text-foreground hover:underline"
        >
          {item.title}
        </Link>
      ))}
    </div>
  );
}

/* ----- Navbar ----- */
export const Navbar = () => {
const { user, isAuthInitialized } = useAppSelector(
  (state) => state.auth
);
  const { handleSignout, isLoading: isSigningOut } = useSignout();
    if (!isAuthInitialized) return null;


  return (
    <div className="sticky top-0 z-9999 w-full flex justify-between items-center py-2 bg-white border-b px-4 md:px-8">
      <Link href="/" className="transition p-2 rounded-sm">
        <span className="flex items-center space-x-1">
          <Image src="/logo.png" alt="Tickets" width={28} height={28} />
          <span className="text-lg font-medium">Tickets</span>
        </span>
      </Link>

      <Nav />
      <MobileNav />

      {!user && (
        <div className="hidden md:flex space-x-2">
          <Button variant="outline" asChild className="rounded-2xl">
            <Link href="/register">Register</Link>
          </Button>
          <Button asChild className="rounded-2xl">
            <Link href="/login">Login</Link>
          </Button>
        </div>
      )}
      {isAuthInitialized && user && (
        <div className="hidden md:flex space-x-4 items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="focus-visible:ring-0 p-1 flex items-center space-x-1  group data-[state=open]:bg-accent"
              >
                <Avatar className="cursor-pointer">
                  <AvatarImage src="/profile.avif" />
                  <AvatarFallback>
                    {(user.firstName?.[0] || "").toUpperCase()}
                    {(user.lastName?.[0] || "").toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <span className="text-sm capitalize max-w-[120px] truncate">
                  {user.firstName}
                </span>
                <IconChevronDown
                  className="h-4 w-4 transition-transform duration-200
                   group-data-[state=open]:rotate-180"
                />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="p-2 overflow-hidden mt-4"
            >
              <DropdownMenuLabel>
                <div className="flex flex-col">
                  <span className="font-semibold capitalize">
                    {user.firstName} {user.lastName}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {user.email ? maskEmail(user.email) : ""}
                  </span>
                </div>
                <DropdownMenuSeparator />
              </DropdownMenuLabel>
              {loggedInMenuItems.map((item) => (
                <DropdownMenuItem key={item.title} asChild>
                  <Link href={item.href} className="cursor-pointer">
                    {item.title}
                  </Link>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />

              <Button
                onClick={handleSignout}
                variant="ghost"
                className=" w-full cursor-pointer bg-zinc-100 text-red-600 hover:text-red-500 shadow shadow-zinc-300 hover:shadow-red-300 transform-all duration-700"
              >
                {isSigningOut ? "Signing out..." : "Logout"}
              </Button>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </div>
  );
};

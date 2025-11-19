"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

// Renamed + rewritten
const eventCategories = [
  {
    title: "Popular Events",
    href: "/events/popular",
    description: "Top-selling events happening right now.",
  },
  {
    title: "Upcoming Events",
    href: "/events/upcoming",
    description: "Shows, concerts, and experiences coming soon.",
  },
  {
    title: "Categories",
    href: "/events/categories",
    description: "Browse by music, sports, festivals, theatre, and more.",
  },
  {
    title: "Venues",
    href: "/events/venues",
    description: "Find events happening at venues near you.",
  },
]

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
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-linear-to-b from-muted/50 to-muted p-6"
                    href="/events"
                  >
                    <Image
                      src="/logo.png"
                      alt="Tickets"
                      width={24}
                      height={24}
                      className="h-16 w-16 mx-auto"
                    />
                    <div className="mb-2 mt-4 text-lg font-medium">Browse Events</div>
                    <p className="text-sm text-muted-foreground">
                      Discover concerts, sports, festivals, and more.
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>

              <ListItem href="/events/popular" title="Popular Events">
                Top-selling events right now.
              </ListItem>
              <ListItem href="/events/upcoming" title="Upcoming Events">
                What’s coming up next near you.
              </ListItem>
              <ListItem href="/events/categories" title="Categories">
                Music, sports, theatre, comedy, and more.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>My Tickets</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] p-4 gap-3 md:w-[500px] md:grid-cols-2">
              <ListItem href="/profile/tickets" title="My Tickets">
                View and manage your purchased tickets.
              </ListItem>
              <ListItem href="/profile/orders" title="Order History">
                See your order receipts and payment records.
              </ListItem>
              <ListItem href="/support" title="Support">
                Get help with orders, refunds, or event issues.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link href="/about" passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              About
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block space-y-1 rounded-md p-3 no-underline hover:bg-accent transition-colors",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm text-muted-foreground">{children}</p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

export function MobileNav() {
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
        <SheetDescription className="sr-only">Mobile navigation</SheetDescription>

        <div className="flex flex-col gap-6 py-6 px-5">
          <Link href="/" className="flex items-center space-x-2 mb-5">
            <Image src="/logo.png" alt="Tickets" width={30} height={30} />
            <span className="text-lg font-medium">Tickets</span>
          </Link>

          <div className="flex flex-col space-y-3">

            <div className="flex flex-col space-y-2 border-b pb-4">
              <h4 className="font-medium">Events</h4>
              <Link href="/events" className="text-sm text-muted-foreground hover:text-foreground">
                Browse Events
              </Link>
              {eventCategories.map((c) => (
                <Link
                  key={c.title}
                  href={c.href}
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  {c.title}
                </Link>
              ))}
            </div>

            <div className="flex flex-col space-y-2 border-b pb-4">
              <h4 className="font-medium">My Tickets</h4>
              <Link href="/profile/tickets" className="text-sm text-muted-foreground hover:text-foreground">
                My Tickets
              </Link>
              <Link href="/profile/orders" className="text-sm text-muted-foreground hover:text-foreground">
                Order History
              </Link>
              <Link href="/support" className="text-sm text-muted-foreground hover:text-foreground">
                Support
              </Link>
            </div>

            <Link href="/about" className="font-medium hover:text-foreground/80">
              About
            </Link>
          </div>

          <div className="flex flex-col space-y-2 mt-10">
            <Button variant="outline" asChild className="w-full rounded-2xl">
              <Link href="/register">Register</Link>
            </Button>
            <Button asChild className="w-full rounded-2xl">
              <Link href="/login">Login</Link>
            </Button>
          </div>
        </div>

      </SheetContent>
    </Sheet>
  )
}

export const Navbar = () => {
  return (
    <div className="sticky top-0 z-50 w-full flex justify-between items-center py-2 bg-white border-b px-4 md:px-8">
      <Link href="/" className="transition  p-2 rounded-sm">
        <span className="flex items-center space-x-1">
          <Image src="/logo.png" alt="Tickets" width={28} height={28} />
          <span className="text-lg font-medium">Tickets</span>
        </span>
      </Link>

      <Nav />
      <MobileNav />

      <div className="hidden md:flex space-x-2">
        <Button variant="outline" asChild className="rounded-2xl">
          <Link href="/register">Register</Link>
        </Button>
        <Button asChild className="rounded-2xl">
          <Link href="/login">Login</Link>
        </Button>
      </div>
    </div>
  )
}

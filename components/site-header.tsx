"use client";

import { Menu } from "lucide-react";
import { useMemo } from "react";

import { SearchForm } from "@/components/search-form";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useSidebar } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";

export function SiteHeader() {
  const { toggleSidebar } = useSidebar();
  const pathname = usePathname();

  // Build breadcrumb items based on pathname
  const breadcrumbItems = useMemo(() => {
    if (!pathname) return [];

    const segments = pathname
      .split("/").filter(Boolean).map((seg) => seg.replace(/-/g, " "));

    return segments;
  }, [pathname]);

  return (
    <header className="bg-background sticky top-0 z-50 flex w-full items-center border-b">
      <div className="flex h-(--header-height) w-full items-center gap-2 px-4">

        {/* Sidebar toggle */}
        <Button
          className="h-8 w-8"
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
        >
          <Menu className="size-5" />
        </Button>

        <Separator orientation="vertical" className="mr-2 h-4" />

        {/* Breadcrumb (only show when meaningful) */}
        <Breadcrumb className="hidden sm:block">
          <BreadcrumbList>
            {breadcrumbItems.length === 0 ? (
              <BreadcrumbItem>
                <BreadcrumbPage>Dashboard</BreadcrumbPage>
              </BreadcrumbItem>
            ) : (
              breadcrumbItems.map((item, idx) => {
                const isLast = idx === breadcrumbItems.length - 1;
                const href = "/" + breadcrumbItems.slice(0, idx + 1).join("/");

                return (
                  <div key={item} className="flex items-center">
                    <BreadcrumbItem>
                      {isLast ? (
                        <BreadcrumbPage className="capitalize">
                          {item}
                        </BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink
                          href={href}
                          className="capitalize"
                        >
                          {item}
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                    {!isLast && <BreadcrumbSeparator />}
                  </div>
                );
              })
            )}
          </BreadcrumbList>
        </Breadcrumb>

        {/* Search (right aligned on large screens) */}
        <SearchForm className="w-full sm:ml-auto sm:w-auto" />

      </div>
    </header>
  );
}

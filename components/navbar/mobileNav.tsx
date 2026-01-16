import { IconMenu } from "@tabler/icons-react";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { NavSection } from "./nav.config";
import Link from "next/link";
import Image from "next/image";

export function MobileNav({ sections }: { sections: NavSection[] }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <IconMenu className="h-5 w-5" />
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="w-[320px]">
        <div className="flex flex-col gap-6 py-6">
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/logo.png" alt="Tickets" width={28} height={28} />
            <span className="text-lg font-medium">Tickets</span>
          </Link>

          {sections.map((section) => (
            <div key={section.label} className="border-b pb-4 space-y-2">
              <h4 className="font-medium">{section.label}</h4>
              {section.items.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="block text-sm text-muted-foreground hover:text-foreground"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          ))}

          <Link href="/about" className="text-sm text-muted-foreground">
            About
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}

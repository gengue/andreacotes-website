"use client";

import * as React from "react";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";

const sections = [
  { id: "about", name: "About" },
  { id: "fieldwork", name: "Fieldwork" },
  { id: "publications", name: "Publications" },
  { id: "contact", name: "Contact" },
];

export default function Nav() {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-20 backdrop-blur-[2px] bg-paper/70">
      <nav
        className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4 md:px-0"
        aria-label="Global"
      >
        <a href="#about" className="font-display text-3xl text-ink hover:text-accent transition-colors -m-1.5 p-1.5">
          Andrea Cotes
        </a>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open main menu">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:max-w-sm bg-paper">
              <SheetHeader>
                <SheetTitle className="font-display text-2xl text-ink">
                  Andrea Cotes
                </SheetTitle>
              </SheetHeader>
              <div className="mt-6 flex flex-col gap-1 px-4">
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    onClick={() => setMobileOpen(false)}
                    className="py-2 font-sans text-base text-ink hover:text-accent transition-colors"
                  >
                    {section.name}
                  </a>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="hidden lg:flex lg:items-center lg:gap-6">
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="font-sans text-sm tracking-wide text-ink hover:text-accent transition-colors"
            >
              {section.name}
            </a>
          ))}
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}

"use client";

import * as React from "react";
import { Menu } from "lucide-react";
import { Caveat } from "next/font/google";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";

const caveat = Caveat({
  weight: ["600"],
  style: ["normal"],
  subsets: ["latin"],
});

const sections = [
  { id: "about", name: "About me" },
  { id: "publications", name: "Publications" },
  { id: "contact", name: "Contact" },
];

export default function Nav() {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <header>
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <a href="#about" className={`${caveat.className} -m-1.5 p-1.5`}>
            <span className="text-4xl font-bold text-primary">Andrea Cotes</span>
          </a>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open main menu">
                <Menu className="size-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:max-w-sm">
              <SheetHeader>
                <SheetTitle className="text-xl text-primary">Andrea Cotes</SheetTitle>
              </SheetHeader>
              <div className="mt-6 flex flex-col gap-1 px-4">
                {sections.map((section) => (
                  <Button
                    key={section.id}
                    asChild
                    variant="ghost"
                    className="justify-start"
                    onClick={() => setMobileOpen(false)}
                  >
                    <a href={`#${section.id}`}>{section.name}</a>
                  </Button>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="hidden lg:flex lg:items-center lg:gap-x-2">
          {sections.map((section) => (
            <Button key={section.id} asChild variant="ghost">
              <a href={`#${section.id}`}>{section.name}</a>
            </Button>
          ))}
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}

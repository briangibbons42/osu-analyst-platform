"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Research", href: "/research" },
  { label: "Teach Mode", href: "/teach" },
  { label: "Analyst Mode", href: "/analyst" },
  { label: "Videos", href: "/videos" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="bg-nav-bg border-b border-light-gray">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-beaver-orange">
            <span className="text-lg font-extrabold text-white">OSU</span>
          </div>
          <div className="leading-tight">
            <span className="block text-sm font-bold tracking-wide text-paddletail-black">
              FINANCE INVESTMENT CLUB
            </span>
            <span className="block text-xs text-body-text">
              Analyst Platform
            </span>
          </div>
        </Link>

        <nav className="hidden gap-1 md:flex">
          {NAV_ITEMS.map((item) => {
            const active =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-md px-4 py-2 text-sm font-semibold transition-colors ${
                  active
                    ? "bg-beaver-orange text-white"
                    : "text-body-text hover:bg-beaver-orange/10"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

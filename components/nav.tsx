"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CloseIcon, Logo, MenuIcon } from "@/components/icons";

const links = [
  { href: "/#work", label: "Work" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-bg/80 backdrop-blur-md">
      <nav aria-label="Main" className="container-page flex h-16 items-center justify-between gap-6">
        <Link
          href="/"
          className="group flex items-center gap-2.5 font-display text-[1.05rem] font-semibold tracking-tight"
          onClick={() => setOpen(false)}
        >
          <Logo className="transition-transform duration-300 group-hover:-rotate-6" />
          Derrick Omanwa
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <ul className="flex items-center gap-7 text-sm text-muted">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="-mx-1 inline-block px-1 py-2.5 transition-colors hover:text-fg">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/#contact"
            className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-on-accent transition-colors hover:bg-accent-soft"
          >
            Get in touch
          </Link>
        </div>

        <button
          type="button"
          className="-mr-2 grid size-10 place-items-center rounded-lg text-fg transition-colors hover:bg-surface-2 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <CloseIcon width={22} height={22} /> : <MenuIcon width={22} height={22} />}
        </button>
      </nav>

      <div
        id="mobile-menu"
        hidden={!open}
        className="border-t border-line/70 bg-bg md:hidden"
      >
        <ul className="container-page flex flex-col py-3">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={() => setOpen(false)}
                className="block py-3 font-display text-2xl font-semibold tracking-tight text-fg"
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li className="pt-3 pb-2">
            <Link
              href="/#contact"
              onClick={() => setOpen(false)}
              className="flex w-full items-center justify-center rounded-full bg-accent px-5 py-3 font-semibold text-on-accent"
            >
              Get in touch
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}

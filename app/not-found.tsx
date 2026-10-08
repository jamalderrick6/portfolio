import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "@/components/icons";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <section className="container-page flex min-h-[60vh] flex-col items-start justify-center py-24">
      <p className="eyebrow">
        <span className="text-accent">404</span> / Not found
      </p>
      <h1 className="mt-4 font-display text-5xl font-bold tracking-tight sm:text-6xl">
        Nothing shipped here.
      </h1>
      <p className="mt-4 max-w-md text-lg text-muted">That page doesn&apos;t exist, or it moved.</p>
      <Link
        href="/"
        className="group mt-10 inline-flex items-center gap-2 rounded-full border border-line-strong px-6 py-3.5 font-semibold transition-colors hover:border-fg/40 hover:bg-surface-2"
      >
        <ArrowLeft className="transition-transform duration-200 group-hover:-translate-x-0.5" />
        Back home
      </Link>
    </section>
  );
}

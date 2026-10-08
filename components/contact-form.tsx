"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "@/components/icons";
import { HONEYPOT_FIELD, LIMITS, NEEDS, validateContact, type FieldErrors } from "@/lib/contact";

type Status = "idle" | "submitting" | "success" | "error";

const inputClass =
  "mt-2 block w-full rounded-xl border border-line-strong bg-bg px-4 py-3 text-fg placeholder:text-muted/60 transition-colors hover:border-fg/30 focus:border-accent focus:outline-none aria-[invalid=true]:border-red-400/80";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [serverError, setServerError] = useState("");
  const startedAt = useRef(0);
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fields = Object.fromEntries(new FormData(form)) as Record<string, string>;

    const { errors: clientErrors } = validateContact(fields);
    setErrors(clientErrors);
    setServerError("");
    if (Object.keys(clientErrors).length) {
      const first = Object.keys(clientErrors)[0];
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...fields, elapsedMs: Date.now() - startedAt.current }),
      });
      const body = (await res.json().catch(() => ({}))) as { errors?: FieldErrors; error?: string };
      if (res.ok) {
        form.reset();
        setStatus("success");
        return;
      }
      if (body.errors) setErrors(body.errors);
      setServerError(body.error ?? "Something went wrong. Please try again.");
      setStatus("error");
    } catch {
      setServerError("Couldn't reach the server. Check your connection and try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="flex flex-col items-start justify-center rounded-2xl border border-line bg-surface p-8 focus:outline-none md:p-10"
      >
        <span className="grid size-11 place-items-center rounded-full bg-accent/15 text-xl text-accent" aria-hidden>
          ✓
        </span>
        <h3 className="mt-6 font-display text-2xl font-semibold tracking-tight">Message sent. Thank you!</h3>
        <p className="mt-2 text-muted">I&apos;ll reply to the email you gave me, usually within a couple of days.</p>
        <button
          type="button"
          onClick={() => {
            startedAt.current = Date.now();
            setStatus("idle");
          }}
          className="mt-8 text-sm font-medium text-accent underline-offset-4 hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  const describedBy = (field: keyof FieldErrors) => (errors[field] ? `${field}-error` : undefined);

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      aria-labelledby="contact-title"
      className="relative rounded-2xl border border-line bg-surface p-6 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-sm font-medium">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            maxLength={LIMITS.name}
            aria-invalid={!!errors.name}
            aria-describedby={describedBy("name")}
            className={inputClass}
          />
          <FieldError id="name-error" message={errors.name} />
        </div>
        <div>
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            maxLength={LIMITS.email}
            aria-invalid={!!errors.email}
            aria-describedby={describedBy("email")}
            className={inputClass}
          />
          <FieldError id="email-error" message={errors.email} />
        </div>
      </div>

      <fieldset className="mt-6" aria-describedby={describedBy("need")}>
        <legend className="text-sm font-medium">What do you need?</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {NEEDS.map((n) => (
            <label
              key={n}
              className="cursor-pointer rounded-full border border-line-strong px-4 py-2 text-sm text-muted transition-colors select-none hover:border-fg/30 hover:text-fg has-checked:border-accent has-checked:bg-accent/10 has-checked:text-fg has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-accent"
            >
              <input type="radio" name="need" value={n} className="sr-only" />
              {n}
            </label>
          ))}
        </div>
        <FieldError id="need-error" message={errors.need} />
      </fieldset>

      <div className="mt-6">
        <label htmlFor="message" className="text-sm font-medium">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          maxLength={LIMITS.message}
          aria-invalid={!!errors.message}
          aria-describedby={describedBy("message")}
          placeholder="A few lines about the role, project or idea."
          className={`${inputClass} resize-y`}
        />
        <FieldError id="message-error" message={errors.message} />
      </div>

      {/* Honeypot: hidden from people and assistive tech, tempting to bots. */}
      <div aria-hidden className="absolute -left-[9999px] size-px overflow-hidden">
        <label htmlFor={HONEYPOT_FIELD}>Company</label>
        <input id={HONEYPOT_FIELD} name={HONEYPOT_FIELD} type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="mt-8 flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p role="alert" className="text-sm text-red-300">
          {serverError}
        </p>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 font-semibold text-on-accent transition-colors hover:bg-accent-soft disabled:cursor-wait disabled:opacity-70"
        >
          {status === "submitting" ? "Sending…" : "Send message"}
          <ArrowRight className="transition-transform duration-200 group-hover:translate-x-0.5" />
        </button>
      </div>
    </form>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 text-sm text-red-300">
      {message}
    </p>
  );
}

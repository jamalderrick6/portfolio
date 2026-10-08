import { ContactForm } from "@/components/contact-form";

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="border-t border-line py-24 md:py-32">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,36rem)] lg:gap-20">
          <div>
            <p className="eyebrow mb-4">
              <span className="text-accent">04</span> / Contact
            </p>
            <h2
              id="contact-title"
              className="font-display text-4xl font-semibold tracking-tight text-balance sm:text-5xl"
            >
              Let&apos;s talk.
            </h2>
            <div className="mt-6 max-w-md space-y-4 text-lg leading-relaxed text-muted text-pretty">
              <p>
                Hiring for a full-time role, need help with a project, or just
                want to say hi? Send a note and I&apos;ll get back to you.
              </p>
              <p className="font-mono text-sm">
                Based in Nairobi (UTC+3). Happy to work US hours.
              </p>
            </div>
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

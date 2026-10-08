// Shared between the contact form (client) and the route handler (server).

export const NEEDS = ["Full-time role", "Freelance project", "Just saying hi"] as const;
export type Need = (typeof NEEDS)[number];

export const LIMITS = {
  name: 100,
  email: 254,
  message: 5000,
  messageMin: 10,
} as const;

/** Name of the honeypot input. Humans never see it; bots tend to fill it. */
export const HONEYPOT_FIELD = "company";

export type ContactPayload = {
  name: string;
  email: string;
  need: Need;
  message: string;
};

export type FieldErrors = Partial<Record<keyof ContactPayload, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContact(input: Record<string, unknown>): {
  data?: ContactPayload;
  errors: FieldErrors;
} {
  const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");
  const name = str(input.name);
  const email = str(input.email);
  const need = str(input.need);
  const message = str(input.message);
  const errors: FieldErrors = {};

  if (!name) errors.name = "Please tell me your name.";
  else if (name.length > LIMITS.name) errors.name = `Keep it under ${LIMITS.name} characters.`;

  if (!email) errors.email = "I need an email to reply to.";
  else if (email.length > LIMITS.email || !EMAIL_RE.test(email)) errors.email = "That email doesn't look right.";

  if (!NEEDS.includes(need as Need)) errors.need = "Pick one of the options.";

  if (message.length < LIMITS.messageMin) errors.message = "A little more detail, please (10+ characters).";
  else if (message.length > LIMITS.message) errors.message = `Keep it under ${LIMITS.message} characters.`;

  if (Object.keys(errors).length) return { errors };
  return { data: { name, email, need: need as Need, message }, errors };
}

import {NextResponse} from "next/server";
import {CONTACT_EMAIL} from "@/lib/contact";

const FORM_DETAILS = {
  inquiry: {label: "General inquiry", subject: "New website inquiry"},
  quote: {label: "Quote request", subject: "New website quote request"},
  newsletter: {label: "Newsletter request", subject: "New website newsletter request"},
} as const;

type FormType = keyof typeof FORM_DETAILS;
type FormFields = Record<string, string>;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isEmail(value: string | undefined) {
  return Boolean(value && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));
}

function cleanFields(value: unknown): FormFields | null {
  if (!isRecord(value)) return null;
  const entries = Object.entries(value);
  if (!entries.length || entries.length > 64) return null;

  const fields: FormFields = {};
  for (const [key, rawValue] of entries) {
    if (typeof rawValue !== "string" || !key.trim() || key.length > 120 || rawValue.length > 5000) return null;
    fields[key.trim()] = rawValue.trim();
  }
  return fields;
}

function requesterEmail(fields: FormFields) {
  return fields["Email Address"] ?? fields["email-address"] ?? fields.email;
}

function labelFor(key: string) {
  return key.replace(/[-_]+/g, " ").replace(/\b\w/g, letter => letter.toUpperCase());
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({error: "Invalid form submission."}, {status: 400});
  }

  if (!isRecord(body)) {
    return NextResponse.json({error: "Invalid form submission."}, {status: 400});
  }

  const submittedType = typeof body.formType === "string" ? body.formType : "";
  if (!submittedType || !(submittedType in FORM_DETAILS)) {
    return NextResponse.json({error: "Invalid form submission."}, {status: 400});
  }

  const formType = submittedType as FormType;
  const fields = cleanFields(body.fields);
  if (!fields || fields.website) {
    return NextResponse.json({error: "Invalid form submission."}, {status: 400});
  }

  const email = requesterEmail(fields);
  if (!isEmail(email)) {
    return NextResponse.json({error: "A valid email address is required."}, {status: 400});
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("Form notification is not configured: RESEND_API_KEY is missing.");
    return NextResponse.json({error: "Form service is temporarily unavailable."}, {status: 503});
  }

  const details = FORM_DETAILS[formType];
  const content = Object.entries(fields)
    .filter(([key]) => key !== "website")
    .map(([key, value]) => `${labelFor(key)}: ${value || "—"}`)
    .join("\n");
  const sentAt = new Date().toISOString();

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json"},
      body: JSON.stringify({
        from: process.env.RESEND_FROM_EMAIL ?? `Website Forms <${CONTACT_EMAIL}>`,
        to: [CONTACT_EMAIL],
        reply_to: email,
        subject: `[QZDXRV] ${details.subject}`,
        text: `A new ${details.label.toLowerCase()} was received.\n\nSubmitted: ${sentAt}\n\n${content}`,
      }),
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      console.error("Form notification provider rejected the request.", {status: response.status, formType});
      return NextResponse.json({error: "Form service is temporarily unavailable."}, {status: 502});
    }
  } catch (error) {
    console.error("Form notification could not be sent.", {formType, error});
    return NextResponse.json({error: "Form service is temporarily unavailable."}, {status: 502});
  }

  return NextResponse.json({ok: true});
}

export type WebsiteFormType = "inquiry" | "quote" | "newsletter";

export async function submitWebsiteForm(formType: WebsiteFormType, form: HTMLFormElement) {
  const fields = Object.fromEntries(
    Array.from(new FormData(form).entries()).filter((entry): entry is [string, string] => typeof entry[1] === "string"),
  );
  const response = await fetch("/api/forms", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({formType, fields}),
  });

  if (!response.ok) throw new Error("Unable to send form");
}

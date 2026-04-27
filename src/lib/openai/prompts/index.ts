export type Locale = "id" | "en";

const sectionHeaders: Record<Locale, { task: string; context: string; format: string; constraints: string }> = {
  id: { task: "Tugas", context: "Konteks", format: "Format Output", constraints: "Batasan" },
  en: { task: "Task", context: "Context", format: "Output Format", constraints: "Constraints" },
};

export function buildPTCFPrompt(context: {
  persona: string;
  task: string;
  context_data: string;
  format: string;
  constraints?: string;
}, locale: Locale = "id"): string {
  const h = sectionHeaders[locale];
  let prompt = `## Persona\n${context.persona}\n\n`;
  prompt += `## ${h.task}\n${context.task}\n\n`;
  prompt += `## ${h.context}\n${context.context_data}\n\n`;
  prompt += `## ${h.format}\n${context.format}\n`;
  if (context.constraints) {
    prompt += `\n## ${h.constraints}\n${context.constraints}\n`;
  }
  return prompt;
}

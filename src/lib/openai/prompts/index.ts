export function buildPTCFPrompt(context: {
  persona: string;
  task: string;
  context_data: string;
  format: string;
  constraints?: string;
}): string {
  let prompt = `## Persona\n${context.persona}\n\n`;
  prompt += `## Tugas\n${context.task}\n\n`;
  prompt += `## Konteks\n${context.context_data}\n\n`;
  prompt += `## Format Output\n${context.format}\n`;
  if (context.constraints) {
    prompt += `\n## Batasan\n${context.constraints}\n`;
  }
  return prompt;
}

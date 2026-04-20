import { z } from "zod";

export const brandKitSchema = z.object({
  primary_color: z.string().regex(/^#[0-9a-fA-F]{6}$/, "Harus berupa hex color"),
  secondary_color: z.string().regex(/^#[0-9a-fA-F]{6}$/, "Harus berupa hex color"),
  accent_color: z.string().regex(/^#[0-9a-fA-F]{6}$/, "Harus berupa hex color"),
  typography: z.string().min(1, "Typography wajib diisi"),
  tone_of_voice: z.string().min(10, "Tone of voice minimal 10 karakter"),
  tagline: z.string().min(3, "Tagline minimal 3 karakter"),
  mission: z.string().min(10, "Misi minimal 10 karakter"),
  visual_style: z.string().min(3, "Gaya visual minimal 3 karakter"),
  do_list: z.array(z.string()).min(2, "Minimal 2 panduan"),
  dont_list: z.array(z.string()).min(2, "Minimal 2 larangan"),
});

export type BrandKitOutput = z.infer<typeof brandKitSchema>;

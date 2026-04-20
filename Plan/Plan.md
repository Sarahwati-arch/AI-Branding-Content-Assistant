 AI Branding & Content Assistant - Implementation Plan                                                                                                                         │
│                                                                                                                                                                               │
│ Overview                                                                                                                                                                      │
│                                                                                                                                                                               │
│ Aplikasi web all-in-one berbasis AI untuk UMKM dan kreator lokal guna membangun identitas brand, memproduksi konten, dan mengoptimalkan strategi pemasaran. Dibuat untuk      │
│ Hackathon Digdaya 2026.                                                                                                                                                       │
│                                                                                                                                                                               │
│ Tech Stack                                                                                                                                                                    │
│                                                                                                                                                                               │
│ - Frontend: Next.js 15 (App Router) + TypeScript + Tailwind CSS                                                                                                               │
│ - AI: OpenAI GPT-4/GPT-4o-mini (teks) + DALL-E 3 (visual/logo)                                                                                                                │
│ - Backend/DB: PostgreSQL via Supabase (Auth + Database + Storage)                                                                                                             │
│ - Charts: Recharts                                                                                                                                                            │
│ - State: Zustand                                                                                                                                                              │
│ - Icons: Lucide React                                                                                                                                                         │
│ - Date: date-fns                                                                                                                                                              │
│ - Deploy: Vercel                                                                                                                                                              │
│                                                                                                                                                                               │
│ ---                                                                                                                                                                           │
│ 3 Pillar Features                                                                                                                                                             │
│                                                                                                                                                                               │
│ 1. AI Branding Generator                                                                                                                                                      │
│                                                                                                                                                                               │
│ - Generate logo (DALL-E 3), palet warna, tagline, tone of voice                                                                                                               │
│ - Brand guidelines lengkap (tipografi, do's/don'ts, visual rules)                                                                                                             │
│ - Brand profile form -> AI generation -> review/edit -> save                                                                                                                  │
│                                                                                                                                                                               │
│ 2. AI Content Generator                                                                                                                                                       │
│                                                                                                                                                                               │
│ - Caption/copywriting generation per platform (Instagram, Facebook, TikTok)                                                                                                   │
│ - Hashtag generation                                                                                                                                                          │
│ - Visual asset generation (DALL-E 3)                                                                                                                                          │
│ - Campaign ideas generator (7 hari konten ideas)                                                                                                                              │
│ - Multi-platform format support                                                                                                                                               │
│                                                                                                                                                                               │
│ 3. Smart Scheduler & Analytics                                                                                                                                                │
│                                                                                                                                                                               │
│ - Content calendar (monthly/weekly view)                                                                                                                                      │
│ - Schedule content untuk publishing                                                                                                                                           │
│ - Manual analytics data entry (MVP - tanpa API media sosial langsung)                                                                                                         │
│ - Dashboard analytics dengan charts (engagement, best times, platform breakdown)                                                                                              │
│ - AI recommendations berbasis data performa                                                                                                                                   │
│                                                                                                                                                                               │
│ ---                                                                                                                                                                           │
│ Database Schema (Supabase - 6 Tables)                                                                                                                                         │
│                                                                                                                                                                               │
│ 1. profiles - User profiles                                                                                                                                                   │
│                                                                                                                                                                               │
│ - id (UUID, FK to auth.users), email, full_name, avatar_url, onboarding_completed, preferred_language                                                                         │
│                                                                                                                                                                               │
│ 2. brand_profiles - Brand identities                                                                                                                                          │
│                                                                                                                                                                               │
│ - id, user_id (FK), brand_name, product_category, target_audience, target_audience_age_range, target_audience_location, visual_style_preference, brand_story, logo_url,       │
│ primary_color, secondary_color, accent_color, tagline, brand_tone                                                                                                             │
│                                                                                                                                                                               │
│ 3. brand_guidelines - Generated brand guidelines                                                                                                                              │
│                                                                                                                                                                               │
│ - id, brand_id (FK), typography_heading, typography_body, tone_of_voice, visual_style_rules (JSONB), do_and_dont (JSONB), color_usage_rules                                   │
│                                                                                                                                                                               │
│ 4. content - Generated content                                                                                                                                                │
│                                                                                                                                                                               │
│ - id, brand_id (FK), user_id (FK), title, caption, hashtags (TEXT[]), platform (ENUM), content_type (ENUM), visual_prompt, visual_url, status (ENUM:                          │
│ draft/generated/approved/scheduled/published/archived), target_date, ai_model_used, generation_metadata (JSONB)                                                               │
│                                                                                                                                                                               │
│ 5. calendar_events - Scheduled posts                                                                                                                                          │
│                                                                                                                                                                               │
│ - id, content_id (FK), brand_id (FK), user_id (FK), scheduled_at, platform, status (ENUM: pending/scheduled/publishing/published/failed), published_at, external_post_id      │
│                                                                                                                                                                               │
│ 6. analytics - Performance metrics                                                                                                                                            │
│                                                                                                                                                                               │
│ - id, content_id (FK), calendar_event_id (FK), brand_id (FK), user_id (FK), platform, impressions, reach, likes, comments, shares, saves, clicks, engagement_rate,            │
│ recorded_date                                                                                                                                                                 │
│                                                                                                                                                                               │
│ Storage Buckets                                                                                                                                                               │
│                                                                                                                                                                               │
│ - logos - Brand logos (public)                                                                                                                                                │
│ - visuals - Generated visual assets (public)                                                                                                                                  │
│                                                                                                                                                                               │
│ RLS (Row Level Security)                                                                                                                                                      │
│                                                                                                                                                                               │
│ - Semua table di-protect dengan RLS, hanya data milik user yang bisa diakses                                                                                                  │
│                                                                                                                                                                               │
│ ---                                                                                                                                                                           │
│ Folder Structure                                                                                                                                                              │
│                                                                                                                                                                               │
│ src/                                                                                                                                                                          │
│ ├── app/                                                                                                                                                                      │
│ │   ├── layout.tsx                    # Root layout (fonts, providers)                                                                                                        │
│ │   ├── page.tsx                      # Landing page                                                                                                                          │
│ │   ├── (auth)/                       # Auth route group                                                                                                                      │
│ │   │   ├── layout.tsx                # Centered card layout                                                                                                                  │
│ │   │   ├── login/page.tsx                                                                                                                                                    │
│ │   │   └── register/page.tsx                                                                                                                                                 │
│ │   ├── onboarding/page.tsx           # First-time brand setup wizard                                                                                                         │
│ │   ├── (dashboard)/                  # Dashboard route group                                                                                                                 │
│ │   │   ├── layout.tsx                # Sidebar + header layout                                                                                                               │
│ │   │   ├── dashboard/page.tsx        # Overview                                                                                                                              │
│ │   │   ├── branding/                                                                                                                                                         │
│ │   │   │   ├── page.tsx              # Brand list                                                                                                                            │
│ │   │   │   ├── new/page.tsx          # Create brand                                                                                                                          │
│ │   │   │   └── [id]/                                                                                                                                                         │
│ │   │   │       ├── page.tsx          # Brand detail                                                                                                                          │
│ │   │   │       └── edit/page.tsx     # Edit brand                                                                                                                            │
│ │   │   ├── content/                                                                                                                                                          │
│ │   │   │   ├── page.tsx              # Content list                                                                                                                          │
│ │   │   │   ├── generate/page.tsx     # Generate content                                                                                                                      │
│ │   │   │   └── [id]/page.tsx         # Content detail                                                                                                                        │
│ │   │   ├── calendar/page.tsx         # Content calendar                                                                                                                      │
│ │   │   ├── analytics/page.tsx        # Analytics dashboard                                                                                                                   │
│ │   │   └── settings/page.tsx         # User settings                                                                                                                         │
│ │   └── api/                                                                                                                                                                  │
│ │       ├── ai/                                                                                                                                                               │
│ │       │   ├── generate-brand/route.ts                                                                                                                                       │
│ │       │   ├── generate-logo/route.ts                                                                                                                                        │
│ │       │   ├── generate-content/route.ts                                                                                                                                     │
│ │       │   ├── generate-caption/route.ts                                                                                                                                     │
│ │       │   ├── generate-hashtags/route.ts                                                                                                                                    │
│ │       │   ├── generate-visual/route.ts                                                                                                                                      │
│ │       │   └── recommend/route.ts                                                                                                                                            │
│ │       ├── brands/route.ts + [id]/route.ts                                                                                                                                   │
│ │       ├── content/route.ts + [id]/route.ts                                                                                                                                  │
│ │       ├── calendar/route.ts + [id]/route.ts                                                                                                                                 │
│ │       └── analytics/route.ts + [contentId]/route.ts                                                                                                                         │
│ ├── components/                                                                                                                                                               │
│ │   ├── ui/                           # Primitives (button, input, card, dll)                                                                                                 │
│ │   ├── layout/                       # sidebar, header, mobile-nav                                                                                                           │
│ │   ├── branding/                     # brand-profile-form, brand-kit-display, dll                                                                                            │
│ │   ├── content/                      # content-generation-form, content-card, dll                                                                                            │
│ │   ├── calendar/                     # content-calendar, schedule-modal                                                                                                      │
│ │   └── analytics/                    # metrics-overview, engagement-chart, dll                                                                                               │
│ ├── lib/                                                                                                                                                                      │
│ │   ├── supabase/                     # client.ts, server.ts, middleware.ts, types.ts                                                                                         │
│ │   ├── openai/                                                                                                                                                               │
│ │   │   ├── client.ts                 # OpenAI instance                                                                                                                       │
│ │   │   ├── prompts/                  # PTCF framework prompts                                                                                                                │
│ │   │   │   ├── branding.ts, content.ts, caption.ts, hashtag.ts, strategy.ts                                                                                                  │
│ │   │   │   └── index.ts             # Prompt builder utility                                                                                                                 │
│ │   │   └── schemas/                  # Zod validation schemas                                                                                                                │
│ │   ├── utils.ts                                                                                                                                                              │
│ │   └── constants.ts                  # Product categories, platforms, visual styles                                                                                          │
│ ├── hooks/                            # use-brand, use-content, use-calendar, use-analytics                                                                                   │
│ ├── store/                            # Zustand stores                                                                                                                        │
│ └── types/                            # TypeScript type definitions                                                                                                           │
│                                                                                                                                                                               │
│ ---                                                                                                                                                                           │
│ Implementation Sequence                                                                                                                                                       │
│                                                                                                                                                                               │
│ Phase 1: Foundation                                                                                                                                                           │
│                                                                                                                                                                               │
│ 1. Initialize Next.js project (npx create-next-app@latest)                                                                                                                    │
│ 2. Install dependencies: openai @supabase/supabase-js @supabase/ssr recharts date-fns lucide-react zustand                                                                    │
│ 3. Set up .env.local (Supabase URL/Key, OpenAI API Key)                                                                                                                       │
│ 4. Configure next.config.ts (image remote patterns)                                                                                                                           │
│ 5. Configure tailwind.config.ts (fonts, colors)                                                                                                                               │
│ 6. Create Supabase project + run all 6 migrations                                                                                                                             │
│ 7. Create Supabase client files (browser, server, middleware)                                                                                                                 │
│ 8. Set up auth middleware (middleware.ts)                                                                                                                                     │
│ 9. Create type definitions (src/types/)                                                                                                                                       │
│ 10. Create constants file                                                                                                                                                     │
│ 11. Build root layout + auth layout                                                                                                                                           │
│ 12. Build login + register pages                                                                                                                                              │
│                                                                                                                                                                               │
│ Phase 2: Dashboard Shell + Branding Generator                                                                                                                                 │
│                                                                                                                                                                               │
│ 1. Build UI primitives (Button, Input, Card, Select, Textarea, Badge, Skeleton)                                                                                               │
│ 2. Build dashboard layout (Sidebar + Header)                                                                                                                                  │
│ 3. Create OpenAI client + PTCF prompt templates                                                                                                                               │
│ 4. Build brand profile form + brand creation page                                                                                                                             │
│ 5. Build /api/ai/generate-brand route (GPT-4 -> brand kit JSON)                                                                                                               │
│ 6. Build /api/ai/generate-logo route (DALL-E 3 -> logo image)                                                                                                                 │
│ 7. Build brand kit display components                                                                                                                                         │
│ 8. Build /api/brands CRUD routes                                                                                                                                              │
│ 9. Build brand list + detail pages                                                                                                                                            │
│ 10. Build onboarding wizard                                                                                                                                                   │
│                                                                                                                                                                               │
│ Phase 3: Content Generator                                                                                                                                                    │
│                                                                                                                                                                               │
│ 1. Build content/caption/hashtag prompt templates                                                                                                                             │
│ 2. Build /api/ai/generate-content route                                                                                                                                       │
│ 3. Build /api/ai/generate-visual route (DALL-E 3, platform-specific sizes)                                                                                                    │
│ 4. Build content generation form + page                                                                                                                                       │
│ 5. Build content card + list page                                                                                                                                             │
│ 6. Build /api/content CRUD routes                                                                                                                                             │
│ 7. Build content detail/edit page                                                                                                                                             │
│                                                                                                                                                                               │
│ Phase 4: Calendar + Analytics                                                                                                                                                 │
│                                                                                                                                                                               │
│ 1. Build content calendar component (monthly grid)                                                                                                                            │
│ 2. Build schedule modal                                                                                                                                                       │
│ 3. Build /api/calendar CRUD routes                                                                                                                                            │
│ 4. Build analytics entry form (manual metrics input)                                                                                                                          │
│ 5. Build /api/analytics routes                                                                                                                                                │
│ 6. Build analytics dashboard with Recharts (engagement chart, platform breakdown, best times)                                                                                 │
│ 7. Build /api/ai/recommend route (AI recommendations)                                                                                                                         │
│ 8. Build AI recommendations component                                                                                                                                         │
│                                                                                                                                                                               │
│ Phase 5: Polish + Landing Page                                                                                                                                                │
│                                                                                                                                                                               │
│ 1. Build landing page (hero, features, CTA)                                                                                                                                   │
│ 2. Add loading states, error handling, toast notifications                                                                                                                    │
│ 3. Polish responsive design (mobile)                                                                                                                                          │
│ 4. Seed demo data                                                                                                                                                             │
│ 5. Deploy to Vercel + configure production environment                                                                                                                        │
│                                                                                                                                                                               │
│ ---                                                                                                                                                                           │
│ Key Technical Details                                                                                                                                                         │
│                                                                                                                                                                               │
│ Prompt Engineering (PTCF Framework)                                                                                                                                           │
│                                                                                                                                                                               │
│ Setiap prompt menggunakan struktur:                                                                                                                                           │
│ - Persona: Siapa AI berperan sebagai (contoh: "Brand strategist profesional 15 tahun di industri kreatif Indonesia")                                                          │
│ - Task: Apa yang harus dilakukan                                                                                                                                              │
│ - Context: Informasi latar belakang (brand profile, target audience, dll)                                                                                                     │
│ - Format: Format output yang diharapkan (JSON dengan struktur tertentu)                                                                                                       │
│                                                                                                                                                                               │
│ AI API Usage Strategy                                                                                                                                                         │
│                                                                                                                                                                               │
│ - GPT-4: Brand kit generation (complex, strategic output)                                                                                                                     │
│ - GPT-4o-mini: Caption, hashtag, content ideas (faster, cheaper)                                                                                                              │
│ - DALL-E 3: Logo + visual assets                                                                                                                                              │
│ - response_format: { type: 'json_object' } untuk memastikan output JSON valid                                                                                                 │
│                                                                                                                                                                               │
│ Platform-Specific DALL-E Sizes                                                                                                                                                │
│                                                                                                                                                                               │
│ - Instagram Post: 1024x1024                                                                                                                                                   │
│ - Instagram Story/Reel: 1024x1792                                                                                                                                             │
│ - Facebook Post: 1024x1024                                                                                                                                                    │
│ - TikTok: 1024x1792                                                                                                                                                           │
│                                                                                                                                                                               │
│ Auth Flow                                                                                                                                                                     │
│                                                                                                                                                                               │
│ - Supabase Auth (email + password)                                                                                                                                            │
│ - Middleware refreshes session on every request                                                                                                                               │
│ - RLS policies ensure data isolation per user                                                                                                                                 │
│ - Auto-create profile on signup via database trigger                                                                                                                          │
│                                                                                                                                                                               │
│ ---                                                                                                                                                                           │
│ Verification / Testing                                                                                                                                                        │
│                                                                                                                                                                               │
│ Manual Testing Checklist                                                                                                                                                      │
│                                                                                                                                                                               │
│ - Register -> Login -> Dashboard loads                                                                                                                                        │
│ - Create brand profile -> AI generates brand kit (colors, tagline, tone)                                                                                                      │
│ - Logo generated via DALL-E and displayed                                                                                                                                     │
│ - Brand kit saved to database and viewable                                                                                                                                    │
│ - Generate content for each platform (IG, FB, TikTok)                                                                                                                         │
│ - Visual asset generated per platform                                                                                                                                         │
│ - Content saved, editable, deletable                                                                                                                                          │
│ - Schedule content on calendar                                                                                                                                                │
│ - Enter analytics data manually                                                                                                                                               │
│ - Charts render correctly on analytics dashboard                                                                                                                              │
│ - AI recommendations appear based on analytics                                                                                                                                │
│ - Responsive on mobile viewport                                                                                                                                               │
│ - All text in Indonesian                                                                                                                                                      │
│                                                                                                                                                                               │
│ Critical Files to Verify                                                                                                                                                      │
│                                                                                                                                                                               │
│ - src/lib/supabase/server.ts - Server client for all API routes                                                                                                               │
│ - src/lib/openai/prompts/index.ts - PTCF prompt builder                                                                                                                       │
│ - src/app/api/ai/generate-brand/route.ts - First AI route (pattern setter)                                                                                                    │
│ - src/components/branding/brand-kit-display.tsx - Main showcase component                                                                                                     │
│ - src/components/calendar/content-calendar.tsx - Most complex UI component                    
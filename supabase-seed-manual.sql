-- ============================================================
-- AI Branding & Content Assistant - SEED DATA LENGKAP
-- ============================================================
-- Tinggal copy-paste semua, lalu Run di Supabase SQL Editor
-- Pastikan supabase-schema.sql sudah dijalankan sebelumnya
--
-- Akun demo:
--   Email    : demo@brandai.com
--   Password : demo123456
-- ============================================================


-- ============================================================
-- STEP 1: Buat user demo
-- ============================================================
-- auth.users dibuat oleh Supabase auth schema
-- Password "demo123456" di-hash pakai bcrypt

INSERT INTO auth.users (
  id,
  instance_id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token,
  banned_until,
  reauthentication_token
) VALUES (
  'd0000000-0000-0000-0000-000000000001',
  '00000000-0000-0000-0000-000000000000',
  'authenticated',
  'authenticated',
  'demo@brandai.com',
  crypt('demo123456', gen_salt('bf')),
  NOW(),
  '{"provider":"email","providers":["email"]}',
  '{"full_name":"Demo User"}',
  NOW(),
  NOW(),
  '',
  '',
  '',
  '',
  NULL,
  ''
);


-- STEP 2: Profile (auto-created oleh trigger, tapi insert manual buat jaga-jaga)
-- ============================================================
INSERT INTO profiles (id, email, full_name, avatar_url)
VALUES ('d0000000-0000-0000-0000-000000000001', 'demo@brandai.com', 'Demo User', NULL)
ON CONFLICT (id) DO UPDATE SET full_name = 'Demo User', email = 'demo@brandai.com';


-- ============================================================
-- STEP 3: Brands (3 brand)
-- ============================================================
INSERT INTO brands (id, user_id, brand_name, industry, description, target_audience, unique_value, logo_url) VALUES
(
  'b0000001-0000-0000-0000-000000000001',
  'd0000000-0000-0000-0000-000000000001',
  'Kopi Nusantara',
  'Kuliner & Restoran',
  'Kedai kopi premium yang menghadirkan cita rasa kopi asli Nusantara dengan bahan-bahan lokal berkualitas tinggi.',
  'Pecinta kopi usia 22-40 tahun, urban, menghargai kualitas dan keaslian produk lokal',
  '100% biji kopi dari petani lokal Indonesia dengan proses roasting artisan',
  NULL
),
(
  'b0000002-0000-0000-0000-000000000002',
  'd0000000-0000-0000-0000-000000000001',
  'Glow Naturals',
  'Kecantikan & Perawatan',
  'Brand skincare natural yang menggunakan bahan-bahan alami Indonesia untuk perawatan kulit sehari-hari.',
  'Wanita 20-35 tahun, aware terhadap bahan alami, aktif di media sosial',
  'Formulasi 100% bahan alami Indonesia tanpa bahan kimia berbahaya',
  NULL
),
(
  'b0000003-0000-0000-0000-000000000003',
  'd0000000-0000-0000-0000-000000000001',
  'FitZone.id',
  'Kesehatan & Fitness',
  'Platform fitness online yang menyediakan program latihan personal dan meal plan untuk gaya hidup sehat.',
  'Pria dan wanita 18-35 tahun, ingin hidup sehat, nyaman latihan di rumah',
  'AI-powered workout plan yang menyesuaikan dengan kemampuan dan goal masing-masing user',
  NULL
);


-- ============================================================
-- STEP 4: Brand Guidelines (1 per brand)
-- ============================================================
INSERT INTO brand_guidelines (brand_id, primary_color, secondary_color, accent_color, typography, tone_of_voice, tagline, mission, visual_style, do_list, dont_list) VALUES

(
  'b0000001-0000-0000-0000-000000000001',
  '#8B4513', '#D2691E', '#F5DEB3',
  'Playfair Display',
  'Hangat, bersahabat, dan mengundang. Seperti ngobrol dengan teman lama di kedai kopi favorit. Santai tapi tetap profesional.',
  'Secangkir kisah, setiap tegukan',
  'Mengangkat cita rasa kopi Nusantara ke panggung dunia dengan menghargai setiap tetes keringat petani lokal.',
  'Rustic and cozy dengan sentuhan tradisional Indonesia',
  '["Gunakan foto close-up kopi yang estetik","Sertakan cerita di balik setiap biji kopi","Tampilkan kegiatan roasting dan brewing","Gunakan kalimat yang mengundang untuk mencoba"]'::jsonb,
  '["Jangan gunakan gambar stok generik","Hindari bahasa terlalu formal kaku","Jangan posting tanpa konteks cerita","Hindari perbandingan langsung dengan kompetitor"]'::jsonb
),
(
  'b0000002-0000-0000-0000-000000000002',
  '#2D6A4F', '#52B788', '#FEC89A',
  'Poppins',
  'Inspiratif, empowering, dan edukatif. Mengajak audience untuk mencintai kulitnya sendiri sambil memberi pengetahuan tentang bahan alami.',
  'Cantik Alami, Percaya Diri Tanpa Batas',
  'Membantu setiap wanita Indonesia merasakan kecantikan alami melalui produk yang aman, efektif, dan ramah lingkungan.',
  'Clean, fresh, dan minimalis dengan elemen nature',
  '["Tampilkan before-after yang realistis","Bagikan tips skincare edukatif","Gunakan foto produk dengan background natural","Kolaborasi dengan beauty enthusiast lokal"]'::jsonb,
  '["Jangan edit foto berlebihan","Hindari klaim berlebihan tentang hasil produk","Jangan gunakan model dengan filter berat","Hindari body shaming atau standar kecantikan toxic"]'::jsonb
),
(
  'b0000003-0000-0000-0000-000000000003',
  '#1E3A5F', '#4ECDC4', '#FFE66D',
  'Montserrat',
  'Energik, memotivasi, dan supportive. Seperti personal trainer yang selalu mendukung dan mendorong Anda keluar dari comfort zone.',
  'Transformasi Dimulai dari Hari Ini',
  'Membuat gaya hidup sehat mudah diakses oleh semua orang Indonesia melalui teknologi dan komunitas yang supportif.',
  'Bold, sporty, dan modern dengan energi tinggi',
  '["Gunakan foto latihan yang relatable","Bagikan progress real dari member","Posting tips olahraga dan nutrisi praktis","Buat konten yang memotivasi dan supportive"]'::jsonb,
  '["Jangan gunakan foto model fitness yang intimidating","Hindari diet culture atau toxic positivity","Jangan klaim hasil instan","Hindari bahasa yang menyalahkan"]'::jsonb
);


-- ============================================================
-- STEP 5: Contents (8 konten)
-- ============================================================
INSERT INTO contents (id, user_id, brand_id, title, type, platform, caption, hashtags, visual_url, status, scheduled_at, published_at) VALUES

-- 1. Kopi Nusantara / IG Post / published
(
  'c0000001-0000-0000-0000-000000000001',
  'd0000000-0000-0000-0000-000000000001',
  'b0000001-0000-0000-0000-000000000001',
  'Kenali Kopi Gayo - Permata dari Aceh',
  'post', 'instagram',
  'Pernah dengar Kopi Gayo?

Bijinya tumbuh di dataran tinggi Aceh dengan ketinggian 1.200 mdpl. Proses wet-hulling khas Indonesia memberikan rasa full body dengan sentuhan earthy dan herbal yang unik.

Kami bekerja langsung dengan Pak Rahman dan 50 petani lainnya di Takengon untuk memastikan setiap biji yang sampai ke cangkir Anda adalah yang terbaik.

Yuk, cobai Kopi Gayo kami dan rasakan cerita di setiap tegukan!

#KopiNusantara #KopiGayo #KopiLokal #SpecialtyCoffee #PetaniKopi #KedaiKopi #IndonesianCoffee',
  '["KopiNusantara","KopiGayo","KopiLokal","SpecialtyCoffee","PetaniKopi","KedaiKopi","IndonesianCoffee"]'::jsonb,
  NULL, 'published', NULL, NOW() - INTERVAL '7 days'
),

-- 2. Kopi Nusantara / IG Reel / published
(
  'c0000002-0000-0000-0000-000000000002',
  'd0000000-0000-0000-0000-000000000001',
  'b0000001-0000-0000-0000-000000000001',
  'Behind the Scene - Proses Roasting',
  'reel', 'instagram',
  'Kalian tahu nggak proses roasting kopi itu butuh presisi tinggi?

Di sini kami roast batch kecil untuk menjaga kualitas. Suhu, waktu, dan teknik semuanya dihitung matang.

Tonton full videonya dan lihat bagaimana biji kopi hijau berubah jadi coklat keemasan yang harum!',
  '["RoastingProcess","BehindTheScene","KopiNusantara","SpecialtyCoffee","CoffeeRoasting"]'::jsonb,
  NULL, 'published', NULL, NOW() - INTERVAL '5 days'
),

-- 3. Kopi Nusantara / IG Story / scheduled
(
  'c0000003-0000-0000-0000-000000000003',
  'd0000000-0000-0000-0000-000000000001',
  'b0000001-0000-0000-0000-000000000001',
  'Menu Baru - Affogato Coklat Gayo',
  'story', 'instagram',
  'MENU BARU!

Affogato dengan es krim coklat premium + shot Kopi Gayo single origin.

Cumanya weekend ini aja ya! Buruan dateng sebelum habis!',
  '["MenuBaru","Affogato","KopiNusantara","KopiGayo","WeekendVibes"]'::jsonb,
  NULL, 'scheduled', NOW() + INTERVAL '2 days', NULL
),

-- 4. Glow Naturals / IG Carousel / published
(
  'c0000004-0000-0000-0000-000000000004',
  'd0000000-0000-0000-0000-000000000001',
  'b0000002-0000-0000-0000-000000000002',
  '5 Bahan Alami untuk Kulit Bercahaya',
  'carousel', 'instagram',
  'Skincare nggak harus mahal!

Slide 1: Aloe Vera - Melembapkan dan menenangkan
Slide 2: Tea Tree Oil - Anti-bakteri alami
Slide 3: Rose Water - Menyegarkan dan menyeimbangkan pH
Slide 4: Jojoba Oil - Melembapkan tanpa menyumbat pori
Slide 5: Green Tea - Antioksidan kuat untuk melindungi kulit

Semua bahan ini ada di produk kami! Link di bio ya',
  '["SkincareAlami","BahanNatural","GlowNaturals","TipsKecantikan","SkincareIndonesia","BeautyTips"]'::jsonb,
  NULL, 'published', NULL, NOW() - INTERVAL '6 days'
),

-- 5. Glow Naturals / TikTok Video / published
(
  'c0000005-0000-0000-0000-000000000005',
  'd0000000-0000-0000-0000-000000000001',
  'b0000002-0000-0000-0000-000000000002',
  'Morning Skincare Routine',
  'video', 'tiktok',
  'Morning routine ku yang simple tapi bikin kulit glowing sepanjang hari!

1. Cleanser
2. Toner
3. Serum
4. Moisturizer
5. Sunscreen (JANGAN SKIP INI!)

Produk yang aku pakai semuanya natural dan aman untuk kulit sensitif. Cek bio ya!',
  '["MorningRoutine","SkincareRoutine","GlowNaturals","SkincareTikTok","BeautyRoutine"]'::jsonb,
  NULL, 'published', NULL, NOW() - INTERVAL '4 days'
),

-- 6. Glow Naturals / FB Post / generated
(
  'c0000006-0000-0000-0000-000000000006',
  'd0000000-0000-0000-0000-000000000001',
  'b0000002-0000-0000-0000-000000000002',
  'Review Serum Vitamin C Glow Naturals',
  'post', 'facebook',
  'Halo Beauties!

Mau share pengalaman pakai Serum Vitamin C dari Glow Naturals selama 2 minggu:

Hari 1-3: Tekstur ringan, cepat menyerap
Hari 4-7: Kulit terasa lebih halus
Hari 8-14: Kulit tampak lebih cerah dan merata

Yang suka:
- 100% bahan alami
- Nggak lengket
- Cocok untuk kulit sensitif

Overall 9/10! Recommended banget!',
  '["ReviewSkincare","SerumVitaminC","GlowNaturals","SkincareReview","ProdukLokal"]'::jsonb,
  NULL, 'generated', NULL, NULL
),

-- 7. FitZone.id / YouTube Video / published
(
  'c0000007-0000-0000-0000-000000000007',
  'd0000000-0000-0000-0000-000000000001',
  'b0000003-0000-0000-0000-000000000003',
  'Workout 15 Menit di Rumah - Full Body',
  'video', 'youtube',
  'Nggak punya waktu ke gym? Nggak masalah!

Workout full body 15 menit yang bisa kamu lakukan di rumah tanpa alat.

0:00 - Warm Up
3:00 - Upper Body
7:00 - Core
11:00 - Lower Body
14:00 - Cool Down

Jangan lupa like dan subscribe untuk workout rutin lainnya!',
  '["HomeWorkout","FullBodyWorkout","FitZone","OlahragaRumah","WorkoutPemula","15MenitWorkout"]'::jsonb,
  NULL, 'published', NULL, NOW() - INTERVAL '3 days'
),

-- 8. FitZone.id / IG Carousel / published
(
  'c0000008-0000-0000-0000-000000000008',
  'd0000000-0000-0000-0000-000000000001',
  'b0000003-0000-0000-0000-000000000003',
  'Meal Prep Mingguan untuk Diet Sehat',
  'carousel', 'instagram',
  'Meal prep nggak sesulit yang kamu bayangkan!

Swipe untuk lihat menu meal prep 5 hari:

Hari 1: Chicken Teriyaki Bowl (450 kal)
Hari 2: Tuna Salad Wrap (380 kal)
Hari 3: Nasi Merah Ayam Bakar (500 kal)
Hari 4: Smoothie Bowl Protein (350 kal)
Hari 5: Salmon Quinoa Bowl (480 kal)

Save postingan ini untuk nanti!',
  '["MealPrep","DietSehat","FitZone","HealthyEating","MealPrepIndonesia","MakanSehat"]'::jsonb,
  NULL, 'published', NULL, NOW() - INTERVAL '2 days'
);


-- ============================================================
-- STEP 6: Calendar Events (5 event)
-- ============================================================
INSERT INTO calendar_events (user_id, content_id, title, description, platform, scheduled_at, status) VALUES

(
  'd0000000-0000-0000-0000-000000000001',
  'c0000003-0000-0000-0000-000000000003',
  'Posting Story Menu Baru Affogato',
  'Story IG menampilkan menu baru Affogato Coklat Gayo',
  'instagram', NOW() + INTERVAL '2 days', 'scheduled'
),
(
  'd0000000-0000-0000-0000-000000000001', NULL,
  'Konten Tips Memilih Biji Kopi',
  'Carousel tips cara memilih biji kopi yang tepat sesuai selera',
  'instagram', NOW() + INTERVAL '4 days', 'draft'
),
(
  'd0000000-0000-0000-0000-000000000001', NULL,
  'Tutorial Skincare Malam',
  'Video reel tutorial night skincare routine dengan produk Glow Naturals',
  'tiktok', NOW() + INTERVAL '3 days', 'scheduled'
),
(
  'd0000000-0000-0000-0000-000000000001', NULL,
  'Challenge 30 Hari Fitness',
  'Launch konten challenge 30 hari fitness di semua platform',
  'instagram', NOW() + INTERVAL '7 days', 'draft'
),
(
  'd0000000-0000-0000-0000-000000000001', NULL,
  'Testimoni Member FitZone',
  'Video testimoni member yang sudah berhasil transformasi',
  'youtube', NOW() + INTERVAL '10 days', 'draft'
);


-- ============================================================
-- STEP 7: Analytics (12 data points)
-- ============================================================

-- Kenali Kopi Gayo (c0000001) - 3 hari data
INSERT INTO analytics (user_id, content_id, platform, impressions, reach, likes, comments, shares, saves, clicks, engagement_rate, recorded_at) VALUES
('d0000000-0000-0000-0000-000000000001','c0000001-0000-0000-0000-000000000001','instagram', 15420,12350,892,67,134,234,456,8.57, NOW() - INTERVAL '6 days'),
('d0000000-0000-0000-0000-000000000001','c0000001-0000-0000-0000-000000000001','instagram', 22100,18900,1245,89,198,312,678,8.21, NOW() - INTERVAL '5 days'),
('d0000000-0000-0000-0000-000000000001','c0000001-0000-0000-0000-000000000001','instagram', 8900,7200,534,34,89,145,289,9.04, NOW() - INTERVAL '4 days');

-- Behind the Scene Roasting (c0000002) - 2 hari
INSERT INTO analytics (user_id, content_id, platform, impressions, reach, likes, comments, shares, saves, clicks, engagement_rate, recorded_at) VALUES
('d0000000-0000-0000-0000-000000000001','c0000002-0000-0000-0000-000000000002','instagram', 28500,24100,2134,156,423,567,345,13.06, NOW() - INTERVAL '4 days'),
('d0000000-0000-0000-0000-000000000001','c0000002-0000-0000-0000-000000000002','instagram', 35200,29800,2678,198,534,712,423,13.10, NOW() - INTERVAL '3 days');

-- 5 Bahan Alami (c0000004) - 3 hari
INSERT INTO analytics (user_id, content_id, platform, impressions, reach, likes, comments, shares, saves, clicks, engagement_rate, recorded_at) VALUES
('d0000000-0000-0000-0000-000000000001','c0000004-0000-0000-0000-000000000004','instagram', 42300,35600,3456,234,678,1234,567,14.89, NOW() - INTERVAL '5 days'),
('d0000000-0000-0000-0000-000000000001','c0000004-0000-0000-0000-000000000004','instagram', 38100,32400,3122,198,589,1067,489,14.62, NOW() - INTERVAL '4 days'),
('d0000000-0000-0000-0000-000000000001','c0000004-0000-0000-0000-000000000004','instagram', 19800,16200,1567,112,345,678,234,14.30, NOW() - INTERVAL '3 days');

-- Morning Skincare Routine (c0000005) - 2 hari TikTok
INSERT INTO analytics (user_id, content_id, platform, impressions, reach, likes, comments, shares, saves, clicks, engagement_rate, recorded_at) VALUES
('d0000000-0000-0000-0000-000000000001','c0000005-0000-0000-0000-000000000005','tiktok', 89500,78200,6789,456,2345,3456,1234,17.12, NOW() - INTERVAL '3 days'),
('d0000000-0000-0000-0000-000000000001','c0000005-0000-0000-0000-000000000005','tiktok', 125000,108900,9234,678,3456,4890,1789,16.74, NOW() - INTERVAL '2 days');

-- Workout 15 Menit (c0000007) - 2 hari YouTube
INSERT INTO analytics (user_id, content_id, platform, impressions, reach, likes, comments, shares, saves, clicks, engagement_rate, recorded_at) VALUES
('d0000000-0000-0000-0000-000000000001','c0000007-0000-0000-0000-000000000007','youtube', 56000,48900,3456,289,567,1234,890,11.34, NOW() - INTERVAL '2 days'),
('d0000000-0000-0000-0000-000000000001','c0000007-0000-0000-0000-000000000007','youtube', 72000,63400,4567,378,734,1567,1123,11.56, NOW() - INTERVAL '1 day');

-- Meal Prep Mingguan (c0000008) - 1 hari
INSERT INTO analytics (user_id, content_id, platform, impressions, reach, likes, comments, shares, saves, clicks, engagement_rate, recorded_at) VALUES
('d0000000-0000-0000-0000-000000000001','c0000008-0000-0000-0000-000000000008','instagram', 31200,26800,2345,178,456,1567,389,15.21, NOW() - INTERVAL '1 day');

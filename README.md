# 🇲🇦 Moroccan E-Commerce Store

A beautiful, responsive Moroccan fashion store with WhatsApp checkout and seller admin panel.

## Features

- ✅ Arabic default with RTL support
- ✅ 3 Languages: Arabic, French, English
- ✅ WhatsApp checkout (FREE orders)
- ✅ Seller admin panel
- ✅ Mobile responsive
- ✅ Supabase database (FREE)

## Quick Start

```bash
npm install
npm run dev
```

## Setup Supabase (FREE Database)

### Step 1: Create Supabase Account
1. Go to [supabase.com](https://supabase.com)
2. Sign up with GitHub (FREE)
3. Click "New Project"
4. Choose a name and password

### Step 2: Create Products Table
Go to SQL Editor and run:

```sql
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name JSONB NOT NULL,
  category TEXT NOT NULL,
  price DECIMAL NOT NULL,
  original_price DECIMAL,
  image TEXT NOT NULL,
  badge TEXT,
  description JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Allow public read
CREATE POLICY "Public read" ON products FOR SELECT USING (true);

-- Allow all operations (for demo - add auth in production)
CREATE POLICY "Allow all" ON products FOR ALL USING (true);

-- Insert sample products
INSERT INTO products (name, category, price, original_price, image, badge, description) VALUES
('{"ar": "قفطان ملكي", "fr": "Caftan Royal", "en": "Royal Kaftan"}', 'kaftans', 299, 399, 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500', 'hot', '{"ar": "قفطان فاخر", "fr": "Caftan luxe", "en": "Luxury kaftan"}'),
('{"ar": "بلغة جلدية", "fr": "Babouche Cuir", "en": "Leather Babouche"}', 'shoes', 89, NULL, 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=500', 'new', '{"ar": "بلغة تقليدية", "fr": "Babouche traditionnelle", "en": "Traditional babouche"}'),
('{"ar": "جلابة مطرزة", "fr": "Djellaba Brodée", "en": "Embroidered Djellaba"}', 'djellabas', 199, 249, 'https://images.unsplash.com/photo-1590735213920-68192a487bc2?w=500', 'sale', '{"ar": "جلابة أنيقة", "fr": "Djellaba élégante", "en": "Elegant djellaba"}');
```

### Step 3: Get API Keys
1. Go to Settings → API
2. Copy `Project URL` and `anon public` key

### Step 4: Add to Vercel
In Vercel dashboard → Settings → Environment Variables:
- `VITE_SUPABASE_URL` = your project URL
- `VITE_SUPABASE_ANON_KEY` = your anon key

## WhatsApp Setup

Edit `src/App.jsx` line ~706:
```javascript
const whatsappNumber = '212XXXXXXXXX' // Your Morocco number
```

## Deploy to Vercel

1. Push to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables
5. Deploy!

## Seller Panel

Access seller panel by clicking "البائع" (Seller) button in header.

Features:
- Add/Edit/Delete products
- View statistics
- Manage inventory

## License

MIT

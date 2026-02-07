-- ================================================
-- ANAS RENT A CAR - Complete Database Setup Script
-- ================================================
-- Run this entire script in Supabase SQL Editor
-- This will create all tables, policies, storage, and admin user

-- ================================================
-- 1. CREATE TABLES
-- ================================================

-- Cars table
CREATE TABLE IF NOT EXISTS cars (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand TEXT NOT NULL,
  model TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('citadine', 'suv', 'berline', 'utilitaire')),
  seats INTEGER NOT NULL DEFAULT 5,
  transmission TEXT NOT NULL CHECK (transmission IN ('manual', 'automatic')),
  fuel_type TEXT NOT NULL CHECK (fuel_type IN ('essence', 'diesel', 'electric', 'hybrid')),
  price_per_day DECIMAL(10, 2) NOT NULL,
  description TEXT,
  image_url TEXT,
  available BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL,
  approved BOOLEAN NOT NULL DEFAULT false,
  display_order INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contact requests / reservations table
CREATE TABLE IF NOT EXISTS contact_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  car_id UUID REFERENCES cars(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'done')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Admins table
CREATE TABLE IF NOT EXISTS admins (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ================================================
-- 2. CREATE INDEXES
-- ================================================

CREATE INDEX IF NOT EXISTS idx_cars_category ON cars(category);
CREATE INDEX IF NOT EXISTS idx_cars_available ON cars(available);
CREATE INDEX IF NOT EXISTS idx_cars_price ON cars(price_per_day);
CREATE INDEX IF NOT EXISTS idx_reviews_approved ON reviews(approved);
CREATE INDEX IF NOT EXISTS idx_reviews_display_order ON reviews(display_order);
CREATE INDEX IF NOT EXISTS idx_contact_requests_status ON contact_requests(status);
CREATE INDEX IF NOT EXISTS idx_contact_requests_created ON contact_requests(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_admins_email ON admins(email);

-- ================================================
-- 3. CREATE TRIGGERS
-- ================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update updated_at for cars
DROP TRIGGER IF EXISTS update_cars_updated_at ON cars;
CREATE TRIGGER update_cars_updated_at
  BEFORE UPDATE ON cars
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ================================================
-- 4. ROW LEVEL SECURITY (RLS) POLICIES
-- ================================================

-- Enable RLS on all tables
ALTER TABLE cars ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

-- Cars policies
CREATE POLICY "Anyone can view available cars"
  ON cars FOR SELECT
  USING (available = true);

CREATE POLICY "Admins can view all cars"
  ON cars FOR SELECT
  USING (auth.uid() IN (SELECT id FROM admins));

CREATE POLICY "Admins can insert cars"
  ON cars FOR INSERT
  WITH CHECK (auth.uid() IN (SELECT id FROM admins));

CREATE POLICY "Admins can update cars"
  ON cars FOR UPDATE
  USING (auth.uid() IN (SELECT id FROM admins));

CREATE POLICY "Admins can delete cars"
  ON cars FOR DELETE
  USING (auth.uid() IN (SELECT id FROM admins));

-- Reviews policies
CREATE POLICY "Anyone can view approved reviews"
  ON reviews FOR SELECT
  USING (approved = true);

CREATE POLICY "Admins can view all reviews"
  ON reviews FOR SELECT
  USING (auth.uid() IN (SELECT id FROM admins));

CREATE POLICY "Admins can insert reviews"
  ON reviews FOR INSERT
  WITH CHECK (auth.uid() IN (SELECT id FROM admins));

CREATE POLICY "Admins can update reviews"
  ON reviews FOR UPDATE
  USING (auth.uid() IN (SELECT id FROM admins));

CREATE POLICY "Admins can delete reviews"
  ON reviews FOR DELETE
  USING (auth.uid() IN (SELECT id FROM admins));

-- Contact requests policies
CREATE POLICY "Anyone can insert contact requests"
  ON contact_requests FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can view all contact requests"
  ON contact_requests FOR SELECT
  USING (auth.uid() IN (SELECT id FROM admins));

CREATE POLICY "Admins can update contact requests"
  ON contact_requests FOR UPDATE
  USING (auth.uid() IN (SELECT id FROM admins));

CREATE POLICY "Admins can delete contact requests"
  ON contact_requests FOR DELETE
  USING (auth.uid() IN (SELECT id FROM admins));

-- Admins policies
CREATE POLICY "Admins can view all admins"
  ON admins FOR SELECT
  USING (auth.uid() IN (SELECT id FROM admins));

-- ================================================
-- 5. STORAGE BUCKET FOR CAR IMAGES
-- ================================================

-- Create the bucket for car images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'car-images',
  'car-images',
  true,
  52428800, -- 50MB in bytes
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif', 'image/heic', 'image/heif']
)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for car images
CREATE POLICY "Anyone can view car images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'car-images');

CREATE POLICY "Admins can upload car images"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'car-images' AND
    auth.uid() IN (SELECT id FROM public.admins)
  );

CREATE POLICY "Admins can update car images"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'car-images' AND
    auth.uid() IN (SELECT id FROM public.admins)
  );

CREATE POLICY "Admins can delete car images"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'car-images' AND
    auth.uid() IN (SELECT id FROM public.admins)
  );

-- ================================================
-- 6. SEED DATA - Sample Cars
-- ================================================

INSERT INTO cars (brand, model, category, seats, transmission, fuel_type, price_per_day, description, image_url, available)
VALUES 
  ('Renault', 'Clio', 'citadine', 5, 'manual', 'essence', 250.00, 'Parfaite pour la ville, économique et confortable', '/renault-clio-white-compact-car.jpg', true),
  ('Peugeot', '3008', 'suv', 5, 'automatic', 'diesel', 450.00, 'SUV spacieux et moderne avec toutes les options', '/peugeot-3008-suv-gray.jpg', true),
  ('Mercedes', 'Classe C', 'berline', 5, 'automatic', 'diesel', 600.00, 'Berline de luxe pour voyages professionnels', '/mercedes-c-class-black-sedan-luxury.jpg', true),
  ('Renault', 'Kangoo', 'utilitaire', 2, 'manual', 'diesel', 350.00, 'Utilitaire idéal pour les déménagements et transports', '/renault-kangoo-white-van-utility.jpg', true),
  ('Tesla', 'Model 3', 'berline', 5, 'automatic', 'electric', 700.00, 'Véhicule électrique premium avec autopilot', '/tesla-model-3-white-electric-sedan.jpg', true)
ON CONFLICT DO NOTHING;

-- ================================================
-- 7. SEED DATA - Sample Reviews
-- ================================================

INSERT INTO reviews (customer_name, rating, comment, approved, display_order)
VALUES 
  ('Mohammed A.', 5, 'Service impeccable! La voiture était propre et en parfait état. Je recommande vivement Anas Rent A Car.', true, 1),
  ('Fatima Z.', 5, 'Excellente expérience. Personnel professionnel et véhicule de qualité. Prix très compétitifs.', true, 2),
  ('Hassan K.', 5, 'Livraison à l''aéroport très pratique. Service client réactif et sympathique.', true, 3),
  ('Amina B.', 5, 'Location facile et rapide. Voiture récente et bien entretenue. Parfait pour mon séjour à Casablanca.', true, 4)
ON CONFLICT DO NOTHING;

-- ================================================
-- 8. CREATE ADMIN USER
-- ================================================

-- NOTE: You need to create the admin user account manually in Supabase Auth UI
-- Email: Tva25459@gmail.com
-- After creating the auth user, run this query with the actual user ID:

-- INSERT INTO admins (id, email, full_name)
-- VALUES ('YOUR_AUTH_USER_ID_HERE', 'Tva25459@gmail.com', 'Anas Admin')
-- ON CONFLICT (email) DO NOTHING;

-- ================================================
-- 9. VERIFICATION QUERIES
-- ================================================

-- Verify tables created
SELECT tablename FROM pg_tables WHERE schemaname = 'public' ORDER BY tablename;

-- Verify storage bucket
SELECT * FROM storage.buckets WHERE id = 'car-images';

-- Count records
SELECT 'cars' as table_name, COUNT(*) as records FROM cars
UNION ALL
SELECT 'reviews', COUNT(*) FROM reviews
UNION ALL
SELECT 'contact_requests', COUNT(*) FROM contact_requests
UNION ALL
SELECT 'admins', COUNT(*) FROM admins;

-- ================================================
-- SETUP COMPLETE!
-- ================================================
-- Next steps:
-- 1. Create admin user in Supabase Auth UI with email: Tva25459@gmail.com
-- 2. Copy the user ID and update the INSERT INTO admins query above
-- 3. Upload car images to the car-images storage bucket
-- 4. Test the application connection

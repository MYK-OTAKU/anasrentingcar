-- Create table for cars
CREATE TABLE IF NOT EXISTS public.cars (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    brand TEXT NOT NULL,
    model TEXT NOT NULL,
    category TEXT NOT NULL, -- Citadine, SUV, Berline, etc.
    transmission TEXT NOT NULL, -- Manuelle, Automatique
    fuel_type TEXT NOT NULL, -- Essence, Diesel, Electrique, Hybride
    seats INTEGER NOT NULL,
    price_per_day NUMERIC NOT NULL,
    image_url TEXT,
    available BOOLEAN DEFAULT TRUE,
    description TEXT,
    features TEXT[],
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create table for reservations/requests
CREATE TABLE IF NOT EXISTS public.reservations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    car_id UUID REFERENCES public.cars(id),
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    pickup_location TEXT NOT NULL,
    departure_date DATE NOT NULL,
    departure_time TEXT NOT NULL,
    return_date DATE NOT NULL,
    return_time TEXT NOT NULL,
    message TEXT,
    status TEXT DEFAULT 'pending', -- pending, confirmed, cancelled
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create table for reviews
CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT NOT NULL,
    is_approved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create storage bucket for car images
-- Note: This usually needs to be done via Supabase Dashboard or API, 
-- but here's how you'd enable storage if using SQL (depends on Supabase setup)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('cars', 'cars', true)
ON CONFLICT (id) DO NOTHING;

-- Policies for public access (Read-only for users)
CREATE POLICY "Public Access Cars" ON public.cars FOR SELECT USING (true);
CREATE POLICY "Public Access Reviews" ON public.reviews FOR SELECT WHERE (is_approved = true);

-- Policies for inserting requests
CREATE POLICY "Enable insert for everyone" ON public.reservations FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable insert for reviews" ON public.reviews FOR INSERT WITH CHECK (true);


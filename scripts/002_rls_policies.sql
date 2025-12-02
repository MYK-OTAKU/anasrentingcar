-- Row Level Security (RLS) Policies
-- Run this script after creating tables

-- Enable RLS on all tables
ALTER TABLE cars ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_requests ENABLE ROW LEVEL SECURITY;

-- Cars policies (public read, admin write)
-- Anyone can view available cars
CREATE POLICY "Public can view available cars"
  ON cars FOR SELECT
  USING (available = true);

-- Authenticated admin users can manage all cars
CREATE POLICY "Admin can manage cars"
  ON cars FOR ALL
  USING (
    auth.jwt() ->> 'user_metadata' IS NOT NULL 
    AND (auth.jwt() -> 'user_metadata' ->> 'is_admin')::boolean = true
  );

-- Reviews policies (public read approved, admin write)
-- Anyone can view approved reviews
CREATE POLICY "Public can view approved reviews"
  ON reviews FOR SELECT
  USING (approved = true);

-- Anyone can insert a review (will be unapproved by default)
CREATE POLICY "Anyone can submit review"
  ON reviews FOR INSERT
  WITH CHECK (true);

-- Admin can manage all reviews
CREATE POLICY "Admin can manage reviews"
  ON reviews FOR ALL
  USING (
    auth.jwt() ->> 'user_metadata' IS NOT NULL 
    AND (auth.jwt() -> 'user_metadata' ->> 'is_admin')::boolean = true
  );

-- Contact requests policies
-- Anyone can submit a contact request
CREATE POLICY "Anyone can submit contact request"
  ON contact_requests FOR INSERT
  WITH CHECK (true);

-- Only admin can view and manage contact requests
CREATE POLICY "Admin can manage contact requests"
  ON contact_requests FOR ALL
  USING (
    auth.jwt() ->> 'user_metadata' IS NOT NULL 
    AND (auth.jwt() -> 'user_metadata' ->> 'is_admin')::boolean = true
  );

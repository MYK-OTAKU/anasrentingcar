-- Add images array column to cars table
ALTER TABLE cars 
ADD COLUMN IF NOT EXISTS images TEXT[] DEFAULT '{}';

-- Update existing rows to populate images from image_url if available
UPDATE cars 
SET images = ARRAY[image_url] 
WHERE image_url IS NOT NULL AND images IS NULL;

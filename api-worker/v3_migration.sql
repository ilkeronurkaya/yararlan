-- V3 Migration: Master Plan Requirements (2026)

-- We are adding multiple features to the 'websites' table to support
-- the AI Discovery Engine modernization.

ALTER TABLE websites ADD COLUMN turkish_support INTEGER DEFAULT 0;
ALTER TABLE websites ADD COLUMN pricing_type TEXT DEFAULT 'Free'; -- Free, Paid, Freemium
ALTER TABLE websites ADD COLUMN rating_score REAL DEFAULT 0.0;
ALTER TABLE websites ADD COLUMN monthly_visits INTEGER DEFAULT 0;
ALTER TABLE websites ADD COLUMN seo_title TEXT;
ALTER TABLE websites ADD COLUMN seo_desc TEXT;
ALTER TABLE websites ADD COLUMN tags TEXT; -- stored as JSON string or comma separated

-- Create a dummy rating system
UPDATE websites SET rating_score = 9.0 + (id % 10) / 10.0;
UPDATE websites SET pricing_type = 'Freemium' WHERE id % 2 = 0;
UPDATE websites SET pricing_type = 'Free' WHERE id % 3 = 0;

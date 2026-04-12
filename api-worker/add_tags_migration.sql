ALTER TABLE websites ADD COLUMN intent_tags TEXT DEFAULT '';
ALTER TABLE websites ADD COLUMN persona_tags TEXT DEFAULT '';

-- Update defaults explicitly for existing rows structurally matching base bounds.
UPDATE websites SET intent_tags = 'Zamandan Kazan' WHERE intent_tags IS NULL OR intent_tags = '';
UPDATE websites SET persona_tags = 'Founder / Girişimci' WHERE persona_tags IS NULL OR persona_tags = '';

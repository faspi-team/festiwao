-- Migración para crear tabla separada de música y referenciarla por ID
-- Ejecutar este archivo para migrar de la estructura actual a la nueva estructura

-- 1. Crear la nueva tabla de música
CREATE TABLE music_tracks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL DEFAULT 'predefined', -- 'predefined', 'custom'
  url VARCHAR(500),
  file_path VARCHAR(500), -- Para archivos subidos localmente
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Migrar datos existentes de música a la nueva tabla
-- Primero, insertar música predefinida con rutas de assets locales
INSERT INTO music_tracks (name, type, url) VALUES
  ('A Thousand Years', 'predefined', '/assets/music/a-thousand-years.mp3'),
  ('Perfect', 'predefined', '/assets/music/perfect.mp3'),
  ('All of Me', 'predefined', '/assets/music/all-of-me.mp3'),
  ('Marry Me', 'predefined', '/assets/music/marry-me.mp3');

-- 3. Migrar música personalizada existente (si existe)
-- Crear registros para música personalizada existente
INSERT INTO music_tracks (name, type, url, file_path)
SELECT 
  COALESCE(music_name, 'Música personalizada'),
  'custom',
  music_url,
  NULL
FROM invitations 
WHERE music_type = 'custom' 
  AND music_url IS NOT NULL 
  AND music_name IS NOT NULL;

-- 4. Agregar la columna music_id a la tabla invitations
ALTER TABLE invitations 
ADD COLUMN music_id UUID REFERENCES music_tracks(id) ON DELETE SET NULL;

-- 5. Migrar las referencias existentes
-- Para música predefinida, buscar por nombre
UPDATE invitations 
SET music_id = (
  SELECT id FROM music_tracks 
  WHERE name = invitations.music_name 
  AND type = 'predefined'
)
WHERE music_type = 'predefined' 
  AND music_name IS NOT NULL;

-- Para música personalizada, usar el registro creado anteriormente
UPDATE invitations 
SET music_id = (
  SELECT id FROM music_tracks 
  WHERE name = invitations.music_name 
  AND type = 'custom'
  AND url = invitations.music_url
)
WHERE music_type = 'custom' 
  AND music_name IS NOT NULL 
  AND music_url IS NOT NULL;

-- 6. Eliminar las columnas antiguas de música
ALTER TABLE invitations 
DROP COLUMN music_type,
DROP COLUMN music_url,
DROP COLUMN music_name;

-- 7. Configurar RLS para la nueva tabla
ALTER TABLE music_tracks ENABLE ROW LEVEL SECURITY;

-- Políticas para music_tracks
CREATE POLICY "Music tracks are viewable by everyone" ON music_tracks
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert custom music" ON music_tracks
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Users can update their own custom music" ON music_tracks
  FOR UPDATE USING (auth.uid() IS NOT NULL) WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Users can delete their own custom music" ON music_tracks
  FOR DELETE USING (auth.uid() IS NOT NULL);

-- 8. Crear trigger para actualizar updated_at en music_tracks
CREATE TRIGGER update_music_tracks_updated_at BEFORE UPDATE ON music_tracks
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 9. Verificar la migración
SELECT 
  'invitations' as table_name,
  column_name, 
  data_type, 
  is_nullable
FROM information_schema.columns 
WHERE table_name = 'invitations' 
  AND column_name = 'music_id'

UNION ALL

SELECT 
  'music_tracks' as table_name,
  column_name, 
  data_type, 
  is_nullable
FROM information_schema.columns 
WHERE table_name = 'music_tracks'
ORDER BY table_name, column_name;

-- 10. Agregar campos de color personalizados (nueva funcionalidad)
ALTER TABLE invitations 
ADD COLUMN IF NOT EXISTS primary_color VARCHAR(7) DEFAULT '#fd5d5d',
ADD COLUMN IF NOT EXISTS secondary_color VARCHAR(7) DEFAULT '#BBBD98',
ADD COLUMN IF NOT EXISTS background_color VARCHAR(7) DEFAULT '#ffffff',
ADD COLUMN IF NOT EXISTS text_color VARCHAR(7) DEFAULT '#2F2F2F';

-- Comentarios para los nuevos campos
COMMENT ON COLUMN invitations.primary_color IS 'Color principal para títulos y elementos destacados';
COMMENT ON COLUMN invitations.secondary_color IS 'Color secundario para textos y elementos de apoyo';
COMMENT ON COLUMN invitations.background_color IS 'Color de fondo principal de la invitación';
COMMENT ON COLUMN invitations.text_color IS 'Color principal para textos';

-- Verificar que los campos de color se agregaron correctamente
SELECT 
  'invitations' as table_name,
  column_name, 
  data_type, 
  is_nullable,
  column_default
FROM information_schema.columns 
WHERE table_name = 'invitations' 
  AND column_name IN ('primary_color', 'secondary_color', 'background_color', 'text_color')
ORDER BY column_name;

-- Migración para agregar tabla de galería de fotos
-- Ejecutar después del esquema principal

-- Tabla de galería de fotos
CREATE TABLE gallery_photos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  invitation_id UUID REFERENCES invitations(id) ON DELETE CASCADE,
  title VARCHAR(255),
  description TEXT,
  image_url VARCHAR(500) NOT NULL,
  thumbnail_url VARCHAR(500),
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Políticas de seguridad RLS para gallery_photos
ALTER TABLE gallery_photos ENABLE ROW LEVEL SECURITY;

-- Política para ver fotos de invitaciones públicas
CREATE POLICY "Gallery photos are viewable for public invitations" ON gallery_photos
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM invitations 
      WHERE invitations.id = gallery_photos.invitation_id 
      AND invitations.is_active = true
    )
  );

-- Política para que usuarios autenticados puedan ver fotos de sus invitaciones
CREATE POLICY "Users can view photos of their invitations" ON gallery_photos
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM invitations 
      WHERE invitations.id = gallery_photos.invitation_id 
      AND invitations.user_id = auth.uid()
    )
  );

-- Política para que usuarios autenticados puedan insertar fotos en sus invitaciones
CREATE POLICY "Users can insert photos in their invitations" ON gallery_photos
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM invitations 
      WHERE invitations.id = gallery_photos.invitation_id 
      AND invitations.user_id = auth.uid()
    )
  );

-- Política para que usuarios autenticados puedan actualizar fotos de sus invitaciones
CREATE POLICY "Users can update photos of their invitations" ON gallery_photos
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM invitations 
      WHERE invitations.id = gallery_photos.invitation_id 
      AND invitations.user_id = auth.uid()
    )
  ) WITH CHECK (
    EXISTS (
      SELECT 1 FROM invitations 
      WHERE invitations.id = gallery_photos.invitation_id 
      AND invitations.user_id = auth.uid()
    )
  );

-- Política para que usuarios autenticados puedan eliminar fotos de sus invitaciones
CREATE POLICY "Users can delete photos of their invitations" ON gallery_photos
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM invitations 
      WHERE invitations.id = gallery_photos.invitation_id 
      AND invitations.user_id = auth.uid()
    )
  );

-- Trigger para actualizar updated_at automáticamente
CREATE TRIGGER update_gallery_photos_updated_at BEFORE UPDATE ON gallery_photos
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insertar algunas fotos de ejemplo para invitaciones existentes
-- (Esto es opcional, solo para testing)
INSERT INTO gallery_photos (invitation_id, title, description, image_url, order_index) 
SELECT 
  id as invitation_id,
  'Foto de la boda' as title,
  'Hermoso momento capturado en nuestro día especial' as description,
  '/assets/layouts/classic/img/gallery-1.jpg' as image_url,
  1 as order_index
FROM invitations 
WHERE is_active = true 
LIMIT 1;

INSERT INTO gallery_photos (invitation_id, title, description, image_url, order_index) 
SELECT 
  id as invitation_id,
  'Celebración familiar' as title,
  'Compartiendo con nuestros seres queridos' as description,
  '/assets/layouts/classic/img/gallery-2.jpg' as image_url,
  2 as order_index
FROM invitations 
WHERE is_active = true 
LIMIT 1;

INSERT INTO gallery_photos (invitation_id, title, description, image_url, order_index) 
SELECT 
  id as invitation_id,
  'Primer baile' as title,
  'Nuestro primer baile como esposos' as description,
  '/assets/layouts/classic/img/gallery-3.jpg' as image_url,
  3 as order_index
FROM invitations 
WHERE is_active = true 
LIMIT 1;
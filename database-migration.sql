-- Migración para agregar campos de música a la tabla invitations
-- Ejecutar este archivo si ya tienes una base de datos existente

-- Agregar las nuevas columnas para música
ALTER TABLE invitations 
ADD COLUMN music_type VARCHAR(50) DEFAULT 'none',
ADD COLUMN music_url VARCHAR(500),
ADD COLUMN music_name VARCHAR(255);

-- Agregar comentarios para documentar los campos
COMMENT ON COLUMN invitations.music_type IS 'Tipo de música: predefined, custom, o none';
COMMENT ON COLUMN invitations.music_url IS 'URL del archivo de música (puede ser predefinida o subida por el usuario)';
COMMENT ON COLUMN invitations.music_name IS 'Nombre descriptivo de la música seleccionada';

-- Verificar que los campos se agregaron correctamente
SELECT column_name, data_type, is_nullable, column_default 
FROM information_schema.columns 
WHERE table_name = 'invitations' 
AND column_name IN ('music_type', 'music_url', 'music_name');
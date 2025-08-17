-- Configuración de Supabase Storage para la galería de fotos
-- Usando el bucket 'invitations' existente con estructura de carpetas
-- Ejecutar en el SQL Editor de Supabase

-- Políticas para el bucket invitations (para la carpeta gallery)

-- Permitir lectura pública de imágenes en la carpeta gallery
CREATE POLICY "Public Access Gallery" ON storage.objects
FOR SELECT USING (
  bucket_id = 'invitations' 
  AND (storage.foldername(name))[1] = 'gallery'
);

-- Permitir que usuarios autenticados suban archivos en la carpeta gallery
CREATE POLICY "Authenticated users can upload gallery" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'invitations' 
  AND (storage.foldername(name))[1] = 'gallery'
  AND auth.role() = 'authenticated'
);

-- Permitir que usuarios autenticados actualicen sus archivos en la carpeta gallery
CREATE POLICY "Authenticated users can update gallery" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'invitations' 
  AND (storage.foldername(name))[1] = 'gallery'
  AND auth.role() = 'authenticated'
);

-- Permitir que usuarios autenticados eliminen sus archivos en la carpeta gallery
CREATE POLICY "Authenticated users can delete gallery" ON storage.objects
FOR DELETE USING (
  bucket_id = 'invitations' 
  AND (storage.foldername(name))[1] = 'gallery'
  AND auth.role() = 'authenticated'
);

-- Función para limpiar archivos huérfanos de la galería (opcional)
CREATE OR REPLACE FUNCTION cleanup_orphaned_gallery_files()
RETURNS void AS $$
BEGIN
  -- Eliminar archivos de la carpeta gallery que no están referenciados en gallery_photos
  DELETE FROM storage.objects 
  WHERE bucket_id = 'invitations'
  AND (storage.foldername(name))[1] = 'gallery'
  AND id NOT IN (
    SELECT DISTINCT 
      CASE 
        WHEN image_url LIKE '%invitations%' AND image_url LIKE '%gallery%' THEN 
          substring(image_url from 'invitations/(.+)')
        ELSE NULL 
      END
    FROM gallery_photos 
    WHERE image_url IS NOT NULL
  );
END;
$$ LANGUAGE plpgsql;

-- Comentarios sobre el uso
COMMENT ON FUNCTION cleanup_orphaned_gallery_files() IS 'Función para limpiar archivos de la carpeta gallery que ya no están referenciados en la base de datos';


-- Políticas de Storage para la galería de fotos
-- Usando el bucket 'invitations' existente
-- Ejecutar en el SQL Editor de Supabase

-- Eliminar políticas existentes si las hay (opcional)
DROP POLICY IF EXISTS "Public Access Gallery" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload gallery" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update gallery" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete gallery" ON storage.objects;

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

-- Verificar que las políticas se crearon correctamente
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies 
WHERE tablename = 'objects' 
AND policyname LIKE '%gallery%';

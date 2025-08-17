-- Tabla de plantillas
CREATE TABLE templates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  preview_image VARCHAR(500),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de música
CREATE TABLE music_tracks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL DEFAULT 'predefined', -- 'predefined', 'custom'
  url VARCHAR(500),
  file_path VARCHAR(500), -- Para archivos subidos localmente
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de invitaciones
CREATE TABLE invitations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  template_id UUID REFERENCES templates(id),
  music_id UUID REFERENCES music_tracks(id) ON DELETE SET NULL,
  groom_name VARCHAR(255),
  bride_name VARCHAR(255),
  groom_description TEXT,
  bride_description TEXT,
  event_date TIMESTAMP WITH TIME ZONE,
  venue TEXT,
  description TEXT,
  unique_url VARCHAR(255) UNIQUE NOT NULL,
  is_active BOOLEAN DEFAULT true,
  photo_url VARCHAR(255),
  story JSONB,
  wedding_timeline JSONB,
  -- Colores personalizados
  primary_color VARCHAR(7),
  secondary_color VARCHAR(7),
  background_color VARCHAR(7),
  text_color VARCHAR(7),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de respuestas RSVP
CREATE TABLE rsvp_responses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  invitation_id UUID REFERENCES invitations(id) ON DELETE CASCADE,
  guest_name VARCHAR(255),
  email VARCHAR(255),
  response BOOLEAN, -- true = asistirá, false = no asistirá
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insertar algunas plantillas de ejemplo
INSERT INTO templates (name, description) VALUES
  ('Clásica', 'Diseño elegante y tradicional'),
  ('Moderno', 'Diseño contemporáneo y minimalista'),
  ('Romántico', 'Diseño romántico con flores'),
  ('Elegante', 'Diseño sofisticado y formal');

-- Insertar música predefinida con rutas de assets locales
INSERT INTO music_tracks (name, type, url) VALUES
  ('A Thousand Years', 'predefined', '/assets/music/a-thousand-years.mp3'),
  ('Perfect', 'predefined', '/assets/music/perfect.mp3'),
  ('All of Me', 'predefined', '/assets/music/all-of-me.mp3'),
  ('Marry Me', 'predefined', '/assets/music/marry-me.mp3');

-- Políticas de seguridad RLS (Row Level Security)
ALTER TABLE templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE music_tracks ENABLE ROW LEVEL SECURITY;
ALTER TABLE invitations ENABLE ROW LEVEL SECURITY;
ALTER TABLE rsvp_responses ENABLE ROW LEVEL SECURITY;

-- Políticas para templates (lectura pública)
CREATE POLICY "Templates are viewable by everyone" ON templates
  FOR SELECT USING (true);

-- Políticas para music_tracks
CREATE POLICY "Music tracks are viewable by everyone" ON music_tracks
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert custom music" ON music_tracks
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Users can update their own custom music" ON music_tracks
  FOR UPDATE USING (auth.uid() IS NOT NULL) WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Users can delete their own custom music" ON music_tracks
  FOR DELETE USING (auth.uid() IS NOT NULL);

-- Políticas para invitations
CREATE POLICY "Authenticated users can view all invitations" ON invitations
  FOR SELECT USING (auth.uid() is not null);

CREATE POLICY "Users can update their own invitations" ON public.invitations
FOR UPDATE USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can insert their own invitations" ON public.invitations
FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can delete their own invitations" ON public.invitations
FOR DELETE USING (user_id = auth.uid());

-- Política para ver invitaciones públicas (por URL única)
CREATE POLICY "Public invitations are viewable by everyone" ON invitations
  FOR SELECT USING (is_active = true);

-- Políticas para rsvp_responses
CREATE POLICY "Users can view RSVP for their invitations" ON rsvp_responses
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM invitations 
      WHERE invitations.id = rsvp_responses.invitation_id 
      AND invitations.user_id = auth.uid()
    )
  );

CREATE POLICY "Anyone can insert RSVP responses" ON rsvp_responses
  FOR INSERT WITH CHECK (true);

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para actualizar updated_at
CREATE TRIGGER update_templates_updated_at BEFORE UPDATE ON templates
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_music_tracks_updated_at BEFORE UPDATE ON music_tracks
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_invitations_updated_at BEFORE UPDATE ON invitations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column(); 
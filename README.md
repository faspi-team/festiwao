# Generador de Invitaciones

Una aplicación web moderna para crear y gestionar invitaciones digitales con URLs únicas.

## Características

- 🔐 **Autenticación con Supabase Auth**
- 📝 **Creación de invitaciones personalizadas**
- 🔗 **URLs únicas para cada invitación**
- 📱 **Diseño responsive**
- 🎨 **Múltiples plantillas**
- 📊 **Dashboard con estadísticas**
- ✨ **Interfaz moderna con Bootstrap**

## Tecnologías

- **Frontend**: Nuxt 3 + Vue 3 + TypeScript
- **Backend**: Supabase (PostgreSQL + Auth)
- **UI**: Bootstrap 5 + Tabler Icons
- **Deployment**: Vercel/Netlify

## Configuración

### 1. Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
SUPABASE_URL=tu_url_de_supabase
SUPABASE_KEY=tu_anon_key_de_supabase
```

### 2. Base de Datos

Ejecuta el siguiente SQL en tu base de datos de Supabase:

```sql
-- Tabla de plantillas
CREATE TABLE templates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  preview_image VARCHAR(500),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de invitaciones
CREATE TABLE invitations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title VARCHAR(255),
  template_id UUID REFERENCES templates(id),
  groom_name VARCHAR(255),
  bride_name VARCHAR(255),
  event_date TIMESTAMP WITH TIME ZONE,
  venue TEXT,
  description TEXT,
  unique_url VARCHAR(255) UNIQUE NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de respuestas RSVP
CREATE TABLE rsvp_responses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  invitation_id UUID REFERENCES invitations(id) ON DELETE CASCADE,
  guest_name VARCHAR(255),
  email VARCHAR(255),
  response BOOLEAN,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insertar plantillas de ejemplo
INSERT INTO templates (name, description) VALUES
  ('Clásica', 'Diseño elegante y tradicional'),
  ('Moderno', 'Diseño contemporáneo y minimalista'),
  ('Romántico', 'Diseño romántico con flores'),
  ('Elegante', 'Diseño sofisticado y formal');

-- Habilitar RLS
ALTER TABLE templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE invitations ENABLE ROW LEVEL SECURITY;
ALTER TABLE rsvp_responses ENABLE ROW LEVEL SECURITY;

-- Políticas de seguridad
CREATE POLICY "Templates are viewable by everyone" ON templates FOR SELECT USING (true);
CREATE POLICY "Users can view their own invitations" ON invitations FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own invitations" ON invitations FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own invitations" ON invitations FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own invitations" ON invitations FOR DELETE USING (auth.uid() = user_id);
CREATE POLICY "Public invitations are viewable by everyone" ON invitations FOR SELECT USING (is_active = true);
CREATE POLICY "Anyone can insert RSVP responses" ON rsvp_responses FOR INSERT WITH CHECK (true);
```

### 3. Instalación

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Construir para producción
npm run build
```

## Uso

### 1. Registro e Inicio de Sesión

- Ve a `/login` para iniciar sesión
- Ve a `/register` para crear una cuenta
- Las cuentas se crean automáticamente en Supabase Auth

### 2. Crear Invitaciones

1. Inicia sesión en el panel de administración
2. Ve a "Invitaciones" en el menú lateral
3. Haz clic en "Nueva Invitación"
4. Completa el formulario con los datos del evento
5. Selecciona una plantilla
6. Guarda la invitación

### 3. Compartir Invitaciones

- Cada invitación genera una URL única
- Comparte la URL con tus invitados
- Los invitados pueden ver la invitación y confirmar asistencia

### 4. Ver Estadísticas

- El dashboard muestra estadísticas de tus invitaciones
- Ve las invitaciones recientes
- Monitorea las confirmaciones de asistencia

## Estructura del Proyecto

```
├── components/          # Componentes reutilizables
├── composables/         # Composables de Vue
│   ├── useAuth.ts      # Autenticación
│   └── useInvitations.ts # Gestión de invitaciones
├── layouts/            # Layouts de la aplicación
│   ├── default.vue     # Layout público
│   └── admin.vue       # Layout del admin
├── middleware/         # Middleware de autenticación
├── pages/             # Páginas de la aplicación
│   ├── admin/         # Páginas del admin
│   ├── invitations/   # Gestión de invitaciones
│   └── invitation/    # Vista pública de invitaciones
├── plugins/           # Plugins de Nuxt
├── public/            # Archivos estáticos
├── server/            # Configuración del servidor
├── types/             # Tipos TypeScript
└── utils/             # Utilidades
```

## Características Técnicas

### Autenticación
- Integración completa con Supabase Auth
- Middleware para proteger rutas
- Composable `useAuth` para gestión del estado

### Base de Datos
- PostgreSQL con Supabase
- Row Level Security (RLS) habilitado
- Políticas de seguridad configuradas

### Frontend
- Nuxt 3 con SSR
- Vue 3 Composition API
- TypeScript para type safety
- Bootstrap 5 para el diseño

### Funcionalidades
- ✅ Crear invitaciones
- ✅ URLs únicas
- ✅ Vista pública de invitaciones
- ✅ Dashboard con estadísticas
- ✅ Gestión de plantillas
- ✅ Sistema de RSVP (preparado)
- ✅ Responsive design

## Próximas Características

- [ ] Sistema de RSVP completo
- [ ] Más plantillas de diseño
- [ ] Personalización avanzada
- [ ] Notificaciones por email
- [ ] Exportación de datos
- [ ] Múltiples idiomas

## Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

## Licencia

MIT License - ver el archivo LICENSE para más detalles.

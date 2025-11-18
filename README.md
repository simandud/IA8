# 🎯 Marketing Campaign Generator - Portal de Campañas con IA

Portal completo de generación de campañas de marketing con Inteligencia Artificial, especializado en el mercado de Cuenca, Ecuador. Sistema integral que incluye portal público para clientes y panel CRM para gestión interna.

## 🌟 Características Principales

### Portal Público
- **Generación de Campañas con IA**: Claude AI genera estrategias completas de marketing
- **Análisis Completo**: Audiencia, FODA, competencia, y puntos de dolor del cliente
- **Brief Creativo**: Taglines, mensajes centrales, y temas de campaña
- **Estrategia de Medios**: Plan multi-canal con presupuesto desglosado
- **Solicitud con 1 Clic**: Los usuarios pueden solicitar implementación completa

### Panel CRM
- **Dashboard Completo**: Métricas y estadísticas de solicitudes
- **Gestión de Solicitudes**: Control total del proceso de cada cliente
- **Sistema de Workflow**: 6 pasos personalizables con estados
- **Gestión de Campañas**: Visualización de todas las campañas generadas
- **Notas Internas**: Sistema de anotaciones para el equipo

## 🏗️ Arquitectura del Sistema

```
┌─────────────────────────────────────────────────────────┐
│                    PORTAL PÚBLICO                        │
│  - Landing Page                                          │
│  - Generador de Campañas (Form + IA)                    │
│  - Vista de Campaña Generada                            │
│  - Solicitud de Implementación                          │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│                  API BACKEND (Next.js)                   │
│  - /api/generate - Generación con Claude AI             │
│  - /api/campaigns - Gestión de campañas                 │
│  - /api/requests - Gestión de solicitudes               │
│  - /api/auth - Autenticación NextAuth                   │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│                   BASE DE DATOS (MongoDB)                │
│  - Campaigns Collection                                  │
│  - CampaignRequests Collection                          │
│  - Users Collection                                      │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│                      PANEL CRM                           │
│  - Dashboard con estadísticas                           │
│  - Lista de solicitudes con filtros                     │
│  - Detalle de solicitud con workflow                    │
│  - Gestión de campañas                                  │
└─────────────────────────────────────────────────────────┘
```

## 📋 Elementos de una Campaña Generada

Cada campaña incluye:

1. **Análisis de Mercado**
   - Audiencia objetivo (edad, género, intereses, ubicación)
   - Análisis competitivo
   - Análisis FODA completo
   - Puntos de dolor del cliente

2. **Objetivos y KPIs**
   - Objetivo principal
   - KPIs medibles (CTR, conversión, ROI, engagement)
   - Timeline con milestones

3. **Brief Creativo**
   - Mensaje central
   - Tagline en español
   - Voz de marca
   - Tema de campaña
   - Lista de activos creativos necesarios

4. **Estrategia de Medios**
   - Plataformas seleccionadas
   - Estrategia de compra de medios
   - Plan de contenido por plataforma
   - Frecuencia y timing óptimo

5. **Presupuesto**
   - Presupuesto total
   - Desglose por categoría
   - Proyecciones de ROI

6. **Ejecución**
   - Estrategia de lanzamiento
   - Plan de optimización
   - Estrategia de influencers

7. **Monitoreo y Retención**
   - Herramientas de analytics
   - Calendario de reportes
   - Estrategias de engagement y reengagement

## 🛠️ Stack Tecnológico

- **Frontend**: Next.js 14 (App Router), React, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **Backend**: Next.js API Routes
- **Base de Datos**: MongoDB con Mongoose
- **Autenticación**: NextAuth.js
- **IA**: Anthropic Claude API (Sonnet 4.5)
- **Gestión de Estado**: React Hooks, Zustand
- **Notificaciones**: React Hot Toast
- **Iconos**: Lucide React

## 🚀 Instalación y Configuración

### Requisitos Previos

- Node.js 18+
- MongoDB (local o Atlas)
- API Key de Anthropic Claude

### Paso 1: Instalar Dependencias

```bash
npm install
```

### Paso 2: Configurar Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
# Base de datos MongoDB
MONGODB_URI=mongodb://localhost:27017/marketing-campaigns

# API de Anthropic Claude
ANTHROPIC_API_KEY=tu_api_key_aqui

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=genera_un_secret_seguro_aqui

# Admin Credentials (CAMBIAR EN PRODUCCIÓN)
ADMIN_EMAIL=admin@cuenca.com
ADMIN_PASSWORD=admin123
```

### Paso 3: Generar Secret para NextAuth

```bash
openssl rand -base64 32
```

Copia el resultado en `NEXTAUTH_SECRET`

### Paso 4: Iniciar MongoDB

Si usas MongoDB local:

```bash
mongod --dbpath /ruta/a/tu/data
```

O usa MongoDB Atlas (cloud): https://www.mongodb.com/atlas

### Paso 5: Obtener API Key de Claude

1. Ve a https://console.anthropic.com/
2. Crea una cuenta o inicia sesión
3. Ve a "API Keys"
4. Genera una nueva API Key
5. Cópiala en `ANTHROPIC_API_KEY`

### Paso 6: Iniciar el Servidor de Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

## 📱 Uso del Sistema

### Para Clientes (Portal Público)

1. **Visita la landing page**: `http://localhost:3000`
2. **Haz clic en "Generar Mi Campaña"**
3. **Completa el formulario**:
   - Describe tu producto/servicio
   - Especifica ubicación (por defecto: Cuenca, Ecuador)
   - Indica presupuesto (opcional)
   - Agrega información adicional
4. **Haz clic en "Generar Campaña con IA"**
5. **Espera 10-30 segundos** mientras la IA genera tu campaña
6. **Revisa tu campaña completa** con todos los elementos
7. **Solicita implementación** con el botón "Solicitar Implementación"
8. **Completa tus datos** y envía la solicitud

### Para el Equipo (Panel CRM)

1. **Accede al CRM**: `http://localhost:3000/crm/login`
2. **Credenciales por defecto**:
   - Email: `admin@cuenca.com`
   - Password: `admin123`
3. **Dashboard**: Ver estadísticas generales
4. **Solicitudes**:
   - Ver todas las solicitudes
   - Filtrar por estado
   - Buscar por cliente
5. **Detalle de Solicitud**:
   - Ver información del cliente
   - Gestionar workflow (6 pasos)
   - Cambiar estados
   - Agregar notas internas
   - Ver campaña completa

## 🔄 Sistema de Workflow

Cada solicitud pasa por 6 pasos:

1. **Revisión Inicial** - Análisis de requisitos
2. **Creación de Artes** - Diseño de materiales
3. **Aprobación del Cliente** - Cliente revisa materiales
4. **Configuración de Campaña** - Setup de plataformas
5. **Lanzamiento** - Inicio oficial
6. **Monitoreo y Optimización** - Seguimiento y ajustes

Cada paso puede estar en uno de estos estados:
- `pending` - Pendiente
- `in_progress` - En progreso
- `completed` - Completado
- `rejected` - Rechazado

## 🎨 Personalización

### Modificar el Prompt de IA

Edita el archivo: `src/lib/claude.ts`

Busca `CAMPAIGN_PROMPT_TEMPLATE` y modifica según tus necesidades.

### Agregar Pasos al Workflow

Edita: `src/app/api/requests/route.ts`

Modifica el array `defaultWorkflow` en la función POST.

### Cambiar Colores y Estilos

Edita: `tailwind.config.ts`

Modifica los colores en `theme.extend.colors`

### Personalizar la Landing Page

Edita: `src/app/(public)/page.tsx`

## 📊 API Endpoints

### Públicos

- `POST /api/generate` - Generar campaña con IA
  ```json
  {
    "productService": "Descripción del producto",
    "targetLocation": "Cuenca, Ecuador",
    "budget": "$500-$2000",
    "additionalInfo": "Info adicional"
  }
  ```

- `GET /api/campaigns/[id]` - Obtener campaña por ID

- `POST /api/requests` - Crear solicitud de implementación
  ```json
  {
    "campaignId": "campaign_id",
    "clientInfo": {
      "name": "Nombre",
      "email": "email@ejemplo.com",
      "phone": "0999999999",
      "company": "Empresa (opcional)"
    }
  }
  ```

### CRM (Requieren autenticación)

- `GET /api/requests` - Listar todas las solicitudes
- `GET /api/requests/[id]` - Obtener solicitud por ID
- `PATCH /api/requests/[id]` - Actualizar solicitud
  ```json
  {
    "status": "in_progress",
    "workflow": [...],
    "notes": "Notas internas"
  }
  ```

## 🔐 Seguridad

- **Autenticación**: NextAuth.js con JWT
- **Variables de entorno**: Nunca commitear `.env`
- **API Keys**: Usar variables de entorno
- **CORS**: Configurado solo para orígenes permitidos
- **Validación**: Validación de inputs en frontend y backend

## 🚀 Deployment

### Vercel (Recomendado para Next.js)

1. Push tu código a GitHub
2. Importa el proyecto en Vercel
3. Configura las variables de entorno
4. Deploy automático

### Variables de entorno en producción:

```env
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/db
ANTHROPIC_API_KEY=sk-ant-...
NEXTAUTH_URL=https://tudominio.com
NEXTAUTH_SECRET=secret_produccion_seguro
```

## 📈 Próximas Mejoras

- [ ] Sistema de notificaciones por email
- [ ] Integración con servicios de diseño (Canva, Figma)
- [ ] Generación automática de imágenes con DALL-E
- [ ] Analytics y reportes avanzados
- [ ] Chat en tiempo real entre cliente y equipo
- [ ] Pagos integrados (Stripe, PayPal)
- [ ] Multi-idioma (inglés, español)
- [ ] App móvil con React Native

## 🐛 Troubleshooting

### Error: "Cannot connect to MongoDB"
- Verifica que MongoDB esté corriendo
- Revisa el `MONGODB_URI` en `.env`
- Verifica permisos de red (si usas Atlas)

### Error: "Anthropic API error"
- Verifica tu API Key
- Revisa que tengas créditos en tu cuenta
- Verifica tu conexión a internet

### Error: "NextAuth configuration error"
- Asegúrate de tener `NEXTAUTH_SECRET` configurado
- Verifica que `NEXTAUTH_URL` sea correcto

## 📝 Licencia

MIT License - Siéntete libre de usar este proyecto para tus propios fines.

## 👥 Contribuciones

¡Las contribuciones son bienvenidas!

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📧 Contacto

Para preguntas y soporte, contacta a tu equipo de desarrollo.

## 🎓 Recursos Adicionales

- [Next.js Documentation](https://nextjs.org/docs)
- [Anthropic Claude API](https://docs.anthropic.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [NextAuth.js](https://next-auth.js.org/)

---

**Desarrollado con ❤️ para el mercado de Cuenca, Ecuador**

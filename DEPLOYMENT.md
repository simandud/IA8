# 🚀 Guía de Deployment

Esta guía te ayudará a poner tu portal de campañas en producción.

## 📋 Opciones de Deployment

### 1. Vercel (Recomendado) ⭐

**Ventajas:**
- ✅ Deployment automático desde Git
- ✅ HTTPS gratis
- ✅ CDN global
- ✅ Optimizado para Next.js
- ✅ Plan gratuito generoso
- ✅ Fácil configuración de variables de entorno

#### Pasos para Deploy en Vercel:

1. **Crea cuenta en Vercel**
   - Ve a https://vercel.com
   - Regístrate con GitHub

2. **Importa tu repositorio**
   - Click en "New Project"
   - Importa tu repositorio de GitHub
   - Vercel detectará automáticamente que es Next.js

3. **Configura Variables de Entorno**
   ```
   MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/marketing
   ANTHROPIC_API_KEY=sk-ant-api03-...
   NEXTAUTH_SECRET=genera-uno-nuevo-para-produccion
   NEXTAUTH_URL=https://tu-dominio.vercel.app
   ```

4. **Deploy**
   - Click en "Deploy"
   - Espera 2-3 minutos
   - ¡Listo! Tu app está en producción

5. **Dominio Personalizado (Opcional)**
   - Ve a Settings > Domains
   - Agrega tu dominio personalizado
   - Sigue las instrucciones de DNS

---

### 2. Railway

**Ventajas:**
- ✅ Incluye base de datos MongoDB gratis
- ✅ Deployment desde Git
- ✅ Plan gratuito con $5 de crédito mensual

#### Pasos:

1. **Regístrate en Railway**
   - https://railway.app

2. **New Project > Deploy from GitHub**
   - Conecta tu repositorio

3. **Agregar MongoDB**
   - Add Service > Database > MongoDB
   - Railway generará automáticamente `MONGODB_URI`

4. **Configurar Variables**
   - Ve a tu servicio > Variables
   - Agrega las variables de entorno

5. **Deploy**
   - Railway deployea automáticamente

---

### 3. DigitalOcean App Platform

**Ventajas:**
- ✅ Control total
- ✅ Escalable
- ✅ $200 de crédito gratis para nuevas cuentas

#### Pasos:

1. **Crea cuenta en DigitalOcean**
   - https://www.digitalocean.com

2. **Create App**
   - Conecta GitHub
   - Selecciona tu repositorio

3. **Configure**
   - Build Command: `npm run build`
   - Run Command: `npm start`

4. **Agregar MongoDB**
   - Usa MongoDB Atlas (recomendado)
   - O crea un Droplet con MongoDB

5. **Variables de Entorno**
   - Configurar en App Settings

---

## 🗄️ Base de Datos en Producción

### MongoDB Atlas (Recomendado)

MongoDB Atlas es el servicio cloud oficial de MongoDB y es **GRATIS** para proyectos pequeños.

#### Setup de MongoDB Atlas:

1. **Crear Cuenta**
   - Ve a https://www.mongodb.com/atlas
   - Regístrate gratis

2. **Crear Cluster**
   - Create a Cluster (FREE tier)
   - Selecciona región más cercana (idealmente São Paulo para Ecuador)

3. **Configurar Seguridad**
   - Database Access > Add New Database User
     - Username: `marketingapp`
     - Password: [genera una fuerte]
   - Network Access > Add IP Address
     - Para desarrollo: Add Current IP
     - Para producción: Allow Access from Anywhere (0.0.0.0/0)

4. **Obtener Connection String**
   - Connect > Connect your application
   - Copia el connection string
   - Reemplaza `<password>` con tu password real

   ```
   mongodb+srv://marketingapp:TU_PASSWORD@cluster0.xxxxx.mongodb.net/marketing-campaigns?retryWrites=true&w=majority
   ```

5. **Usar en tu App**
   - Pega este string en `MONGODB_URI`

---

## 🔐 Seguridad en Producción

### Variables de Entorno Críticas:

```bash
# ⚠️ CAMBIAR ESTOS VALORES EN PRODUCCIÓN

# 1. NextAuth Secret (CRÍTICO)
# Genera uno nuevo con: openssl rand -base64 32
NEXTAUTH_SECRET=GENERA_UNO_NUEVO_AQUI_CON_OPENSSL

# 2. MongoDB URI
# Usa MongoDB Atlas, no expongas tu DB local
MONGODB_URI=mongodb+srv://...

# 3. Anthropic API Key
# Considera usar diferentes keys para dev/prod
ANTHROPIC_API_KEY=sk-ant-...

# 4. NextAuth URL
# Debe ser tu dominio de producción con HTTPS
NEXTAUTH_URL=https://tudominio.com
```

### Checklist de Seguridad:

- [ ] `NEXTAUTH_SECRET` es diferente al de desarrollo
- [ ] MongoDB tiene autenticación habilitada
- [ ] API Keys no están en el código (solo en env vars)
- [ ] `.env` está en `.gitignore`
- [ ] HTTPS está habilitado (automático en Vercel/Railway)
- [ ] Credenciales de admin por defecto fueron cambiadas
- [ ] MongoDB Network Access está configurado correctamente

---

## 🔄 Continuous Deployment

### Configuración con GitHub:

1. **Push to Deploy**
   - Todos los servicios ofrecen auto-deploy desde Git
   - Vercel: Push a `main` → Deploy automático
   - Railway: Push a cualquier branch → Deploy

2. **Preview Deployments**
   - Vercel crea preview URLs para cada PR
   - Útil para revisar cambios antes de mergear

3. **Rollback Rápido**
   - Todos los servicios permiten volver a versiones anteriores
   - Vercel: Deployments > Previous deployment > Promote

---

## 🌍 Configuración de Dominio Personalizado

### En Vercel:

1. **Compra un dominio** (GoDaddy, Namecheap, etc.)

2. **Agregar en Vercel**
   - Settings > Domains
   - Add Domain: `tudominio.com`

3. **Configurar DNS**
   - En tu proveedor de dominio, agrega:
   ```
   Type: CNAME
   Name: @
   Value: cname.vercel-dns.com
   ```

4. **Esperar Propagación**
   - 5 minutos a 48 horas
   - Vercel automáticamente configura HTTPS

---

## 📊 Monitoreo y Analytics

### Vercel Analytics

```bash
# Instalar
npm install @vercel/analytics

# En src/app/layout.tsx agregar:
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

### Sentry (Error Tracking)

1. **Crear cuenta en Sentry.io**

2. **Instalar SDK**
   ```bash
   npm install @sentry/nextjs
   ```

3. **Configurar**
   ```bash
   npx @sentry/wizard -i nextjs
   ```

---

## 🔧 Optimizaciones de Producción

### 1. Variables de Entorno

```env
# Production optimizations
NODE_ENV=production
```

### 2. Caching

Next.js automáticamente cachea en producción, pero puedes optimizar:

```javascript
// next.config.js
module.exports = {
  images: {
    domains: ['tudominio.com'],
    formats: ['image/avif', 'image/webp'],
  },
  // Compress
  compress: true,
}
```

### 3. MongoDB Indexes

Después del primer deploy, agrega índices a MongoDB:

```javascript
// Conecta a tu DB y ejecuta:
db.campaigns.createIndex({ "createdAt": -1 });
db.campaignrequests.createIndex({ "status": 1, "createdAt": -1 });
db.campaignrequests.createIndex({ "clientInfo.email": 1 });
```

---

## 💰 Costos Estimados

### Opción 1: Gratis (Ideal para comenzar)
- **Hosting**: Vercel Free Tier
- **Base de Datos**: MongoDB Atlas Free (512MB)
- **AI**: Anthropic API (pay-as-you-go, ~$0.003 por campaña)
- **Total**: $0/mes + costo variable de API (~$5-20/mes para 1000-5000 campañas)

### Opción 2: Básico ($12-20/mes)
- **Hosting**: Vercel Pro ($20/mes)
- **Base de Datos**: MongoDB Atlas Shared ($9/mes)
- **AI**: Anthropic API
- **Total**: $29/mes + API costs

### Opción 3: Profesional ($50-100/mes)
- **Hosting**: Vercel Pro + Teams
- **Base de Datos**: MongoDB Atlas Dedicated
- **Dominio**: $12/año
- **Email**: Google Workspace ($6/usuario/mes)
- **CDN**: Incluido en Vercel

---

## 🚦 Checklist Pre-Launch

- [ ] Todas las variables de entorno configuradas
- [ ] MongoDB Atlas funcionando y accesible
- [ ] API Key de Anthropic activa y con créditos
- [ ] HTTPS habilitado
- [ ] Dominio personalizado configurado (opcional)
- [ ] Credenciales de admin cambiadas
- [ ] Pruebas de generación de campaña funcionando
- [ ] Pruebas de creación de solicitudes funcionando
- [ ] CRM login funcionando
- [ ] Workflow completo probado
- [ ] Error tracking configurado (Sentry)
- [ ] Analytics configurado
- [ ] Backups de MongoDB configurados

---

## 🔄 Actualizar Producción

### Deployment Automático (Recomendado):

```bash
# 1. Hacer cambios localmente
git add .
git commit -m "feat: nueva característica"

# 2. Push a main
git push origin main

# 3. Vercel/Railway detecta y deploya automáticamente
# Espera 2-3 minutos
```

### Deployment Manual:

```bash
# Si usas Vercel CLI
vercel --prod

# Si usas Railway CLI
railway up
```

---

## 🆘 Troubleshooting en Producción

### Error: "Cannot connect to database"
1. Verifica `MONGODB_URI` en variables de entorno
2. Verifica Network Access en MongoDB Atlas
3. Verifica que el password no tenga caracteres especiales sin encodear

### Error: "API Key invalid"
1. Verifica que `ANTHROPIC_API_KEY` esté configurada
2. Verifica que tenga el formato correcto: `sk-ant-api03-...`
3. Verifica que tu cuenta tenga créditos

### Error: "NextAuth session error"
1. Verifica que `NEXTAUTH_URL` coincida con tu dominio
2. Verifica que `NEXTAUTH_SECRET` esté configurado
3. Limpia cookies y vuelve a intentar

### Sitio lento
1. Revisa los logs de tu servicio de hosting
2. Considera upgrade de MongoDB (si estás en free tier)
3. Optimiza imágenes y assets
4. Agrega caching

---

## 📞 Soporte

Si tienes problemas con el deployment:

1. **Revisa los logs**
   - Vercel: Deployment > Logs
   - Railway: Deployment > Logs

2. **Documentación oficial**
   - [Vercel Docs](https://vercel.com/docs)
   - [MongoDB Atlas Docs](https://docs.atlas.mongodb.com/)
   - [Next.js Deployment](https://nextjs.org/docs/deployment)

3. **Comunidad**
   - Vercel Discord
   - Next.js GitHub Discussions

---

**¡Tu portal está listo para producción! 🎉**

Recuerda mantener actualizadas tus dependencias y hacer backups regulares de tu base de datos.

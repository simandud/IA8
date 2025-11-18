# 🚀 Guía de Inicio Rápido

Esta guía te ayudará a tener el sistema funcionando en **menos de 10 minutos**.

## ⚡ Inicio Rápido (3 pasos)

### 1️⃣ Instalar Dependencias

```bash
npm install
```

### 2️⃣ Configurar Variables de Entorno

Copia el archivo de ejemplo y edítalo:

```bash
cp .env.example .env
```

Abre `.env` y configura:

```env
# Obligatorio: Tu API Key de Claude
ANTHROPIC_API_KEY=sk-ant-api03-tu-api-key-aqui

# Obligatorio: Base de datos (usa esta para desarrollo)
MONGODB_URI=mongodb://localhost:27017/marketing-campaigns

# Obligatorio: NextAuth Secret (genera uno)
NEXTAUTH_SECRET=cualquier-string-secreto-muy-largo-y-aleatorio

# Opcional (por defecto está bien)
NEXTAUTH_URL=http://localhost:3000
```

### 3️⃣ Iniciar MongoDB y la Aplicación

**Opción A: MongoDB Local**

```bash
# En una terminal
mongod

# En otra terminal
npm run dev
```

**Opción B: MongoDB Atlas (Cloud - Gratis)**

1. Ve a https://www.mongodb.com/atlas
2. Crea una cuenta gratis
3. Crea un cluster gratuito
4. Obtén tu connection string
5. Pégalo en `MONGODB_URI`

```bash
npm run dev
```

## ✅ Verificar que Funciona

1. Abre `http://localhost:3000`
2. Deberías ver la landing page
3. Haz clic en "Generar Mi Campaña"
4. Completa el formulario y genera una campaña de prueba

## 🔑 Credenciales del CRM

Para acceder al panel de administración:

- **URL**: `http://localhost:3000/crm/login`
- **Email**: `admin@cuenca.com`
- **Password**: `admin123`

## 📝 Cómo Obtener la API Key de Claude

1. **Regístrate** en https://console.anthropic.com/
2. Ve a **"API Keys"** en el menú
3. Haz clic en **"Create Key"**
4. Copia la key (empieza con `sk-ant-`)
5. Pégala en tu archivo `.env`

**Nota**: Necesitarás agregar créditos a tu cuenta de Anthropic. Ofrecen $5 gratis al registrarte.

## 🐛 Problemas Comunes

### "Error: Cannot connect to MongoDB"

**Solución 1**: Verifica que MongoDB esté corriendo
```bash
# Verificar si MongoDB está corriendo
ps aux | grep mongod

# Si no está corriendo, inícialo
mongod
```

**Solución 2**: Usa MongoDB Atlas (cloud) - Es más fácil y gratis

### "Error: Invalid API Key"

- Verifica que hayas copiado bien la API key
- Asegúrate de que no tenga espacios al inicio o final
- Verifica que tu cuenta de Anthropic tenga créditos

### "Error: Module not found"

```bash
# Limpia e instala de nuevo
rm -rf node_modules package-lock.json
npm install
```

### Puerto 3000 ya está en uso

```bash
# Opción 1: Mata el proceso
lsof -ti:3000 | xargs kill -9

# Opción 2: Usa otro puerto
PORT=3001 npm run dev
```

## 📱 Flujo de Uso Básico

### Como Cliente:

1. **Inicio** → Haz clic en "Generar Mi Campaña"
2. **Formulario** → Describe tu producto/servicio
3. **Generar** → Espera 10-30 segundos
4. **Revisar** → Ve tu campaña completa generada
5. **Solicitar** → Haz clic en "Solicitar Implementación"
6. **Datos** → Completa tus datos de contacto
7. **Enviar** → ¡Listo! El equipo recibirá tu solicitud

### Como Administrador (CRM):

1. **Login** → Accede con admin@cuenca.com
2. **Dashboard** → Ve estadísticas generales
3. **Solicitudes** → Lista de todas las solicitudes
4. **Detalle** → Click en una solicitud
5. **Gestionar** → Actualiza estados del workflow
6. **Notas** → Agrega notas internas para el equipo

## 🎯 Prueba Rápida

Copia y pega este ejemplo en el generador:

**Producto/Servicio:**
```
Restaurante de comida típica cuencana, especializado en hornado,
mote pillo y cascaritas. Ubicado en el Centro Histórico de Cuenca.
Ambiente familiar y tradicional.
```

**Ubicación:**
```
Centro Histórico, Cuenca, Ecuador
```

**Presupuesto:**
```
$1000 - $2000 mensuales
```

Genera la campaña y verás un ejemplo completo de lo que el sistema puede hacer.

## 🔧 Comandos Útiles

```bash
# Desarrollo
npm run dev

# Build para producción
npm run build

# Iniciar en producción
npm start

# Linter
npm run lint

# Ver logs de MongoDB (si usas local)
tail -f /usr/local/var/log/mongodb/mongo.log
```

## 📚 Siguientes Pasos

Una vez que tengas el sistema funcionando:

1. ✅ Genera algunas campañas de prueba
2. ✅ Crea solicitudes de implementación
3. ✅ Prueba el workflow en el CRM
4. ✅ Personaliza los colores y estilos (ver README.md)
5. ✅ Modifica el prompt de IA según tus necesidades
6. ✅ Agrega más pasos al workflow si lo necesitas

## 💡 Tips Pro

1. **Prompt más específico = Mejor campaña**
   - Incluye detalles sobre tu público objetivo
   - Menciona tu competencia si la conoces
   - Especifica objetivos claros

2. **Usa el CRM para seguimiento**
   - Actualiza los estados regularmente
   - Usa las notas para comunicación interna
   - Marca pasos como completados cuando termines

3. **Personaliza para tu marca**
   - Cambia colores en `tailwind.config.ts`
   - Modifica el logo y nombre en las páginas
   - Ajusta el prompt de IA a tu industria

## 🆘 Necesitas Ayuda?

- 📖 Lee el [README.md](README.md) completo para más detalles
- 🔍 Revisa la sección de Troubleshooting
- 💬 Pregunta a tu equipo de desarrollo

---

**¡Listo para generar campañas increíbles con IA! 🚀**

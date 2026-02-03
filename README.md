---

# 🚀 Linergy

![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue)
![Vite](https://img.shields.io/badge/Vite-Fast-purple)
![Leaflet](https://img.shields.io/badge/Leaflet-Maps-green)
![Supabase](https://img.shields.io/badge/Supabase-Backend-3ecf8e)
![Mobile First](https://img.shields.io/badge/UI-Mobile--First-orange)
![Status](https://img.shields.io/badge/status-production--ready-success)
![License](https://img.shields.io/badge/license-internal-lightgrey)

---

# 📌 Descripción

**Linergy** es una plataforma web geoespacial para la **visualización, monitoreo y gestión de infraestructura eléctrica**.

Permite operar líneas de subtransmisión, estructuras y fallas sobre un **mapa interactivo**, con filtros dinámicos, simbología, reportes técnicos y optimización para uso en campo.

Fue diseñada bajo una arquitectura **Mobile-First**, priorizando:

* rendimiento
* simplicidad operativa
* claridad visual
* accesibilidad táctil
* baja carga cognitiva

---

---

# ✨ Características principales

## 🗺️ Mapa interactivo

* Leaflet
* Clustering
* Filtros en tiempo real
* Capas dinámicas
* Toggle de visibilidad
* Simbología colapsable
* Limpieza automática de overlays

## 📊 Gestión de datos

* Líneas
* Estructuras
* Fallas
* Reportes generados desde fallas (PDF)

## 📱 Mobile-First real

* Drawer lateral
* Tablas → tarjetas en móvil
* Scroll interno inteligente
* Controles táctiles grandes
* Layout fluido

## ⚡ Performance

* Code splitting
* Lazy loading
* React Query cache
* Limpieza de capas Leaflet
* Tipado estricto sin `any`

---

---

# 🧱 Stack Tecnológico

| Capa          | Tecnología                 |
| ------------- | -------------------------- |
| Frontend      | React 18 + TypeScript      |
| Bundler       | Vite                       |
| UI            | TailwindCSS                |
| Mapas         | Leaflet                    |
| Estado remoto | TanStack React Query       |
| Backend       | Supabase                   |
| Edge          | Deno Edge Functions        |
| Lint          | ESLint + TypeScript strict |

---

---

# 🗂️ Estructura del proyecto

```
linergy
│
├─ public/
│
├─ src/
│   ├─ components/
│   │   ├─ layout/
│   │   ├─ map/
│   │   ├─ ui/
│   │   └─ modals/
│   │
│   ├─ pages/
│   ├─ contexts/
│   ├─ hooks/
│   ├─ lib/
│   ├─ types/
│   └─ main.tsx
│
├─ supabase/
│   ├─ functions/
│   └─ migrations/
│
└─ package.json
```

---

---

# 🧠 Arquitectura

## Diagrama lógico

```
Usuario
   ↓
React UI
   ↓
React Query (cache)
   ↓
Supabase API
   ↓
PostgreSQL
   ↓
Edge Functions (Deno)
```

---

## Arquitectura C4 simplificada

### Contexto

```
Usuario → Linergy → Supabase
```

### Contenedores

```
Frontend SPA
Backend Supabase
Base de datos PostgreSQL
Edge Functions
```

---

---

# 🔧 Instalación

## Requisitos

* Node 18+
* npm 9+
* Git

---

## Clonar

```bash
git clone https://github.com/TUUSUARIO/linergy.git
cd linergy
```

---

## Instalar dependencias

```bash
npm install
```

---

## Desarrollo

```bash
npm run dev
```

```
http://localhost:5173
```

---

---

# 🧪 Scripts disponibles

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

---

---

# 🚀 Deploy

## Vercel (recomendado)

```bash
npm i -g vercel
vercel
```

Variables:

```
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
```

---

## Netlify

```bash
npm run build
```

Subir `/dist`.

---

## Docker (opcional)

```dockerfile
FROM node:18
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
CMD ["npm","run","preview"]
```

---

---

# ⚙️ Configuración Supabase

## Variables `.env`

```
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

---

## Edge Functions

Ubicación:

```
supabase/functions
```

Estas funciones usan **Deno runtime**.

### tsconfig.json

```
"exclude": ["supabase/functions"]
```

---

---

# 📊 Esquema de datos simplificado

```
lineas
 ├─ estructuras
 └─ fallas
```

Relación:

```
Linea 1 → N Estructuras
Linea 1 → N Fallas
```

---

---

# 📄 API Supabase (ejemplos)

## Obtener líneas

```ts
supabase.from('lineas').select('*')
```

## Obtener fallas

```ts
supabase.rpc('get_fallas_geojson')
```

## Interpolación geográfica

```ts
supabase.rpc('interpolate_line_point')
```

---

---

# 🧩 Tipado Geo

`src/types/geo.ts`

Incluye:

* Point
* LineString
* MultiLineString
* type guards

---

---

# 📱 UX / UI

## Mobile

* prioridad visual al mapa
* tarjetas compactas
* sidebar tipo drawer

## Desktop

* sidebar fijo
* contenido centrado
* max-width controlado

## Accesibilidad

* botones ≥ 44px
* contraste alto
* scroll interno en filtros

---

---

# 🛠️ Mejoras técnicas implementadas

## Lint / TypeScript

* strict mode
* sin `any`
* hooks seguros

## Leaflet

* LayerGroup único
* limpieza por render
* sin duplicados

## Performance

* lazy routes
* suspense
* cache inteligente

---

---

# 👤 Manual de usuario

## Ver mapa

Abrir página principal.

## Activar capas

Panel Visibilidad → Estructuras/Fallas.

## Buscar

Barra superior → Enter → limpia automáticamente.

## Generar reporte

Botón PDF en cada falla.

## Salir

Menú lateral inferior.

---

---

# 🧑‍💻 Manual técnico

## Añadir nueva página

```
src/pages/
```

Importar con lazy.

## Añadir nueva capa mapa

Usar `LayerGroup` dentro de `LeafletMap`.

## Añadir endpoint

Crear RPC en Supabase.

---

---

# 🧪 Checklist QA

* [ ] mapa carga
* [ ] filtros funcionan
* [ ] mobile scroll correcto
* [ ] export PDF
* [ ] logout visible
* [ ] sin errores consola
* [ ] lint limpio

---

---

# 🔒 Seguridad

* Supabase RLS
* claves anon
* sin secretos frontend
* validaciones server-side

---

---

# 🐛 Troubleshooting

### Cannot find Deno

Excluir functions en tsconfig.

### mapa lento

revisar duplicados Leaflet.

### filtros no aplican

verificar enums backend/frontend.

---

---

# 🧭 Roadmap

* PWA offline
* dark mode
* export CSV
* clustering avanzado
* roles/permiso
* auditoría de cambios

---

---

# 🧑‍💻 Git Workflow

```bash
git checkout -b feature/xyz
git commit -m "feat: xyz"
git push
```

PR → main

---

---

# 📸 Capturas (agregar en /docs)

```
docs/map.png
docs/mobile.png
docs/report.png
```

---

---

# 📜 Licencia

Uso interno / académico / institucional.

---

---

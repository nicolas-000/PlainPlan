# 📋 Plain Plan

Sistema de gestión de proyectos y trabajadores. Simple, rápido y efectivo.

---

## 🔹 Cómo ejecutar el proyecto

### Requisitos previos

- **Node.js** ≥ 18
- **pnpm** (gestor de paquetes) — instalar con `npm install -g pnpm` si no lo tienes

### Pasos

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/nicolas-000/PlainPlan.git
   cd PlainPlan
   ```

2. **Instalar dependencias:**
   ```bash
   pnpm install
   ```

3. **Ejecutar en modo desarrollo:**
   ```bash
   pnpm dev
   ```

4. **Abrir en el navegador:**
   [http://localhost:10011](http://localhost:10011)

> No se requiere configuración adicional. La base de datos (`data/db.json`) se crea automáticamente al primer uso.

### Scripts disponibles

| Script | Descripción |
|--------|-------------|
| `pnpm dev` | Servidor de desarrollo en puerto 10011 |
| `pnpm build` | Compilar para producción |
| `pnpm start` | Servidor de producción |
| `pnpm lint` | Ejecutar ESLint |

---

## 🔹 Decisiones técnicas

### Stack elegido

| Tecnología | Versión | Motivo |
|------------|---------|--------|
| **Next.js** | 16 | App Router con API Routes integradas; un solo proyecto sirve frontend y backend |
| **React** | 19 | Última versión estable, aprovechando mejoras de rendimiento |
| **TypeScript** | 5 | Tipado estricto para prevenir errores en tiempo de desarrollo |
| **Tailwind CSS** | 4 | Estilos utilitarios que eliminan la necesidad de archivos CSS separados y aceleran el prototipado |
| **pnpm** | — | Más rápido y eficiente en disco que npm/yarn |

### Estructura del proyecto

```
app/
├── api/                   # API REST (Route Handlers de Next.js)
│   ├── projects/          #   CRUD de proyectos + asignación
│   └── workers/           #   CRUD de trabajadores
├── components/            # Componentes de UI reutilizables
│   ├── Navbar.tsx         #   Navegación responsive con menú hamburguesa
│   ├── ProjectForm.tsx    #   Formulario de creación de proyecto
│   ├── ProjectList.tsx    #   Lista de proyectos con acciones
│   ├── WorkerForm.tsx     #   Formulario de creación de trabajador
│   └── WorkerList.tsx     #   Lista de trabajadores con acciones
├── projects/              # Página /projects
├── workers/               # Página /workers
├── globals.css            # Variables CSS y estilos globales
├── layout.tsx             # Layout raíz (Navbar + Footer)
└── page.tsx               # Página principal (landing)
lib/
├── db.ts                  # Capa de acceso a datos (lectura/escritura a JSON)
├── store.ts               # Fachada que re-exporta funciones de db.ts
└── types.ts               # Tipos compartidos (Worker, Project, Seniority)
data/
└── db.json                # Base de datos local (se auto-genera)
```

**¿Por qué esta estructura?**

- **Separación por dominio:** cada entidad (workers, projects) tiene su propia carpeta de API y su página. Esto facilita la navegación y la escalabilidad.
- **Capa `lib/` desacoplada:** `db.ts` encapsula toda la lógica de persistencia. Si se quisiera migrar a una base de datos real (PostgreSQL, MongoDB, etc.), solo se cambia ese archivo sin tocar los handlers ni los componentes.
- **`store.ts` como fachada:** actúa como punto de entrada único para el acceso a datos desde los API routes. Permite intercambiar la implementación interna sin afectar a los consumidores.
- **Componentes colocados junto a las páginas** (`app/components/`): al ser una aplicación pequeña, mantener todo dentro de `app/` evita navegación innecesaria entre carpetas.

### Qué prioricé

- **Funcionalidad completa:** CRUD de trabajadores y proyectos con asignación muchos-a-muchos.
- **Cero configuración:** sin base de datos externa, sin variables de entorno, sin Docker. `pnpm install && pnpm dev` y funciona.
- **Tipado estricto:** interfaces TypeScript compartidas entre frontend y backend para evitar errores de integración.
- **UI responsiva:** diseño mobile-first con Tailwind, incluyendo navegación hamburguesa para móviles.
- **Persistencia normalizada:** aunque el almacenamiento es un JSON, los datos están normalizados con una tabla intermedia `project_workers` (relación muchos-a-muchos), simulando una base de datos relacional.

### Qué dejé fuera

- **Base de datos real:** para simplificar el setup se usa un archivo JSON. Esto no escala ni soporta concurrencia.
- **Autenticación/autorización:** no hay login ni roles de usuario.
- **Testing:** no se incluyeron tests unitarios ni de integración.
- **Validación robusta:** la validación en los endpoints es básica (campos requeridos). No se usa Zod ni similar.
- **Estado global en cliente:** se usa `useState` + `fetch` directo. No hay React Query, SWR ni Context para caché/estado compartido.
- **Paginación:** las listas muestran todos los registros. Con muchos datos esto sería un problema.

---

## 🔹 Mejoras futuras

Si tuviera más tiempo, estas serían las mejoras que implementaría:

### Qué mejoraría

- **Validación con Zod:** esquemas de validación compartidos entre cliente y servidor para garantizar integridad de datos con mensajes de error claros.
- **CRUD de Clientes:** esquema para los clientes definidos en los proyectos.
- **Manejo de errores:** respuestas de error estandarizadas en la API con códigos y mensajes consistentes; notificaciones toast en el frontend.
- **Persistencia real:** migrar a SQLite (con Drizzle ORM) o PostgreSQL para soportar concurrencia y consultas más eficientes.
- **Data fetching:** reemplazar `fetch` manual por React Query o SWR para caché automático, revalidación y estados de carga/error.

### Qué agregaría

- **Tests:** unitarios con Vitest para la capa de datos, de integración para los endpoints, y E2E con Playwright para los flujos principales.
- **Autenticación:** NextAuth.js con al menos un provider (credenciales o GitHub) y middleware de protección de rutas.
- **Búsqueda y filtros:** filtrar trabajadores por seniority/rol, proyectos por cliente/fecha; barra de búsqueda global.
- **Paginación:** paginación server-side en la API y componente de paginación en el frontend.
- **Dashboard:** página principal con métricas (total de proyectos activos, distribución de seniority, proyectos por cliente, trabajadores sin asignar).
- **Dark/Light mode toggle:** ya hay variables CSS preparadas; solo falta el switch de tema.

### Qué cambiaría

- **Server Components:** aprovechar React Server Components de Next.js para las páginas de listado, reduciendo el JavaScript enviado al cliente.
- **Server Actions:** reemplazar los API routes con Server Actions de Next.js para las mutaciones, simplificando la arquitectura.
- **Estructura de carpetas:** con más entidades, migraría a una estructura por feature (`features/workers/`, `features/projects/`) con componentes, hooks y tipos colocados juntos.
- **Formularios:** usar `react-hook-form` para manejo de estado de formularios, validación en tiempo real y mejor UX.

---

## 📖 Referencia rápida

### API REST

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/workers` | Listar trabajadores |
| POST | `/api/workers` | Crear trabajador |
| GET | `/api/workers/[id]` | Obtener trabajador |
| PUT | `/api/workers/[id]` | Actualizar trabajador |
| DELETE | `/api/workers/[id]` | Eliminar trabajador |
| GET | `/api/projects` | Listar proyectos |
| POST | `/api/projects` | Crear proyecto |
| GET | `/api/projects/[id]` | Obtener proyecto |
| PUT | `/api/projects/[id]` | Actualizar proyecto |
| DELETE | `/api/projects/[id]` | Eliminar proyecto |
| POST | `/api/projects/assign` | Asignar trabajador a proyecto |
| DELETE | `/api/projects/assign` | Quitar trabajador de proyecto |

### Modelos de datos

**Worker:** `id`, `name`, `role`, `seniority` (junior | semi-senior | senior)

**Project:** `id`, `name`, `client`, `startDate`, `endDate?`, `workerIds[]`

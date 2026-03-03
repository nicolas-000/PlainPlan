# 📋 Plain Plan

Sistema de gestión de proyectos y trabajadores. Simple, rápido y efectivo.

## 🚀 Tecnologías

- **Next.js 16** - Framework de React para producción
- **React 19** - Biblioteca para interfaces de usuario
- **TypeScript** - Tipado estático
- **Tailwind CSS 4** - Framework de estilos CSS
- **pnpm** - Gestor de paquetes

## 📁 Estructura del Proyecto

```
├── app/
│   ├── api/
│   │   ├── projects/      # API REST de proyectos
│   │   └── workers/       # API REST de trabajadores
│   ├── components/        # Componentes reutilizables
│   │   ├── Navbar.tsx
│   │   ├── ProjectForm.tsx
│   │   ├── ProjectList.tsx
│   │   ├── WorkerForm.tsx
│   │   └── WorkerList.tsx
│   ├── projects/          # Página de proyectos
│   ├── workers/           # Página de trabajadores
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx           # Página principal
├── data/
│   └── db.json            # Base de datos local (JSON)
├── lib/
│   ├── db.ts              # Capa de acceso a datos
│   ├── store.ts           # Funciones del store
│   └── types.ts           # Tipos TypeScript
└── public/
```

## 🛠️ Instalación

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

## 📖 Scripts Disponibles

| Script | Descripción |
|--------|-------------|
| `pnpm dev` | Inicia el servidor de desarrollo en el puerto 10011 |
| `pnpm build` | Compila la aplicación para producción |
| `pnpm start` | Inicia el servidor de producción |
| `pnpm lint` | Ejecuta el linter (ESLint) |

## 🗃️ Modelos de Datos

### Trabajador (Worker)

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | string | Identificador único |
| `name` | string | Nombre del trabajador |
| `role` | string | Rol o puesto |
| `seniority` | `'junior' \| 'semi-senior' \| 'senior'` | Nivel de experiencia |

### Proyecto (Project)

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | string | Identificador único |
| `name` | string | Nombre del proyecto |
| `client` | string | Nombre del cliente |
| `startDate` | string | Fecha de inicio |
| `endDate` | string (opcional) | Fecha de finalización |
| `workerIds` | string[] | IDs de trabajadores asignados |

## 🔌 API REST

### Trabajadores

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/workers` | Obtener todos los trabajadores |
| POST | `/api/workers` | Crear un trabajador |
| GET | `/api/workers/[id]` | Obtener un trabajador por ID |
| PUT | `/api/workers/[id]` | Actualizar un trabajador |
| DELETE | `/api/workers/[id]` | Eliminar un trabajador |

### Proyectos

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/projects` | Obtener todos los proyectos |
| POST | `/api/projects` | Crear un proyecto |
| GET | `/api/projects/[id]` | Obtener un proyecto por ID |
| PUT | `/api/projects/[id]` | Actualizar un proyecto |
| DELETE | `/api/projects/[id]` | Eliminar un proyecto |
| POST | `/api/projects/assign` | Asignar trabajador a proyecto |
| DELETE | `/api/projects/assign` | Quitar trabajador de proyecto |

## 💾 Persistencia

Los datos se almacenan localmente en un archivo JSON (`data/db.json`). Este archivo se crea automáticamente al iniciar la aplicación si no existe.

## 📝 Características

- ✅ Gestión completa de trabajadores (CRUD)
- ✅ Gestión completa de proyectos (CRUD)
- ✅ Asignación de trabajadores a proyectos
- ✅ Clasificación por seniority (Junior, Semi-Senior, Senior)
- ✅ Interfaz moderna y responsiva
- ✅ Persistencia local con JSON

## 🤝 Contribuir

1. Haz fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Haz commit de tus cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Haz push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

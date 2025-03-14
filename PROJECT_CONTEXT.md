# Contexto del Proyecto

## Descripción General

Este proyecto utiliza Next.js con Typescript como lenguaje principal, TailwindCSS para el estilo, Sequelize como ORM, Sequelize-cli para la creación de modelos y migraciones, y PostgreSQL como base de datos.

JITI es una aplicación web que permite a los usuarios crear boards (o tableros), agregando tareas a cada tablero, y asignando responsables a cada tarea.

## Arquitectura

- **Frontend**: Next.js 14 con App Router
- **Lenguaje**: TypeScript
- **Estilo**: Tailwind
- **Estado**: To be determined (Zustand, Jotai, etc.), según recomendaciones de Cursor.
- **ORM**: Sequelize
- **Base de datos**: PostgreSQL
- **Seguridad**: NextAuth con JWT

## Funcionalidades principales

- Crear editar y eliminar boards (tableros).
- Agregar tareas a cada board (con detalles como descripción, fecha de inicio, fecha de fin, estado, responsable y prioridad).
- Asignar responsables a cada tarea.
- Asignar estados (pendiente, en progreso, completada) a cada tarea.
- Verificar el progreso de cada tarea.
- Invitados a los boards (los usuarios invitados pueden ver los boards, pero no editar ninguna tarea que no le esté asignada).
- Responsable de cada board (el responsable puede ver el board, agregar tareas, asignar responsables a las tareas y ver el progreso de las tareas).
- Preferencias de usuario (boards):
  - Asignar colores a cada board.
  - Asignar iconos a cada board.
  - Asignar imagen de fondo a cada board.
  - Asignar fecha de creación, fecha de actualización y fecha de eliminación a cada board.
  - Asignar fecha de inicio y fecha de fin a cada tarea.
  - Asignar prioridad a cada tarea.
  - Privacidad: público, privado, solo invitados.
- Preferencias de usuario (tareas):
  - Asignar colores a cada tarea.
  - Asignar iconos a cada tarea.
  - Asignar imagen de fondo a cada tarea.
  - Asignar fecha de creación, fecha de actualización y fecha de eliminación a cada tarea.
  - Asignar fecha de inicio y fecha de fin a cada tarea.
  - Asignar prioridad a cada tarea.
- Preferencias de usuario (usuarios):
  - Privacidad de perfil: público, privado, sólo amigos.
- Drag and drop para reordenar tareas dentro de un board.
- Historial de cambios de cada board.
- Seguridad: NextAuth con JWT.
- Autenticación: Email.
- Autorización: Roles y permisos (por board).
- Dashboard de usuario:
- Boards a los que ha accedido últimamente.
- Boards de los que es responsable.
- Boards en los que es participante.
- Tareas pendientes (por fecha de fin y en orden de prioridad).
- Distintas vistas de board:
  - Vista de Kanban.
  - Vista de timeline.
  - Vista de calendario.
  - Vista de mind map.
  - Vista de Gantt.

## Could Have

- Chat de cada board.
- Notificaciones de eventos del board.
- Sugerencias de tareas (AI).
- Automatización de tareas (AI).
- Integración con terceros (OpenAI, Google, Slack, Discord etc.).
- Exportar board a PDF, Excel, etc.
- Modo offline (guardar cambios en local y sincronizar con el servidor) con IndexedDB, PWA o WebSQL.
- Reglas (ej: Si una tarea cambia su estado a "completada", se le asigna un comentario de agradecimiento, o se le asigna a X usuario).

## Estructura del Proyecto

```
proyecto/
├── public/           # Archivos estáticos
└── src/          # Archivos estáticos de la aplicación
    ├── app/
    │   ├── api/          # Rutas de API
    │   └── [rutas]/      # Páginas de la aplicación
    │       └── [subruta]/   # Subrutas de la página
    │           └── page.tsx
    │   └── [ruta]/        # Página de la aplicación
    │       └── page.tsx

    └── types/            # Definiciones de tipos
    ├── db/
    │   ├── config/       # Configuración de Sequelize-CIL
    │   ├── models/       # Modelos de Sequelize
    │   ├── migrations/   # Migraciones de Sequelize
    │   ├── seeders/      # Seeders de Sequelize
    │   └── database.ts   # Configuración de la base de datos
    ├── services/         # Servicios de la aplicación, lógica de negocio, para hacer más fácil la prueba de unidades, reutilización de códig y futuras migraciones.
    ├── constants/        # Constantes de la aplicación.
    ├── utils/            # Utilidades de la aplicación.
    ├── styles/           # Estilos de la aplicación.
    ├── components/       # Componentes reutilizables.
    ├── hooks/            # Hooks de la aplicación.
    ├── types/            # Definiciones de tipos.
    ├── libs/             # Librerías externas.
    ├── tests/            # Pruebas de la aplicación.
```

## Convenciones de Código

### Nombrado

- **Componentes React**:

- PascalCase (ej: `UserProfile.tsx`, `BoardList.tsx`)
- Usar sufijo descriptivo (ej: `Button.component.tsx`, `User.interface.ts`)
- Los componentes de página van en `app/[ruta]/page.tsx`

- **Funciones**:

- camelCase para funciones regulares (ej: `getUserData()`, `updateBoardStatus()`)
- Prefijo 'use' para hooks personalizados (ej: `useBoard()`, `useTaskDrag()`)
- Handlers con prefijo 'handle' (ej: `handleSubmit()`, `handleDragEnd()`)

- **Variables y Propiedades**:

- camelCase (ej: `userData`, `boardConfig`)
- Booleanos con prefijo is/has/should (ej: `isLoading`, `hasPermission`)

- **Constantes**:

- UPPER_SNAKE_CASE para valores inmutables (ej: `API_URL`, `DEFAULT_BOARD_COLOR`)
- Agrupar en archivos por dominio (ej: `constants/board.ts`, `constants/auth.ts`)

- **Tipos y Interfaces**:
- PascalCase con prefijo I para interfaces (ej: `IBoard`, `ITask`)
- PascalCase con sufijo descriptivo para tipos (ej: `BoardStatus`, `TaskPriority`)

### Estructura de Archivos

- Un componente por archivo
- Imports agrupados en el siguiente orden:

    ```typescript
    // 1. React y Next.js
    import { useState } from 'react';
    import { useRouter } from 'next/router';

    // 2. Librerías externas
    import { motion } from 'framer-motion';

    // 3. Componentes propios
    import { Button } from '@/components';

    // 4. Hooks, utils, y servicios
    import { useBoard } from '@/hooks';
    import { formatDate } from '@/utils';

    // 5. Types e interfaces
    import type { IBoard } from '@/types';

    // 6. Constantes y assets
    import { BOARD_STATES } from '@/constants';
    ```

### Estilos con TailwindCSS

- Usar clases utilitarias de Tailwind
- Extraer componentes para patrones repetitivos
- Mantener orden consistente en clases:

    ```tsx
    <div className="
      // Layout y posicionamiento
      flex items-center justify-between
      // Dimensiones y espaciado
      w-full p-4 gap-2
      // Fondo y bordes
      bg-white rounded-lg border
      // Estados y variantes
      hover:bg-gray-50
      // Responsive
      md:p-6
    ">
    ```

### Patrones de Diseño

- **Composición sobre Herencia**
- **Render Props** para lógica compartida
- **Custom Hooks** para lógica reutilizable
- **Container/Presentational Pattern**:
- Separar lógica de negocio de la presentación
- Containers manejan estado y lógica
  - Componentes presentacionales son pure functions

### Manejo de Estado

- Usar estados locales para UI simple
- Zustand/Jotai para estado global
- Mantener estado mínimo necesario
- Normalizar datos complejos

### Manejo de Errores

- Usar try/catch en operaciones asíncronas
- Implementar error boundaries por sección
- Mensajes de error descriptivos
- Logging consistente

### Testing

- Tests unitarios para utils y hooks
- Tests de integración para flujos críticos
- Snapshots para componentes UI
- Naming: `[componente].[tipo_test].test.ts`

### Documentación

- JSDoc para funciones públicas y tipos
- README por directorio para contexto
- Comentarios explicando "por qué" no "qué"
- Ejemplos de uso en componentes complejos

### Git

- Commits semánticos: `feat:`, `fix:`, `refactor:`, `docs:`, etc.
- Branch naming: `feature/`, `bugfix/`, `hotfix/`
- PR templates con checklist
- Squash merges para features

## Flujo de Trabajo

1. **Desarrollo Local**

    - Usar `npm run dev` para desarrollo
    - Hot-reload activado
    - Puerto por defecto: 3000

2. **Testing**

    - [Describe tu estrategia de testing]
    - [Herramientas utilizadas]

3. **Despliegue**
    - [Describe tu proceso de despliegue]
    - [Entornos disponibles]

## Dependencias Principales

- Next.js: [versión]
- React: [versión]
- TypeScript: [versión]
- Sequelize: [versión]
- Sequelize-cli: [versión]
- PostgreSQL: [versión]
- NextAuth: [versión]
- TailwindCSS: [versión]

## Configuración de Entorno

```env
# Ejemplo de variables de entorno necesarias
NEXT_PUBLIC_API_URL=
DATABASE_URL=
# ... otras variables
```

## Notas Adicionales

[Cualquier otra información relevante para el desarrollo]

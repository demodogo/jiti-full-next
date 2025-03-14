# JITI - Tu Herramienta de Gestión de Proyectos con IA 🚀

JITI es una aplicación moderna de gestión de proyectos potenciada por IA que te ayuda a optimizar tu flujo de trabajo con herramientas intuitivas, automatizaciones y colaboración en tiempo real.

## 🌟 Características

- 🤖 Integración con IA para automatización de tareas
- 🎨 Interfaz moderna y responsive con soporte para modo oscuro
- ⚡ Desarrollado con Next.js 14 para máximo rendimiento
- 🔄 Actualizaciones en tiempo real
- 📱 Diseño mobile-first
- 🎭 Modo claro/oscuro automático

## 🛠️ Tecnologías

- [Next.js 14](https://nextjs.org/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [next-themes](https://github.com/pacocoursey/next-themes)

## 📋 Requisitos Previos

- Node.js 18.x o superior
- npm o pnpm

## 🚀 Instalación

1.Clona el repositorio:

```bash
git clone https://github.com/demodogo/jiti-fs-next.git
cd jiti-fs-next
```

2.Instala las dependencias:

```bash
npm install
# o
pnpm install
```

3.Crea un archivo `.env.local` con las variables de entorno necesarias:

```bash
cp .env.example .env.local
```

4.Inicia el servidor de desarrollo:

```bash
npm run dev
# o
pnpm dev
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000)

## 🔧 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run start` - Inicia la aplicación en modo producción
- `npm run lint` - Ejecuta el linter
- `npm run test` - Ejecuta los tests

## 📁 Estructura del Proyecto

```plaintext
jiti-fs-next/
├── src/
│   ├── app/              # App router y configuración principal
│   ├── components/       # Componentes React reutilizables
│   ├── styles/          # Estilos globales y CSS modules
│   ├── lib/             # Utilidades y helpers
│   ├── types/           # Definiciones de TypeScript
│   └── services/        # Servicios y lógica de negocio
├── public/              # Archivos estáticos
├── tests/              # Tests
└── .cursor/            # Configuraciones específicas para la IA del proyecto
```

> **Nota**: La carpeta `.cursor` se incluye en el repositorio ya que contiene configuraciones específicas para la integración con IA que son esenciales para el desarrollo del proyecto.

## 🎨 Temas y Estilos

JITI incluye soporte para modo claro y oscuro utilizando `next-themes`. El tema se sincroniza automáticamente con las preferencias del sistema del usuario, pero también puede cambiarse manualmente.

### Personalización de Colores

Los colores principales del tema están definidos en `tailwind.config.js` y pueden ser personalizados según las necesidades del proyecto.

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'feat: add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 👥 Autores

- Macarena Muñoz - [@demodogo](https://github.com/demodogo)

⌨️ con ❤️ por [demodogo](https://github.com/demodogo)

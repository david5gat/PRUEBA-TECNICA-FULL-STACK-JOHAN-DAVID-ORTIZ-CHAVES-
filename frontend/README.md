# Academia Frontend - React + TypeScript

Frontend para la gestión de alumnos, materias y notas en React con TypeScript.

## Requisitos Previos

- Node.js 18+ instalado
- npm o yarn
- Docker (opcional, para ejecución containerizada)

## Tecnologías Utilizadas

- React 18
- TypeScript
- Vite
- Axios
- HTML5 y CSS3

## Estructura del Proyecto

```
frontend/
├── src/
│   ├── components/       # Componentes React reutilizables
│   ├── pages/           # Páginas de la aplicación
│   ├── services/        # Servicios para llamadas API
│   ├── styles/          # Estilos CSS
│   ├── types/           # Tipos TypeScript
│   ├── App.tsx          # Componente principal
│   └── main.tsx         # Punto de entrada
├── public/              # Archivos estáticos
├── index.html           # HTML principal
├── package.json         # Dependencias
├── vite.config.ts       # Configuración Vite
├── tsconfig.json        # Configuración TypeScript
├── Dockerfile           # Dockerfile para containerización
├── .env                 # Variables de entorno (desarrollo)
├── .env.docker          # Variables de entorno (Docker)
└── README.md
```

## Configuración

### Variables de Entorno

Crear archivo `.env` en la raíz del proyecto:

```env
VITE_API_URL=http://localhost:8080/api
```

Para Docker, usar `.env.docker`:

```env
VITE_API_URL=http://api:8080/api
```

## Instrucciones de Ejecución

### Opción 1: Desarrollo Local

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Iniciar servidor de desarrollo:**
   ```bash
   npm run dev
   ```

3. **Acceder en el navegador:**
   ```
   http://localhost:5173
   ```

### Opción 2: Build y Producción

1. **Construir la aplicación:**
   ```bash
   npm run build
   ```

2. **Vista previa de la build:**
   ```bash
   npm run preview
   ```

### Opción 3: Con Docker

1. **Construir imagen Docker:**
   ```bash
   docker build -t academia-frontend .
   ```

2. **Ejecutar contenedor:**
   ```bash
   docker run -p 5173:5173 -e VITE_API_URL=http://localhost:8080/api academia-frontend
   ```

### Opción 4: Con Docker Compose

Ver el archivo `docker-compose.yml` en el directorio raíz del proyecto.

## Componentes Principales

### AlumnoForm
Formulario para crear y editar alumnos.

### AlumnoList
Tabla con lista de alumnos registrados.

### MateriaForm
Formulario para crear y editar materias.

### MateriaList
Tabla con lista de materias registradas.

### NotaForm
Formulario para registrar notas de alumnos.

### NotaList
Tabla con todas las notas registradas.

## Servicios API

### alumnoService
- `getAll()` - Obtener todos los alumnos
- `getById(id)` - Obtener alumno por ID
- `create(alumno)` - Crear nuevo alumno
- `update(id, alumno)` - Actualizar alumno
- `delete(id)` - Eliminar alumno

### materiaService
- `getAll()` - Obtener todas las materias
- `getById(id)` - Obtener materia por ID
- `create(materia)` - Crear nueva materia
- `update(id, materia)` - Actualizar materia
- `delete(id)` - Eliminar materia

### notaService
- `getAll()` - Obtener todas las notas
- `getByAlumno(alumnoId)` - Obtener notas de un alumno
- `getByAlumnoAndMateria(alumnoId, materiaId)` - Obtener notas por alumno y materia
- `create(nota)` - Registrar nueva nota
- `delete(id)` - Eliminar nota

## Funcionalidades

### Gestión de Alumnos
- ✅ Listar alumnos
- ✅ Crear alumno
- ✅ Editar alumno
- ✅ Eliminar alumno

### Gestión de Materias
- ✅ Listar materias
- ✅ Crear materia
- ✅ Editar materia
- ✅ Eliminar materia

### Gestión de Notas
- ✅ Registrar nota
- ✅ Listar notas por alumno
- ✅ Listar todas las notas
- ✅ Eliminar nota

## Troubleshooting

### La API no responde

1. Verificar que el servidor backend esté ejecutándose
2. Verificar la variable `VITE_API_URL` en `.env`
3. Revisar la consola del navegador (F12) para errores

### Puerto 5173 en uso

Cambiar el puerto en `vite.config.ts`:

```typescript
server: {
  port: 3000,
  host: '0.0.0.0'
}
```

### Problemas con CORS

Asegurarse de que el backend tenga habilitado CORS:

```java
@CrossOrigin(origins = "*")
```

## Licencia

Este proyecto es parte de una prueba técnica.

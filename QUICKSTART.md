# 🚀 Guía Rápida de Despliegue

## Requisitos Mínimos
- Docker y Docker Compose instalados
- Puerto 5432 (PostgreSQL)
- Puerto 8080 (API Backend)
- Puerto 5173 (Frontend)

## Ejecución en 5 Pasos

### 1. Clonar o descargar el repositorio
```bash
cd "Full Stack Junior"
```

### 2. Construir las imágenes Docker
```bash
docker-compose build
```

Este comando:
- Construye la imagen del Backend (Java/Spring Boot)
- Construye la imagen del Frontend (React)
- Prepara la imagen de PostgreSQL

**Tiempo estimado:** 3-5 minutos (depende de la conexión)

### 3. Iniciar los servicios
```bash
docker-compose up -d
```

Este comando:
- Inicia PostgreSQL y carga los datos de prueba
- Inicia el API Backend en puerto 8080
- Inicia el Frontend en puerto 5173
- Establece la conexión entre servicios

**Tiempo estimado:** 30-60 segundos

### 4. Verificar que los servicios estén corriendo
```bash
docker-compose ps
```

Debería mostrar tres contenedores en estado `Up`:
- academia_postgres
- academia_api
- academia_frontend

### 5. Acceder a la aplicación

**Frontend (Interfaz Web):**
```
http://localhost:5173
```

**Backend API:**
```
http://localhost:8080/api
```

**Prueba de API:**
```bash
curl http://localhost:8080/api/alumnos
```

## Datos de Prueba

La base de datos se precarga automáticamente con:
- 5 alumnos
- 6 materias
- 10 notas registradas

## Comandos Útiles

### Ver logs de todos los servicios
```bash
docker-compose logs -f
```

### Ver logs de un servicio específico
```bash
docker-compose logs -f api
docker-compose logs -f frontend
docker-compose logs -f postgres
```

### Entrar a la línea de comandos del API
```bash
docker-compose exec api bash
```

### Entrar a la línea de comandos del Frontend
```bash
docker-compose exec frontend sh
```

### Conectar a la base de datos
```bash
docker-compose exec postgres psql -U postgres -d academia_db
```

### Detener todos los servicios
```bash
docker-compose down
```

### Detener y limpiar todo (incluyendo datos)
```bash
docker-compose down -v
```

### Reconstruir todo (útil si hubo cambios)
```bash
docker-compose build --no-cache
docker-compose up -d
```

## Funcionalidades Disponibles

### Gestión de Alumnos ✅
- Crear nuevo alumno
- Ver lista de alumnos
- Editar alumno existente
- Eliminar alumno

### Gestión de Materias ✅
- Crear nueva materia
- Ver lista de materias
- Editar materia existente
- Eliminar materia

### Gestión de Notas ✅
- Registrar nota de alumno en materia
- Ver todas las notas
- Ver notas por alumno
- Eliminar nota

## Pruebas de Endpoints (Ejemplos con curl)

### Crear Alumno
```bash
curl -X POST http://localhost:8080/api/alumnos \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Carlos",
    "apellido": "Mendoza",
    "email": "carlos@example.com",
    "fechaNacimiento": "2001-05-20"
  }'
```

### Listar Alumnos
```bash
curl http://localhost:8080/api/alumnos
```

### Crear Materia
```bash
curl -X POST http://localhost:8080/api/materias \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Sistemas Operativos",
    "codigo": "SO101",
    "creditos": 3
  }'
```

### Registrar Nota
```bash
curl -X POST http://localhost:8080/api/notas \
  -H "Content-Type: application/json" \
  -d '{
    "valor": 4.7,
    "alumnoId": 1,
    "materiaId": 1
  }'
```

## Troubleshooting Rápido

| Problema | Solución |
|----------|----------|
| Puerto ya en uso | Cambiar puerto en docker-compose.yml o liberar el puerto |
| Base de datos no conecta | Verificar que postgres esté corriendo: `docker-compose logs postgres` |
| Frontend no carga API | Revisar que API esté en http://localhost:8080 |
| Contenedor se reinicia | Ver logs: `docker-compose logs api` |
| Necesito reiniciar todo | `docker-compose restart` |

## Tiempo Total Estimado

| Actividad | Tiempo |
|-----------|--------|
| Descargar repositorio | < 1 min |
| Build de imágenes | 3-5 min |
| Start de servicios | 1-2 min |
| Acceso y validación | < 1 min |
| **Total** | **5-9 min** |

## ¿Necesitas ayuda?

1. Revisar logs: `docker-compose logs`
2. Verificar puertos: `docker-compose ps`
3. Revisar README.md en backend/ y frontend/
4. Limpiar y reintentar: `docker-compose down -v && docker-compose up -d`

---

**¡Listo! Ahora puedes usar la aplicación Academia completamente funcional.**

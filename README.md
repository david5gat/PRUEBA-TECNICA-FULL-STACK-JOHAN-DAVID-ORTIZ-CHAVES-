# Academia — Sistema de Gestión

Este repositorio contiene una aplicación full‑stack para gestionar alumnos, materias y notas. Está pensada como un proyecto serio para evaluación académica: código organizado, Docker para despliegue, y un frontend moderno en React + TypeScript.

Este README explica cómo ejecutar el proyecto localmente, cómo desplegarlo con Docker Compose, y cómo usar la interfaz (incluyendo la nueva vista para listar notas por alumno en cada materia y la sección de estadísticas).

Índice
1. Descripción
2. Tecnologías
3. Requisitos
4. Inicio rápido (recomendado: Docker Compose)
5. Ejecución en desarrollo (frontend / backend por separado)
6. Cómo usar la aplicación (guía para evaluadores y usuarios)
7. Despliegue a producción (pasos básicos)
8. Estructura del proyecto
9. Troubleshooting y notas útiles
10. Créditos

---

## 1) Descripción

Aplicación para:
- Registrar y administrar alumnos (CRUD)
- Registrar y administrar materias (CRUD)
- Registrar, listar y eliminar notas de alumnos por materia
- Visualizar estadísticas: promedio por materia y mejores puestos
- Ver notas agrupadas por materia ("Listar notas por alumno en cada materia")


## 2) Tecnologías

- Backend: Java 17, Spring Boot, Spring Data JPA, Maven
- Base de datos: PostgreSQL (contenedor Docker para desarrollo)
- Frontend: React 18, TypeScript, Vite, Axios
- Infra: Docker, Docker Compose

## 3) Requisitos

- Docker y Docker Compose (recomendado) OR
- Java 17 + Maven (para backend local)
- Node.js 18+ y npm (para frontend local)

Si no eres desarrollador, la vía más simple es usar Docker (se indican los pasos abajo).

## 4) Inicio rápido — Docker Compose (recomendado)

Estos pasos funcionan en Windows (PowerShell), macOS y Linux si tienes Docker Desktop / Docker Engine instalado.

1. Abre una terminal en la carpeta raíz del proyecto.
2. Construye y levanta los servicios:

```powershell
docker-compose build
docker-compose up -d
```

3. Verifica los servicios:

- Frontend: http://localhost:5173
- Backend API: http://localhost:8080/api
- PostgreSQL: puerto `5432` (solo usado por el contenedor)

4. Logs:

```powershell
docker-compose logs -f
```

5. Apagar:

```powershell
docker-compose down
```

El contenedor de Postgres cargará el script `database-dump/init.sql` con datos de prueba al iniciarse (si está configurado en el `docker-compose.yml`).

## 5) Ejecución en desarrollo (sin Docker)

Si prefieres ejecutar los componentes por separado para desarrollo:

Backend
1. En una terminal:

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

2. Por defecto el backend escucha en el puerto `8080` y expone la API en `/api`.

Frontend
1. En otra terminal:

```bash
cd frontend
npm install
npm run dev
```

2. El frontend corre en `http://localhost:5173`. Asegúrate de que `VITE_API_URL` en `frontend/.env` apunte a `http://localhost:8080/api` si ejecutas el backend localmente.

## 6) Cómo usar la aplicación (guía para usuarios / evaluadores)

Inicio de sesión: la app incluye un pequeño header con perfil y notificaciones simuladas.

Navegación principal: usa la barra lateral para moverte entre las pestañas: `Alumnos`, `Materias`, `Notas`.

Flujos básicos:
- Crear alumno: pestaña `Alumnos` → formulario "Crear Alumno" → Guardar.
- Crear materia: pestaña `Materias` → formulario "Crear Materia" → Guardar.
- Registrar nota: pestaña `Notas` → formulario "Registrar Nota" (elige alumno y materia) → Guardar.

Notas: ver, filtrar y eliminar
- En la pestaña `Notas` ahora hay dos vistas (botones arriba):
   - "Agrupar por materia": muestra tarjetas por cada materia y dentro de ellas la lista de notas con el alumno asociado (esto es "Listar notas por alumno en cada materia").
   - "Ver lista plana": muestra una tabla con todas las notas en una sola lista.

Estadísticas
- En la misma pestaña `Notas` verás además la sección de estadísticas que muestra:
   - Promedio de calificación por materia
   - Los mejores puestos (top 3) en cada materia

Esto facilita la evaluación de desempeño por materia y la identificación de los mejores alumnos.

## 7) Despliegue a producción (guía breve)

Recomendación general: desplegar usando Docker Compose en un servidor Linux (Ubuntu 22.04 LTS por ejemplo), usando nginx como proxy inverso y Let’s Encrypt para HTTPS.

Pasos simplificados:
1. Copia el repositorio al servidor.
2. Configura variables de entorno seguras (no almacenar contraseñas en git). Usa un archivo `.env.production` fuera del repo o un secret manager.
3. Ejecuta:

```bash
docker-compose -f docker-compose.yml up -d --build
```

4. Configura `nginx` para exponer `http://localhost:5173` (frontend) y proxy `/api` a `http://localhost:8080`.
5. Configura HTTPS con Certbot (Let’s Encrypt).

Notas de seguridad:
- Asegura la base de datos con credenciales fuertes.
- No expongas la base de datos al público.
- Habilita un firewall y monitoreo de logs.

## 8) Estructura del proyecto (resumen)

- `backend/` — Código Java Spring Boot (API REST)
- `frontend/` — UI en React + TypeScript (Vite)
- `database-dump/init.sql` — datos de ejemplo
- `docker-compose.yml` — orquestación local de desarrollo

## 9) Troubleshooting rápido

- Si el frontend no muestra datos: revisa `VITE_API_URL` en `frontend/.env`.
- Si el backend no arranca: revisar logs del contenedor o `mvn spring-boot:run` salida.
- Puertos: 5173 (frontend dev), 8080 (backend), 5432 (postgres).

Comandos útiles:

```bash
# Ver logs
docker-compose logs -f

# Reconstruir imágenes (si cambias Dockerfiles)
docker-compose build --no-cache

# Parar y eliminar volúmenes
docker-compose down -v
```

## 10) Créditos y notas finales

Proyecto desarrollado como entrega / demostración de un sistema completo para gestión académica. 
código legible, instrucciones claras y despliegue reproducible.

Si quieres que prepare un paquete final, un script de despliegue automatico o un video corto presentando la app, dímelo y lo preparo.

---

**Última actualización:** Abril 2026

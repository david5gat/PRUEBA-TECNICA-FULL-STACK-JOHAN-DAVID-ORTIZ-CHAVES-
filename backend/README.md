# Academia API - Backend

API REST para gestión de alumnos, materias y notas, desarrollada con Java 17 y Spring Boot 3.5.4.

## Requisitos Previos

- Docker y Docker Compose instalados
- (Opcional) Java 17 y Maven 3.9.6+ si ejecutas sin Docker

## Tecnologías Utilizadas

- Java 17
- Spring Boot 3.5.4
- Spring Data JPA
- PostgreSQL 15
- Swagger/OpenAPI
- Lombok
- Docker

## Estructura del Proyecto

```
backend/
├── src/
│   ├── main/
│   │   ├── java/com/academia/api/
│   │   │   ├── controller/     # Controladores REST
│   │   │   ├── service/        # Servicios de lógica de negocio
│   │   │   ├── repository/     # Repositorios JPA
│   │   │   ├── model/          # Entidades JPA
│   │   │   ├── dto/            # Data Transfer Objects
│   │   │   ├── exception/      # Manejo de excepciones
│   │   │   └── AcademiaApiApplication.java
│   │   └── resources/
│   │       └── application.yml
│   └── test/
├── pom.xml
├── Dockerfile
├── docker-compose.yml
├── .env
└── README.md
```

## Configuración

### Variables de Entorno (.env)

```env
# Database Configuration
DB_DRIVER=postgresql
DB_HOST=postgres
DB_PORT=5432
DB_NAME=academia_db
DB_USER=postgres
DB_PASSWORD=postgres123
DB_DRIVER_CLASS=org.postgresql.Driver
HIBERNATE_DIALECT=org.hibernate.dialect.PostgreSQLDialect

# Server Configuration
SERVER_PORT=8080
LOGGING_LEVEL=INFO
```

## Ejecución

### Con Docker (Recomendado)

1. **Clonar o descargar el proyecto**
   ```bash
   git clone <repositorio-url>
   cd backend
   ```

2. **Compilar la imagen Docker**
   ```bash
   docker-compose build
   ```

3. **Levantar los contenedores (API + PostgreSQL)**
   ```bash
   docker-compose up -d
   ```

4. **Verificar que la API esté corriendo**
   ```bash
   curl http://localhost:8080/v3/api-docs
   ```

La API estará disponible en: `http://localhost:8080`

### Sin Docker (Desarrollo Local)

1. **Configurar la base de datos PostgreSQL**
   - Asegúrate de que PostgreSQL está corriendo en localhost:5432
   - Crea una base de datos llamada `academia_db`
   - Usuario: `postgres`, Contraseña: `postgres123`

2. **Compilar el proyecto**
   ```bash
   mvn clean install
   ```

3. **Ejecutar la aplicación**
   ```bash
   mvn spring-boot:run
   ```

## Endpoints de la API

### Alumnos
- `POST /api/alumnos` - Crear alumno
- `GET /api/alumnos` - Listar alumnos
- `GET /api/alumnos/{id}` - Obtener alumno por ID
- `PUT /api/alumnos/{id}` - Actualizar alumno
- `DELETE /api/alumnos/{id}` - Eliminar alumno

### Materias
- `POST /api/materias` - Crear materia
- `GET /api/materias` - Listar materias
- `GET /api/materias/{id}` - Obtener materia por ID
- `PUT /api/materias/{id}` - Actualizar materia
- `DELETE /api/materias/{id}` - Eliminar materia

### Notas
- `POST /api/notas` - Registrar nota
- `GET /api/notas` - Listar todas las notas
- `GET /api/notas/alumno/{alumnoId}` - Listar notas de un alumno
- `GET /api/notas/alumno/{alumnoId}/materia/{materiaId}` - Listar notas de un alumno en una materia
- `DELETE /api/notas/{id}` - Eliminar nota

## Documentación API (Swagger)

Accede a la documentación interactiva de la API en:

```
http://localhost:8080/swagger-ui.html
```

## Datos de Prueba

El archivo `database-dump/init.sql` contiene:
- 5 alumnos de prueba
- 6 materias de prueba
- 10 notas de prueba

Estos datos se cargan automáticamente al iniciar la base de datos.

## Validación de Datos

### Alumno
- Nombre: 2-100 caracteres, requerido
- Apellido: 2-100 caracteres, requerido
- Email: válido, único, requerido
- Fecha de nacimiento: no puede ser en el futuro

### Materia
- Nombre: 2-100 caracteres, requerido
- Código: 3-20 caracteres, único, requerido
- Créditos: 1-6, requerido

### Nota
- Valor: 0.0-5.0, requerido
- Alumno ID: requerido
- Materia ID: requerido

## Manejo de Errores

La API devuelve respuestas con formato consistente:

```json
{
  "timestamp": "2024-04-24T10:30:00",
  "status": 400,
  "message": "Error de validación",
  "errors": {
    "email": "El email debe ser válido"
  },
  "path": "/api/alumnos"
}
```

## Detener la Aplicación

```bash
docker-compose down
```

Para eliminar volúmenes también:
```bash
docker-compose down -v
```

## Troubleshooting

### Puerto 8080 ya está en uso
```bash
# Cambiar el puerto en docker-compose.yml o .env
DB_PORT=8081:8080
```

### Base de datos no se conecta
1. Verificar que PostgreSQL está corriendo
2. Verificar variables de entorno en .env
3. Revisar logs: `docker-compose logs postgres`

### Reconstruir todo desde cero
```bash
docker-compose down -v
docker-compose build --no-cache
docker-compose up -d
```

## Desarrollo

### Compilar sin ejecutar pruebas
```bash
mvn clean install -DskipTests
```

### Ejecutar pruebas unitarias
```bash
mvn test
```

### Revisar logs
```bash
docker-compose logs -f api
```

## Licencia

Este proyecto es parte de una prueba técnica de Full Stack.
DB_HOST=postgres
DB_PORT=5432
DB_NAME=academia_db
DB_USER=postgres
DB_PASSWORD=postgres123
DB_DRIVER_CLASS=org.postgresql.Driver
HIBERNATE_DIALECT=org.hibernate.dialect.PostgreSQLDialect

# Server Configuration
SERVER_PORT=8080
```

## Instrucciones de Ejecución

### Opción 1: Con Docker Compose (Recomendado)

1. **Clonar repositorio:**
   ```bash
   cd backend
   ```

2. **Construir imagen Docker:**
   ```bash
   docker-compose build
   ```

3. **Iniciar servicios:**
   ```bash
   docker-compose up -d
   ```

4. **Verificar que la API esté corriendo:**
   ```bash
   curl http://localhost:8080/api/alumnos
   ```

5. **Ver logs:**
   ```bash
   docker-compose logs -f api
   ```

6. **Detener servicios:**
   ```bash
   docker-compose down
   ```

### Opción 2: Sin Docker (Desarrollo Local)

1. **Instalar dependencias:**
   ```bash
   mvn clean install
   ```

2. **Iniciar PostgreSQL localmente o con Docker:**
   ```bash
   docker run -d --name postgres -e POSTGRES_PASSWORD=postgres123 -e POSTGRES_DB=academia_db -p 5432:5432 postgres:15-alpine
   ```

3. **Ejecutar la aplicación:**
   ```bash
   mvn spring-boot:run
   ```

## Endpoints de la API

### Alumnos
- `POST /api/alumnos` - Crear alumno
- `GET /api/alumnos` - Listar todos los alumnos
- `GET /api/alumnos/{id}` - Obtener alumno por ID
- `PUT /api/alumnos/{id}` - Actualizar alumno
- `DELETE /api/alumnos/{id}` - Eliminar alumno

### Materias
- `POST /api/materias` - Crear materia
- `GET /api/materias` - Listar todas las materias
- `GET /api/materias/{id}` - Obtener materia por ID
- `PUT /api/materias/{id}` - Actualizar materia
- `DELETE /api/materias/{id}` - Eliminar materia

### Notas
- `POST /api/notas` - Registrar nota
- `GET /api/notas` - Listar todas las notas
- `GET /api/notas/alumno/{alumnoId}` - Listar notas por alumno
- `GET /api/notas/alumno/{alumnoId}/materia/{materiaId}` - Listar notas por alumno y materia
- `DELETE /api/notas/{id}` - Eliminar nota

## Ejemplos de Uso

### Crear Alumno
```bash
curl -X POST http://localhost:8080/api/alumnos \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Juan",
    "apellido": "Pérez",
    "email": "juan.perez@example.com",
    "fechaNacimiento": "2000-01-15"
  }'
```

### Crear Materia
```bash
curl -X POST http://localhost:8080/api/materias \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Programación I",
    "codigo": "PROG101",
    "creditos": 4
  }'
```

### Registrar Nota
```bash
curl -X POST http://localhost:8080/api/notas \
  -H "Content-Type: application/json" \
  -d '{
    "valor": 4.5,
    "alumnoId": 1,
    "materiaId": 1
  }'
```

## Restaurar Base de Datos desde Dump

Para restaurar datos de prueba:

1. **Ubicar el archivo dump en `../database-dump/`**
2. **Copiarlo con extensión `.sql`**
3. **Reiniciar los servicios:**
   ```bash
   docker-compose restart postgres
   ```

O manualmente:

```bash
docker exec -i academia_postgres psql -U postgres academia_db < path/to/dump.sql
```

## Troubleshooting

### La API no se conecta a la base de datos

1. Verificar que PostgreSQL esté corriendo:
   ```bash
   docker ps
   ```

2. Revisar logs de la API:
   ```bash
   docker-compose logs api
   ```

3. Verificar variables de entorno en `.env`

### Puerto 5432 ya está en uso

Cambiar puerto en `docker-compose.yml` o `.env`:
```env
DB_PORT=5433
```

### Reconstruir imagen

```bash
docker-compose build --no-cache
```

## Licencia

Este proyecto es parte de una prueba técnica.

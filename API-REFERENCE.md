# API Reference - Academia

Documentación completa de los endpoints de la API REST.

## Base URL
```
http://localhost:8080/api
```

## Alumnos

### Crear Alumno
**POST** `/api/alumnos`

**Request:**
```json
{
  "nombre": "Juan",
  "apellido": "Pérez",
  "email": "juan.perez@example.com",
  "fechaNacimiento": "2000-01-15"
}
```

**Response (201 Created):**
```json
{
  "id": 1,
  "nombre": "Juan",
  "apellido": "Pérez",
  "email": "juan.perez@example.com",
  "fechaNacimiento": "2000-01-15"
}
```

### Listar Alumnos
**GET** `/api/alumnos`

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "nombre": "Juan",
    "apellido": "Pérez",
    "email": "juan.perez@example.com",
    "fechaNacimiento": "2000-01-15"
  },
  {
    "id": 2,
    "nombre": "María",
    "apellido": "García",
    "email": "maria.garcia@example.com",
    "fechaNacimiento": "2001-03-22"
  }
]
```

### Obtener Alumno por ID
**GET** `/api/alumnos/{id}`

**Response (200 OK):**
```json
{
  "id": 1,
  "nombre": "Juan",
  "apellido": "Pérez",
  "email": "juan.perez@example.com",
  "fechaNacimiento": "2000-01-15"
}
```

### Actualizar Alumno
**PUT** `/api/alumnos/{id}`

**Request:**
```json
{
  "nombre": "Juan Carlos",
  "apellido": "Pérez López",
  "email": "juancarlos.perez@example.com",
  "fechaNacimiento": "2000-01-15"
}
```

**Response (200 OK):**
```json
{
  "id": 1,
  "nombre": "Juan Carlos",
  "apellido": "Pérez López",
  "email": "juancarlos.perez@example.com",
  "fechaNacimiento": "2000-01-15"
}
```

### Eliminar Alumno
**DELETE** `/api/alumnos/{id}`

**Response (204 No Content)** - Sin cuerpo

---

## Materias

### Crear Materia
**POST** `/api/materias`

**Request:**
```json
{
  "nombre": "Programación I",
  "codigo": "PROG101",
  "creditos": 4
}
```

**Response (201 Created):**
```json
{
  "id": 1,
  "nombre": "Programación I",
  "codigo": "PROG101",
  "creditos": 4
}
```

### Listar Materias
**GET** `/api/materias`

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "nombre": "Programación I",
    "codigo": "PROG101",
    "creditos": 4
  },
  {
    "id": 2,
    "nombre": "Matemáticas Discretas",
    "codigo": "MATH201",
    "creditos": 3
  }
]
```

### Obtener Materia por ID
**GET** `/api/materias/{id}`

**Response (200 OK):**
```json
{
  "id": 1,
  "nombre": "Programación I",
  "codigo": "PROG101",
  "creditos": 4
}
```

### Actualizar Materia
**PUT** `/api/materias/{id}`

**Request:**
```json
{
  "nombre": "Programación I Avanzada",
  "codigo": "PROG102",
  "creditos": 5
}
```

**Response (200 OK):**
```json
{
  "id": 1,
  "nombre": "Programación I Avanzada",
  "codigo": "PROG102",
  "creditos": 5
}
```

### Eliminar Materia
**DELETE** `/api/materias/{id}`

**Response (204 No Content)** - Sin cuerpo

---

## Notas

### Registrar Nota
**POST** `/api/notas`

**Request:**
```json
{
  "valor": 4.5,
  "alumnoId": 1,
  "materiaId": 1
}
```

**Response (201 Created):**
```json
{
  "id": 1,
  "valor": 4.5,
  "fechaRegistro": "2024-04-23T15:30:00",
  "alumnoId": 1,
  "materiaId": 1,
  "alumnoNombre": "Juan Pérez",
  "materiaNombre": "Programación I"
}
```

### Listar Todas las Notas
**GET** `/api/notas`

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "valor": 4.5,
    "fechaRegistro": "2024-04-23T15:30:00",
    "alumnoId": 1,
    "materiaId": 1,
    "alumnoNombre": "Juan Pérez",
    "materiaNombre": "Programación I"
  },
  {
    "id": 2,
    "valor": 3.8,
    "fechaRegistro": "2024-04-23T15:31:00",
    "alumnoId": 1,
    "materiaId": 2,
    "alumnoNombre": "Juan Pérez",
    "materiaNombre": "Matemáticas Discretas"
  }
]
```

### Listar Notas por Alumno
**GET** `/api/notas/alumno/{alumnoId}`

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "valor": 4.5,
    "fechaRegistro": "2024-04-23T15:30:00",
    "alumnoId": 1,
    "materiaId": 1,
    "alumnoNombre": "Juan Pérez",
    "materiaNombre": "Programación I"
  },
  {
    "id": 2,
    "valor": 3.8,
    "fechaRegistro": "2024-04-23T15:31:00",
    "alumnoId": 1,
    "materiaId": 2,
    "alumnoNombre": "Juan Pérez",
    "materiaNombre": "Matemáticas Discretas"
  }
]
```

### Listar Notas por Alumno y Materia
**GET** `/api/notas/alumno/{alumnoId}/materia/{materiaId}`

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "valor": 4.5,
    "fechaRegistro": "2024-04-23T15:30:00",
    "alumnoId": 1,
    "materiaId": 1,
    "alumnoNombre": "Juan Pérez",
    "materiaNombre": "Programación I"
  }
]
```

### Eliminar Nota
**DELETE** `/api/notas/{id}`

**Response (204 No Content)** - Sin cuerpo

---

## Códigos de Respuesta HTTP

| Código | Significado |
|--------|-------------|
| 200 | OK - Solicitud exitosa |
| 201 | Created - Recurso creado exitosamente |
| 204 | No Content - Operación exitosa sin respuesta |
| 400 | Bad Request - Solicitud inválida |
| 404 | Not Found - Recurso no encontrado |
| 500 | Internal Server Error - Error del servidor |

## Errores Comunes

### Email duplicado
**Response (400 Bad Request):**
```json
{
  "error": "El email ya está registrado"
}
```

### Alumno no encontrado
**Response (404 Not Found):**
```json
{
  "error": "Alumno no encontrado con id: 999"
}
```

### Validación fallida
**Response (400 Bad Request):**
```json
{
  "error": "El valor debe estar entre 0 y 5"
}
```

## Ejemplos usando cURL

### Crear alumno
```bash
curl -X POST http://localhost:8080/api/alumnos \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Pedro",
    "apellido": "López",
    "email": "pedro@example.com",
    "fechaNacimiento": "2000-06-10"
  }'
```

### Obtener alumno
```bash
curl http://localhost:8080/api/alumnos/1
```

### Actualizar alumno
```bash
curl -X PUT http://localhost:8080/api/alumnos/1 \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Pedro",
    "apellido": "López García",
    "email": "pedro.lopez@example.com",
    "fechaNacimiento": "2000-06-10"
  }'
```

### Eliminar alumno
```bash
curl -X DELETE http://localhost:8080/api/alumnos/1
```

### Registrar nota
```bash
curl -X POST http://localhost:8080/api/notas \
  -H "Content-Type: application/json" \
  -d '{
    "valor": 4.2,
    "alumnoId": 1,
    "materiaId": 2
  }'
```

## Headers Requeridos

```
Content-Type: application/json
```

## CORS

La API tiene CORS habilitado para permitir solicitudes desde cualquier origen:

```
Access-Control-Allow-Origin: *
```

---

**Fecha de generación:** Abril 2024

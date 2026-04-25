# Instrucciones para Evaluadores

Este documento proporciona pasos específicos para evaluar la solución Full Stack.

## 📋 Contenido del Proyecto

```
Full Stack Junior/
├── backend/              # API REST (Java/Spring Boot)
├── frontend/             # Web App (React/TypeScript)
├── database-dump/        # Datos de prueba SQL
├── docker-compose.yml    # Orquestación de servicios
├── README.md             # Documentación principal
├── QUICKSTART.md         # Guía rápida
├── API-REFERENCE.md      # Referencia de endpoints
└── .gitignore            # Configuración Git
```

## 🚀 Paso 1: Validación de Estructura (5 min)

### Verificar Backend
```bash
cd backend
# Verificar archivos principales
ls -la src/main/java/com/academia/api/
# Debe incluir:
# - model/      (Alumno.java, Materia.java, Nota.java)
# - repository/ (AlumnoRepository, MateriaRepository, NotaRepository)
# - service/    (AlumnoService, MateriaService, NotaService)
# - controller/ (AlumnoController, MateriaController, NotaController)
# - dto/        (AlumnoDTO, MateriaDTO, NotaDTO)
# - AcademiaApiApplication.java
```

### Verificar Frontend
```bash
cd frontend
# Verificar estructura
ls -la src/
# Debe incluir:
# - components/  (Formularios y Listas)
# - services/    (api.ts)
# - types/       (index.ts)
# - styles/      (index.css)
# - App.tsx
# - main.tsx
```

## 🐳 Paso 2: Build y Ejecución (10 min)

### Construir Docker Compose
```bash
# Desde la raíz del proyecto
docker-compose build
```

**Validar Output:**
- ✅ Backend image construida exitosamente
- ✅ Frontend image construida exitosamente
- ✅ PostgreSQL image disponible

### Ejecutar Servicios
```bash
docker-compose up -d
```

**Esperar 30-60 segundos para que todo esté listo**

### Validar Servicios Activos
```bash
docker-compose ps
```

**Debe mostrar 3 contenedores en estado "Up":**
- academia_postgres:5432
- academia_api:8080
- academia_frontend:5173

## ✅ Paso 3: Validar Backend (5 min)

### Verificar que API responda
```bash
curl http://localhost:8080/api/alumnos
```

**Respuesta esperada:** Array JSON con los 5 alumnos de prueba

### Verificar conectividad a BD
```bash
curl http://localhost:8080/api/materias
```

**Respuesta esperada:** Array JSON con las 6 materias de prueba

### Verificar logs del backend
```bash
docker-compose logs api | tail -20
```

**Buscar líneas:**
- "started in"
- "Hibernate" (indicando que se conectó a BD)
- Sin errores de conexión

## ✅ Paso 4: Validar Frontend (5 min)

### Acceder a la aplicación
```
http://localhost:5173
```

**Verificar:**
1. ✅ Página carga correctamente
2. ✅ Header muestra "Academia - Sistema de Gestión"
3. ✅ Tabs disponibles: Alumnos, Materias, Notas
4. ✅ No hay errores en consola del navegador (F12)

### Verificar Alumnos
```
- Ir a pestaña "Alumnos"
- Debe mostrar tabla con 5 alumnos precargados
- Verificar columnas: ID, Nombre, Apellido, Email, Fecha Nacimiento
- Botones de Editar y Eliminar deben estar presentes
```

### Verificar Materias
```
- Ir a pestaña "Materias"
- Debe mostrar tabla con 6 materias precargadas
- Verificar columnas: ID, Nombre, Código, Créditos
- Botones de Editar y Eliminar deben estar presentes
```

### Verificar Notas
```
- Ir a pestaña "Notas"
- Debe haber formulario para registrar nota
- Campos: Alumno (select), Materia (select), Valor (number)
- Tabla debe mostrar las 10 notas precargadas
- Verificar columnas: ID, Alumno, Materia, Valor, Fecha Registro
```

## 🧪 Paso 5: Pruebas Funcionales (15 min)

### Crear Alumno
```bash
curl -X POST http://localhost:8080/api/alumnos \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Test",
    "apellido": "User",
    "email": "test@example.com",
    "fechaNacimiento": "2000-01-01"
  }'
```

**En Frontend:**
1. Ir a tab Alumnos
2. Rellenar formulario con datos nuevos
3. Click en Guardar
4. Verificar que aparezca en tabla
5. Refrescar página (F5) para confirmar persistencia

### Crear Materia
```bash
curl -X POST http://localhost:8080/api/materias \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Test Subject",
    "codigo": "TEST999",
    "creditos": 2
  }'
```

### Registrar Nota
```bash
curl -X POST http://localhost:8080/api/notas \
  -H "Content-Type: application/json" \
  -d '{
    "valor": 4.8,
    "alumnoId": 1,
    "materiaId": 1
  }'
```

### Editar Alumno
- En Frontend, en tab Alumnos
- Click en "Editar" en cualquier alumno
- Modificar nombre
- Click en "Guardar"
- Verificar cambio en tabla

### Eliminar Alumno
- En Frontend, en tab Alumnos
- Click en "Eliminar" en cualquier alumno
- Confirmar en dialog
- Verificar que desaparece de tabla

## 📊 Paso 6: Validar Base de Datos (5 min)

### Conectar a PostgreSQL
```bash
docker-compose exec postgres psql -U postgres -d academia_db
```

### Verificar tablas
```sql
-- Dentro del contenedor PostgreSQL
\dt
-- Debe mostrar: alumnos, materias, notas

SELECT COUNT(*) FROM alumnos;
-- Debe retornar: 5 (más 1 si se creó durante pruebas)

SELECT COUNT(*) FROM materias;
-- Debe retornar: 6 (más 1 si se creó durante pruebas)

SELECT COUNT(*) FROM notas;
-- Debe retornar: 10 (más 1 si se registró durante pruebas)
```

### Salir de PostgreSQL
```
\q
```

## 🔍 Paso 7: Validar Código y Arquitectura (10 min)

### Backend
- ✅ Entidades en `model/` con JPA annotations correctas
- ✅ Repositories extienden JpaRepository
- ✅ Services contienen lógica de negocio
- ✅ Controllers exponen endpoints REST con `@RequestMapping`
- ✅ DTOs para transferencia de datos
- ✅ Relaciones One-to-Many correctas entre entidades
- ✅ Validación de datos en servicios
- ✅ Manejo de excepciones

### Frontend
- ✅ Componentes React funcionales
- ✅ Uso de TypeScript con tipos explícitos
- ✅ Custom hooks para lógica
- ✅ Servicios API centralizados
- ✅ Gestión de estado con useState
- ✅ Comunicación HTTP con Axios
- ✅ Manejo de errores y loading states
- ✅ CSS organizado y responsive

### Docker
- ✅ Dockerfile para backend con multi-stage build
- ✅ Dockerfile para frontend con build y producción
- ✅ docker-compose.yml con 3 servicios
- ✅ Variables de entorno configurables
- ✅ Health checks en servicios
- ✅ Volúmenes para persistencia

## 📝 Paso 8: Checklist Final

- ✅ Repositorio público en GitHub sin nombre de Creangel
- ✅ README.md con instrucciones de ejecución
- ✅ Máximo 10 comandos para levantar proyecto
- ✅ Docker Compose configurado correctamente
- ✅ Variables de entorno externalizadas
- ✅ Datos de prueba incluidos (.sql en database-dump/)
- ✅ CRUD completo para todas entidades
- ✅ Endpoints REST funcionan correctamente
- ✅ Frontend se conecta a API
- ✅ Base de datos persiste datos correctamente

## ⚠️ Posibles Problemas y Soluciones

### El Backend no inicia
```bash
docker-compose logs api
# Buscar error en logs
docker-compose down -v
docker-compose build --no-cache
docker-compose up -d
```

### Frontend no conecta a API
- Verificar que API esté en puerto 8080
- Verificar variable VITE_API_URL
- Revisar consola del navegador (F12)
- Revisarconsola de logs: docker-compose logs frontend

### Puerto ocupado
```bash
# Cambiar en docker-compose.yml o liberar puerto
lsof -i :8080  # Para ver qué ocupa el puerto
```

### Base de datos vacía
```bash
docker-compose exec postgres psql -U postgres -d academia_db \
  -f /docker-entrypoint-initdb.d/init.sql
```

## 📊 Resumen de Ejecución

| Paso | Tiempo | Estado |
|------|--------|--------|
| Validar estructura | 5 min | ✓ |
| Build y ejecución | 10 min | ✓ |
| Validar Backend | 5 min | ✓ |
| Validar Frontend | 5 min | ✓ |
| Pruebas funcionales | 15 min | ✓ |
| Validar BD | 5 min | ✓ |
| Revisar código | 10 min | ✓ |
| Checklist final | 5 min | ✓ |
| **Total** | **60 min** | ✓ |

## 📞 Soporte

Si encuentras problemas:

1. Revisar logs: `docker-compose logs`
2. Leer README.md en la raíz
3. Consultar QUICKSTART.md para ejecución básica
4. Revisar API-REFERENCE.md para ejemplos de endpoints

---

**Gracias por revisar esta solución técnica. ¡Esperamos que disfrutes evaluándola!**

-- Crear tablas
CREATE TABLE IF NOT EXISTS alumnos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    fecha_nacimiento DATE
);

CREATE TABLE IF NOT EXISTS materias (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    codigo VARCHAR(20) UNIQUE NOT NULL,
    creditos INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS notas (
    id SERIAL PRIMARY KEY,
    valor DECIMAL(3,2) NOT NULL CHECK (valor >= 0 AND valor <= 5),
    fecha_registro TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    alumno_id INTEGER NOT NULL,
    materia_id INTEGER NOT NULL,
    CONSTRAINT fk_nota_alumno FOREIGN KEY (alumno_id) REFERENCES alumnos(id) ON DELETE CASCADE,
    CONSTRAINT fk_nota_materia FOREIGN KEY (materia_id) REFERENCES materias(id) ON DELETE CASCADE
);

-- Crear índices para mejorar rendimiento
CREATE INDEX IF NOT EXISTS idx_notas_alumno ON notas(alumno_id);
CREATE INDEX IF NOT EXISTS idx_notas_materia ON notas(materia_id);
CREATE INDEX IF NOT EXISTS idx_notas_alumno_materia ON notas(alumno_id, materia_id);

-- Insertar datos de prueba
INSERT INTO alumnos (nombre, apellido, email, fecha_nacimiento) VALUES
('Juan', 'Pérez', 'juan.perez@example.com', '2000-01-15'),
('María', 'García', 'maria.garcia@example.com', '2001-03-22'),
('Carlos', 'López', 'carlos.lopez@example.com', '1999-07-10'),
('Ana', 'Martínez', 'ana.martinez@example.com', '2000-11-05'),
('Luis', 'Rodríguez', 'luis.rodriguez@example.com', '2001-05-18')
ON CONFLICT DO NOTHING;

INSERT INTO materias (nombre, codigo, creditos) VALUES
('Programación I', 'PROG101', 4),
('Matemáticas Discretas', 'MATH201', 3),
('Estructura de Datos', 'DATA102', 4),
('Bases de Datos', 'DB103', 3),
('Desarrollo Web', 'WEB104', 4),
('Algoritmos', 'ALGO105', 3)
ON CONFLICT DO NOTHING;

INSERT INTO notas (valor, fecha_registro, alumno_id, materia_id) VALUES
(4.5, NOW(), 1, 1),
(3.8, NOW(), 1, 2),
(4.2, NOW(), 2, 1),
(3.9, NOW(), 2, 3),
(4.7, NOW(), 3, 2),
(4.1, NOW(), 3, 4),
(3.6, NOW(), 4, 5),
(4.3, NOW(), 4, 1),
(4.8, NOW(), 5, 6),
(3.7, NOW(), 5, 2)
ON CONFLICT DO NOTHING;

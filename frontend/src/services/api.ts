import axios from 'axios';
import type { Alumno, Materia, Nota } from '../types';

const API_URL = (import.meta.env.VITE_API_URL as string) || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

// Alumnos
export const alumnoService = {
  getAll: () => api.get<Alumno[]>('/alumnos'),
  getById: (id: number) => api.get<Alumno>(`/alumnos/${id}`),
  create: (alumno: Alumno) => api.post<Alumno>('/alumnos', alumno),
  update: (id: number, alumno: Alumno) => api.put<Alumno>(`/alumnos/${id}`, alumno),
  delete: (id: number) => api.delete(`/alumnos/${id}`),
};

// Materias
export const materiaService = {
  getAll: () => api.get<Materia[]>('/materias'),
  getById: (id: number) => api.get<Materia>(`/materias/${id}`),
  create: (materia: Materia) => api.post<Materia>('/materias', materia),
  update: (id: number, materia: Materia) => api.put<Materia>(`/materias/${id}`, materia),
  delete: (id: number) => api.delete(`/materias/${id}`),
};

// Notas
export const notaService = {
  getAll: () => api.get<Nota[]>('/notas'),
  getById: (id: number) => api.get<Nota>(`/notas/${id}`),
  getByAlumno: (alumnoId: number) => api.get<Nota[]>(`/notas/alumno/${alumnoId}`),
  getByAlumnoAndMateria: (alumnoId: number, materiaId: number) =>
    api.get<Nota[]>(`/notas/alumno/${alumnoId}/materia/${materiaId}`),
  create: (nota: Nota) => api.post<Nota>('/notas', nota),
  delete: (id: number) => api.delete(`/notas/${id}`),
};

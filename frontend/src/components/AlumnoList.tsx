import React, { useState, useEffect } from 'react';
import type { Alumno } from '../types';
import { alumnoService, notaService } from '../services/api';
import { generateAlumnoPdf, generateAlumnosListPdf } from '../utils/pdf';

interface AlumnoListProps {
  onEdit: (alumno: Alumno) => void;
  refreshTrigger: number;
}

export const AlumnoList: React.FC<AlumnoListProps> = ({ onEdit, refreshTrigger }) => {
  const [alumnos, setAlumnos] = useState<Alumno[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  

  useEffect(() => {
    loadAlumnos();
  }, [refreshTrigger]);

  const loadAlumnos = async () => {
    try {
      setLoading(true);
      const response = await alumnoService.getAll();
      setAlumnos(response.data);
      setError(null);
    } catch (err) {
      setError('Error al cargar alumnos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number | undefined) => {
    if (!id) return;
    if (confirm('¿Está seguro de que desea eliminar este alumno?')) {
      try {
        await alumnoService.delete(id);
        loadAlumnos();
      } catch (err) {
        setError('Error al eliminar alumno');
        console.error(err);
      }
    }
  };

  

  if (loading) return <div className="loading"><div className="spinner"></div></div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <>
      

      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2>Alumnos</h2>
          <div>
            <button className="btn-secondary" onClick={async () => {
              try {
                await generateAlumnosListPdf(alumnos);
              } catch (err) {
                console.error('Error generando PDF de lista de alumnos', err);
                alert('Error generando PDF');
              }
            }}>Exportar lista (PDF)</button>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Email</th>
              <th>Fecha Nacimiento</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {alumnos.map(alumno => (
              <tr key={alumno.id}>
                <td>{alumno.id}</td>
                <td>{alumno.nombre}</td>
                <td>{alumno.apellido}</td>
                <td>{alumno.email}</td>
                <td>{alumno.fechaNacimiento}</td>
                <td>
                  <button className="btn-primary" onClick={() => onEdit(alumno)}>Editar</button>
                  <button className="btn-danger" onClick={() => handleDelete(alumno.id)} style={{ marginLeft: '8px' }}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {alumnos.length === 0 && <p className="text-center">No hay alumnos registrados</p>}
      </div>
    </>
  );
};

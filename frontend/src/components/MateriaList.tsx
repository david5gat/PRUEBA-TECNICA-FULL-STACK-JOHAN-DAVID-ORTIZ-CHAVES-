import React, { useState, useEffect } from 'react';
import type { Materia } from '../types';
import { materiaService } from '../services/api';
import { generateMateriasListPdf } from '../utils/pdf';

interface MateriaListProps {
  onEdit: (materia: Materia) => void;
  refreshTrigger: number;
}

export const MateriaList: React.FC<MateriaListProps> = ({ onEdit, refreshTrigger }) => {
  const [materias, setMaterias] = useState<Materia[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  

  useEffect(() => {
    loadMaterias();
  }, [refreshTrigger]);

  const loadMaterias = async () => {
    try {
      setLoading(true);
      const response = await materiaService.getAll();
      setMaterias(response.data);
      setError(null);
    } catch (err) {
      setError('Error al cargar materias');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number | undefined) => {
    if (!id) return;
    if (confirm('¿Está seguro de que desea eliminar esta materia?')) {
      try {
        await materiaService.delete(id);
        loadMaterias();
      } catch (err) {
        setError('Error al eliminar materia');
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
          <h2>Materias</h2>
          <div>
            <button className="btn-secondary" onClick={async () => {
              try {
                await generateMateriasListPdf(materias);
              } catch (err) {
                console.error('Error generando PDF de lista de materias', err);
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
              <th>Código</th>
              <th>Créditos</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {materias.map(materia => (
              <tr key={materia.id}>
                <td>{materia.id}</td>
                <td>{materia.nombre}</td>
                <td>{materia.codigo}</td>
                <td>{materia.creditos}</td>
                <td>
                  <button className="btn-primary" onClick={() => onEdit(materia)}>Editar</button>
                  <button className="btn-danger" onClick={() => handleDelete(materia.id)} style={{ marginLeft: '8px' }}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {materias.length === 0 && <p className="text-center">No hay materias registradas</p>}
      </div>
    </>
  );
};

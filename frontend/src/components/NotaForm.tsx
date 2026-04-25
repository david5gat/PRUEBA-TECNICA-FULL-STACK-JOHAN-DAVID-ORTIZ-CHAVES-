import React, { useState, useEffect } from 'react';
import type { Nota, Alumno, Materia } from '../types';
import { notaService, alumnoService, materiaService } from '../services/api';

interface NotaFormProps {
  onSubmit: () => void;
}

export const NotaForm: React.FC<NotaFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<Nota>({
    valor: 0,
    alumnoId: 0,
    materiaId: 0,
  });
  const [alumnos, setAlumnos] = useState<Alumno[]>([]);
  const [materias, setMaterias] = useState<Materia[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [alumnosRes, materiasRes] = await Promise.all([
        alumnoService.getAll(),
        materiaService.getAll(),
      ]);
      setAlumnos(alumnosRes.data);
      setMaterias(materiasRes.data);
    } catch (err) {
      setError('Error al cargar datos');
      console.error(err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: ['alumnoId', 'materiaId'].includes(name) ? parseInt(value) : parseFloat(value),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await notaService.create(formData);
      setSuccess('Nota registrada correctamente');
      setFormData({ valor: 0, alumnoId: 0, materiaId: 0 });
      onSubmit();
    } catch (err) {
      setError('Error al registrar nota');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>Registrar Nota</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Alumno</label>
          <select
            name="alumnoId"
            value={formData.alumnoId}
            onChange={handleChange}
            required
          >
            <option value={0}>Seleccionar alumno</option>
            {alumnos.map(alumno => (
              <option key={alumno.id} value={alumno.id}>
                {alumno.nombre} {alumno.apellido}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Materia</label>
          <select
            name="materiaId"
            value={formData.materiaId}
            onChange={handleChange}
            required
          >
            <option value={0}>Seleccionar materia</option>
            {materias.map(materia => (
              <option key={materia.id} value={materia.id}>
                {materia.nombre} ({materia.codigo})
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Valor de la Nota</label>
          <input
            type="number"
            name="valor"
            value={formData.valor}
            onChange={handleChange}
            required
            min="0"
            max="5"
            step="0.1"
          />
        </div>
        <button type="submit" className="btn-success" disabled={loading}>
          {loading ? 'Registrando...' : 'Registrar Nota'}
        </button>
      </form>
    </div>
  );
};

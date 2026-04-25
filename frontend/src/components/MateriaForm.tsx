import React, { useState, useEffect } from 'react';
import type { Materia } from '../types';
import { materiaService } from '../services/api';

interface MateriaFormProps {
  materia?: Materia | null;
  onSubmit: () => void;
}

export const MateriaForm: React.FC<MateriaFormProps> = ({ materia, onSubmit }) => {
  const [formData, setFormData] = useState<Materia>({
    nombre: '',
    codigo: '',
    creditos: 0,
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (materia) {
      setFormData(materia);
    } else {
      setFormData({ nombre: '', codigo: '', creditos: 0 });
    }
  }, [materia]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'creditos' ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      if (materia?.id) {
        await materiaService.update(materia.id, formData);
        setSuccess('Materia actualizada correctamente');
      } else {
        await materiaService.create(formData);
        setSuccess('Materia creada correctamente');
        setFormData({ nombre: '', codigo: '', creditos: 0 });
      }
      onSubmit();
    } catch (err) {
      setError('Error al guardar materia');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>{materia ? 'Editar Materia' : 'Crear Materia'}</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Código</label>
          <input
            type="text"
            name="codigo"
            value={formData.codigo}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Créditos</label>
          <input
            type="number"
            name="creditos"
            value={formData.creditos}
            onChange={handleChange}
            required
            min="1"
            max="10"
          />
        </div>
        <button type="submit" className="btn-success" disabled={loading}>
          {loading ? 'Guardando...' : 'Guardar'}
        </button>
      </form>
    </div>
  );
};

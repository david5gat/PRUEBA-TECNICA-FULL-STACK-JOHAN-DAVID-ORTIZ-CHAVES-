import React, { useState, useEffect } from 'react';
import type { Alumno } from '../types';
import { alumnoService } from '../services/api';

interface AlumnoFormProps {
  alumno?: Alumno | null;
  onSubmit: () => void;
}

export const AlumnoForm: React.FC<AlumnoFormProps> = ({ alumno, onSubmit }) => {
  const [formData, setFormData] = useState<Alumno>({
    nombre: '',
    apellido: '',
    email: '',
    fechaNacimiento: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (alumno) {
      setFormData(alumno);
    } else {
      setFormData({ nombre: '', apellido: '', email: '', fechaNacimiento: '' });
    }
  }, [alumno]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      if (alumno?.id) {
        await alumnoService.update(alumno.id, formData);
        setSuccess('Alumno actualizado correctamente');
      } else {
        await alumnoService.create(formData);
        setSuccess('Alumno creado correctamente');
        setFormData({ nombre: '', apellido: '', email: '', fechaNacimiento: '' });
      }
      onSubmit();
    } catch (err) {
      setError('Error al guardar alumno');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>{alumno ? 'Editar Alumno' : 'Crear Alumno'}</h2>
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
          <label>Apellido</label>
          <input
            type="text"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Fecha de Nacimiento</label>
          <input
            type="date"
            name="fechaNacimiento"
            value={formData.fechaNacimiento}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn-success" disabled={loading}>
          {loading ? 'Guardando...' : 'Guardar'}
        </button>
      </form>
    </div>
  );
};

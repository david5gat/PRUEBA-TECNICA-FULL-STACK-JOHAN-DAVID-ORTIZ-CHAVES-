import React, { useState } from 'react';
import type { Materia } from '../types';
import { materiaService } from '../services/api';

interface MateriaSearchProps {
  onSelect?: (materia: Materia) => void;
}

export const MateriaSearch: React.FC<MateriaSearchProps> = ({ onSelect }) => {
  const [id, setId] = useState<number | ''>('');
  const [name, setName] = useState('');
  const [results, setResults] = useState<Materia[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    setError(null);
    setResults([]);
    if (id === '' && name.trim() === '') {
      setError('Ingrese ID o nombre para buscar');
      return;
    }

    try {
      setLoading(true);
      if (id !== '') {
        const resp = await materiaService.getById(id as number);
        setResults([resp.data]);
      } else {
        const resp = await materiaService.getAll();
        const q = name.trim().toLowerCase();
        const filtered = resp.data.filter(m =>
          (m.nombre.toLowerCase().includes(q) || m.codigo.toLowerCase().includes(q))
        );
        setResults(filtered);
      }
    } catch (err) {
      const status = (err as any)?.response?.status;
      if (status === 404) setError('Materia no encontrada');
      else setError('Error al buscar materia');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setId('');
    setName('');
    setResults([]);
    setError(null);
  };

  const handleDelete = async (idToDelete?: number) => {
    if (!idToDelete) return;
    if (!confirm('¿Está seguro de eliminar esta materia?')) return;
    try {
      await materiaService.delete(idToDelete);
      setResults(prev => prev.filter(m => m.id !== idToDelete));
    } catch (err) {
      setError('Error al eliminar materia');
      console.error(err);
    }
  };

  return (
    <div className="card">
      <h3>Buscar / Filtrar Materia</h3>

      <div className="form-group">
        <label>ID</label>
        <input
          type="number"
          value={id as any}
          onChange={e => setId(e.target.value === '' ? '' : parseInt(e.target.value, 10))}
        />
      </div>

      <div className="form-group">
        <label>Nombre o Código</label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Ej: Matemáticas o MAT101"
        />
      </div>

      <div style={{ display: 'flex', gap: '8px' }}>
        <button className="btn-primary" onClick={handleSearch} disabled={loading}>
          {loading ? 'Buscando...' : 'Buscar'}
        </button>
        <button className="btn-secondary" onClick={handleClear} style={{ border: 'none' }}>
          Limpiar
        </button>
      </div>

      {error && <div className="alert alert-danger" style={{ marginTop: 12 }}>{error}</div>}

      {results.length > 0 && (
        <div style={{ marginTop: 12 }}>
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
              {results.map(m => (
                <tr key={m.id}>
                  <td>{m.id}</td>
                  <td>{m.nombre}</td>
                  <td>{m.codigo}</td>
                  <td>{m.creditos}</td>
                  <td>
                    <button className="btn-primary" onClick={() => onSelect?.(m)}>Editar</button>
                    <button className="btn-danger" onClick={() => handleDelete(m.id)} style={{ marginLeft: 8 }}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {results.length === 0 && !loading && !error && <p className="text-center" style={{ marginTop: 12 }}>Sin resultados</p>}
    </div>
  );
};

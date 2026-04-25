import React, { useState, useEffect } from 'react';
import type { Nota } from '../types';
import { notaService } from '../services/api';
import { generateNotaPdf, generateNotasListPdf } from '../utils/pdf';

interface NotaListProps {
  refreshTrigger: number;
}

export const NotaList: React.FC<NotaListProps> = ({ refreshTrigger }) => {
  const [notas, setNotas] = useState<Nota[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'alumno' | 'materia' | 'flat'>('alumno');
  

  useEffect(() => {
    loadNotas();
  }, [refreshTrigger]);

  const loadNotas = async () => {
    try {
      setLoading(true);
      const response = await notaService.getAll();
      setNotas(response.data);
      setError(null);
    } catch (err) {
      setError('Error al cargar notas');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number | undefined) => {
    if (!id) return;
    if (confirm('¿Está seguro de que desea eliminar esta nota?')) {
      try {
        await notaService.delete(id);
        loadNotas();
      } catch (err) {
        setError('Error al eliminar nota');
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
          <h2>Notas Registradas</h2>
          <div>
            <button className="btn-secondary" onClick={async () => {
              try {
                await generateNotasListPdf(notas);
              } catch (err) {
                console.error('Error generando PDF de lista de notas', err);
                alert('Error generando PDF');
              }
            }}>Exportar lista (PDF)</button>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8, marginBottom: 12 }} className="group-toggle">
          <button className={"btn-secondary" + (viewMode === 'alumno' ? ' active' : '')} onClick={() => setViewMode('alumno')}>Agrupar por alumno</button>
          <button className={"btn-secondary" + (viewMode === 'materia' ? ' active' : '')} onClick={() => setViewMode('materia')}>Agrupar por materia</button>
          <button className={"btn-secondary" + (viewMode === 'flat' ? ' active' : '')} onClick={() => setViewMode('flat')}>Ver lista plana</button>
        </div>

        {viewMode === 'flat' ? (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Alumno</th>
                <th>Materia</th>
                <th>Valor</th>
                <th>Fecha Registro</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {notas.map(nota => (
                <tr key={nota.id}>
                  <td>{nota.id}</td>
                  <td>{nota.alumnoNombre}</td>
                  <td>{nota.materiaNombre}</td>
                  <td>{nota.valor.toFixed(2)}</td>
                  <td>{nota.fechaRegistro ? new Date(nota.fechaRegistro).toLocaleDateString() : 'N/A'}</td>
                  <td>
                    <button className="btn-danger" onClick={() => handleDelete(nota.id)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : viewMode === 'materia' ? (
          <div className="nota-groups">
            {Object.values(notas.reduce((acc: Record<number, { materiaNombre: string; notas: Nota[] }>, n) => {
              const key = n.materiaId ?? -1;
              if (!acc[key]) acc[key] = { materiaNombre: n.materiaNombre || `Materia ${n.materiaId}`, notas: [] };
              acc[key].notas.push(n);
              return acc;
            }, {})).map(group => (
              <div key={group.materiaNombre} className="card subject-card">
                <h3>{group.materiaNombre}</h3>
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Alumno</th>
                      <th>Valor</th>
                      <th>Fecha Registro</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {group.notas.map(n => (
                      <tr key={n.id ?? `${n.alumnoId}-${n.materiaId}-${n.fechaRegistro}`}>
                        <td>{n.id}</td>
                        <td>{n.alumnoNombre ?? `ID ${n.alumnoId}`}</td>
                        <td>{n.valor.toFixed(2)}</td>
                        <td>{n.fechaRegistro ? new Date(n.fechaRegistro).toLocaleDateString() : 'N/A'}</td>
                        <td>
                          <button className="btn-danger" onClick={() => handleDelete(n.id)}>Eliminar</button>
                          <button className="btn-secondary" onClick={() => generateNotaPdf(n)} style={{ marginLeft: 8 }}>PDF</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        ) : (
          <div className="nota-groups">
            {Object.values(notas.reduce((acc: Record<number, { alumnoNombre: string; materias: Record<number, { materiaNombre: string; notas: Nota[] }> }>, n) => {
              const aKey = n.alumnoId ?? -1;
              if (!acc[aKey]) acc[aKey] = { alumnoNombre: n.alumnoNombre || `Alumno ${n.alumnoId}`, materias: {} };
              const mKey = n.materiaId ?? -1;
              if (!acc[aKey].materias[mKey]) acc[aKey].materias[mKey] = { materiaNombre: n.materiaNombre || `Materia ${n.materiaId}`, notas: [] };
              acc[aKey].materias[mKey].notas.push(n);
              return acc;
            }, {})).map(alGroup => (
              <div key={alGroup.alumnoNombre} className="card subject-card">
                <h3>{alGroup.alumnoNombre}</h3>
                {Object.values(alGroup.materias).map(mg => (
                  <div key={mg.materiaNombre} style={{ marginTop: 10 }}>
                    <h4 style={{ margin: '6px 0' }}>{mg.materiaNombre}</h4>
                    <table>
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Alumno</th>
                          <th>Valor</th>
                          <th>Fecha Registro</th>
                          <th>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mg.notas.map(n => (
                          <tr key={n.id ?? `${n.alumnoId}-${n.materiaId}-${n.fechaRegistro}`}>
                            <td>{n.id}</td>
                            <td>{n.alumnoNombre ?? `ID ${n.alumnoId}`}</td>
                            <td>{n.valor.toFixed(2)}</td>
                            <td>{n.fechaRegistro ? new Date(n.fechaRegistro).toLocaleDateString() : 'N/A'}</td>
                            <td>
                              <button className="btn-danger" onClick={() => handleDelete(n.id)}>Eliminar</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {notas.length === 0 && <p className="text-center">No hay notas registradas</p>}
      </div>
    </>
  );
};

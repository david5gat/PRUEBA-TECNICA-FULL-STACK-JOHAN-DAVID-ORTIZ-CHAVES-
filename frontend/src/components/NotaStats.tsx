import React, { useEffect, useState } from 'react';
import type { Nota, Materia, Alumno } from '../types';
import { notaService, materiaService, alumnoService } from '../services/api';

interface MateriaStat {
  materiaId: number;
  materiaNombre: string;
  promedio: number | null;
  top: Array<{ alumnoId: number; alumnoNombre: string; valor: number }>;
}

export const NotaStats: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<MateriaStat[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const [notasResp, materiasResp, alumnosResp] = await Promise.all([
          notaService.getAll(),
          materiaService.getAll(),
          alumnoService.getAll(),
        ]);

        const notas: Nota[] = notasResp.data || [];
        const materias: Materia[] = materiasResp.data || [];
        const alumnos: Alumno[] = alumnosResp.data || [];

        const alumnosMap = new Map<number, string>();
        alumnos.forEach(a => {
          if (a.id !== undefined) alumnosMap.set(a.id, `${a.nombre} ${a.apellido}`);
        });

        const result: MateriaStat[] = materias.map(m => {
          const mid = m.id ?? -1;
          const notasDeM = notas.filter(n => n.materiaId === mid);
          if (notasDeM.length === 0) {
            return { materiaId: mid, materiaNombre: m.nombre, promedio: null, top: [] };
          }
          const sum = notasDeM.reduce((s, n) => s + (n.valor || 0), 0);
          const promedio = sum / notasDeM.length;
          const top = notasDeM
            .slice()
            .sort((a, b) => b.valor - a.valor)
            .slice(0, 3)
            .map(n => ({ alumnoId: n.alumnoId, alumnoNombre: n.alumnoNombre || alumnosMap.get(n.alumnoId) || 'Desconocido', valor: n.valor }));

          return { materiaId: mid, materiaNombre: m.nombre, promedio, top };
        });

        setStats(result);
      } catch (err) {
        console.error('Error cargando estadísticas de notas', err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading) return <div className="loading"><div className="spinner"></div></div>;

  return (
    <div className="nota-stats">
      {stats.map(s => (
        <div key={s.materiaId} className="card stat-card">
          <h3>{s.materiaNombre}</h3>
          <p><strong>Promedio:</strong> {s.promedio !== null ? s.promedio.toFixed(2) : 'N/D'}</p>
          <div>
            <strong>Mejores puestos:</strong>
            {s.top.length === 0 ? (
              <p className="mt-20">No hay notas registradas</p>
            ) : (
              <ol>
                {s.top.map((t) => (
                  <li key={`${s.materiaId}-${t.alumnoId}`}>{t.alumnoNombre} — {t.valor.toFixed(2)}</li>
                ))}
              </ol>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotaStats;

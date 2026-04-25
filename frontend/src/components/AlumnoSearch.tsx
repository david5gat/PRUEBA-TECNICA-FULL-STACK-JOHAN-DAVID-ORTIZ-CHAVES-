 import React, { useState } from 'react';
 import type { Alumno } from '../types';
 import { alumnoService } from '../services/api';

 interface AlumnoSearchProps {
   onSelect?: (alumno: Alumno) => void;
 }

 export const AlumnoSearch: React.FC<AlumnoSearchProps> = ({ onSelect }) => {
   const [id, setId] = useState<number | ''>('');
   const [name, setName] = useState('');
   const [results, setResults] = useState<Alumno[]>([]);
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
         const resp = await alumnoService.getById(id as number);
         setResults([resp.data]);
       } else {
         const resp = await alumnoService.getAll();
         const q = name.trim().toLowerCase();
         const filtered = resp.data.filter(a =>
           (`${a.nombre} ${a.apellido}`.toLowerCase().includes(q) || a.nombre.toLowerCase().includes(q) || a.apellido.toLowerCase().includes(q))
         );
         setResults(filtered);
       }
     } catch (err) {
       const status = (err as any)?.response?.status;
       if (status === 404) setError('Alumno no encontrado');
       else setError('Error al buscar alumno');
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
     if (!confirm('¿Está seguro de eliminar este alumno?')) return;
     try {
       await alumnoService.delete(idToDelete);
       setResults(prev => prev.filter(a => a.id !== idToDelete));
     } catch (err) {
       setError('Error al eliminar alumno');
       console.error(err);
     }
   };

   return (
     <div className="card">
       <h3>Buscar / Filtrar Alumno</h3>

       <div className="form-group">
         <label>ID</label>
         <input
           type="number"
           value={id as any}
           onChange={e => setId(e.target.value === '' ? '' : parseInt(e.target.value, 10))}
         />
       </div>

       <div className="form-group">
         <label>Nombre o Apellido</label>
         <input
           type="text"
           value={name}
           onChange={e => setName(e.target.value)}
           placeholder="Ej: Juan o Pérez"
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
                 <th>Email</th>
                 <th>Acciones</th>
               </tr>
             </thead>
             <tbody>
               {results.map(a => (
                 <tr key={a.id}>
                   <td>{a.id}</td>
                   <td>{a.nombre} {a.apellido}</td>
                   <td>{a.email}</td>
                   <td>
                     <button className="btn-primary" onClick={() => onSelect?.(a)}>Editar</button>
                     <button className="btn-danger" onClick={() => handleDelete(a.id)} style={{ marginLeft: 8 }}>Eliminar</button>
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

import { useState } from 'react';
import './styles/index.css';
import { AlumnoForm } from './components/AlumnoForm';
import { AlumnoList } from './components/AlumnoList';
import { AlumnoSearch } from './components/AlumnoSearch';
import { MateriaForm } from './components/MateriaForm';
import { MateriaList } from './components/MateriaList';
import { MateriaSearch } from './components/MateriaSearch';
import { NotaForm } from './components/NotaForm';
import { NotaList } from './components/NotaList';
import NotaStats from './components/NotaStats';
import type { Alumno, Materia } from './types';

type TabType = 'alumnos' | 'materias' | 'notas';

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('alumnos');
  const [refreshAlumnos, setRefreshAlumnos] = useState(0);
  const [refreshMaterias, setRefreshMaterias] = useState(0);
  const [refreshNotas, setRefreshNotas] = useState(0);
  const [editingAlumno, setEditingAlumno] = useState<Alumno | null>(null);
  const [editingMateria, setEditingMateria] = useState<Materia | null>(null);

  const handleAlumnoSubmit = () => {
    setRefreshAlumnos(prev => prev + 1);
    setEditingAlumno(null);
  };

  const handleMateriaSubmit = () => {
    setRefreshMaterias(prev => prev + 1);
    setEditingMateria(null);
  };

  const handleNotaSubmit = () => {
    setRefreshNotas(prev => prev + 1);
  };

  const handleEditAlumno = (alumno: Alumno) => {
    setEditingAlumno(alumno);
  };

  const handleEditMateria = (materia: Materia) => {
    setEditingMateria(materia);
  };

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className='Logo'>🎓</div>
          <div className="title-brand">
            <div className="brand-logo">Academia</div>
          <div className="brand-sub">Sistema de Gestión</div>
          </div>
        </div>

        <ul className="sidebar-nav">
          <li className={activeTab === 'alumnos' ? 'active' : ''} onClick={() => setActiveTab('alumnos')}>Alumnos</li>
          <li className={activeTab === 'materias' ? 'active' : ''} onClick={() => setActiveTab('materias')}>Materias</li>
          <li className={activeTab === 'notas' ? 'active' : ''} onClick={() => setActiveTab('notas')}>Notas</li>
        </ul>

        <div className="sidebar-footer">Cerrar sesión</div>
      </aside>

      <div className="main-area">
        <header className="topbar">
          <div className="topbar-left">
            <h2 className="page-title">{activeTab === 'alumnos' ? 'Alumnos' : activeTab === 'materias' ? 'Materias' : 'Notas'}</h2>
            <p className="subtitle">{activeTab === 'alumnos' ? 'Gestiona la información de los alumnos de la academia.' : activeTab === 'materias' ? 'Gestiona las materias disponibles.' : 'Administra las notas registradas.'}</p>
            {/* <div className='Logo'>🎓</div> */}
          </div>
          <div className="topbar-right">
            <div className="notif"></div>
            <div className="profile">AD<div className="profile-role">Administrador </div> <div className='Logo-rol'>👨🏻‍🏫</div></div>
          </div>
        </header>

        <main className="container content-area">
          {activeTab === 'alumnos' && (
            <div className="content-grid">
              <div className="form-column">
                <AlumnoForm alumno={editingAlumno} onSubmit={handleAlumnoSubmit} />
                <AlumnoSearch onSelect={handleEditAlumno} />
              </div>
              <div className="list-column">
                <AlumnoList onEdit={handleEditAlumno} refreshTrigger={refreshAlumnos} />
              </div>
            </div>
          )}

          {activeTab === 'materias' && (
            <div className="content-grid">
              <div className="form-column">
                <MateriaForm materia={editingMateria} onSubmit={handleMateriaSubmit} />
                <MateriaSearch onSelect={handleEditMateria} />
              </div>
              <div className="list-column">
                <MateriaList onEdit={handleEditMateria} refreshTrigger={refreshMaterias} />
              </div>
            </div>
          )}

          {activeTab === 'notas' && (
            <div className="content-grid">
              <div className="form-column">
                <NotaForm onSubmit={handleNotaSubmit} />
              </div>
              <div className="list-column">
                <NotaList refreshTrigger={refreshNotas} />
                <NotaStats />
              </div>
            </div>
          )}
        </main>

        <footer className="site-footer">
          <div className="container">
            <p>© 2026 Academia - Sistema de Gestión de Alumnos, Materias y Notas</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;

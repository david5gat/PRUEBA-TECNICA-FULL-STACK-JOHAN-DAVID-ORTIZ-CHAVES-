import { jsPDF } from 'jspdf';
import type { Alumno, Materia, Nota } from '../types';

function addWrappedText(doc: jsPDF, text: string, x: number, yStart: number, lineHeight = 7, maxWidth = 180) {
  const lines: string[] = doc.splitTextToSize(text, maxWidth) as string[];
  let y = yStart;
  lines.forEach((l: string) => {
    doc.text(l, x, y);
    y += lineHeight;
  });
  return y;
}

export async function generateAlumnoPdf(alumno: Alumno, notas: Nota[]) {
  const doc = new jsPDF();
  doc.setFontSize(18);
  doc.text('Ficha de Alumno', 14, 18);

  doc.setFontSize(12);
  let y = 30;
  doc.text(`ID: ${alumno.id ?? 'N/A'}`, 14, y);
  doc.text(`Nombre: ${alumno.nombre} ${alumno.apellido}`, 80, y);
  y += 8;
  doc.text(`Email: ${alumno.email}`, 14, y);
  doc.text(`Fecha Nacimiento: ${alumno.fechaNacimiento}`, 80, y);

  y += 12;
  doc.setFontSize(14);
  doc.text('Notas', 14, y);
  y += 8;

  if (!notas || notas.length === 0) {
    doc.setFontSize(12);
    doc.text('No hay notas registradas para este alumno.', 14, y);
  } else {
    doc.setFontSize(11);
    notas.forEach((n, idx) => {
      if (y > 270) { doc.addPage(); y = 20; }
      const fecha = n.fechaRegistro ? new Date(n.fechaRegistro).toLocaleString() : 'N/A';
      addWrappedText(doc, `${idx + 1}. Materia: ${n.materiaNombre ?? 'N/D'} — Valor: ${n.valor.toFixed(2)} — Fecha: ${fecha}`, 14, y, 7, 180);
      y += 8;
    });
  }

  doc.save(`alumno-${alumno.id ?? 'unknown'}.pdf`);
}

export async function generateMateriaPdf(materia: Materia, notas: Nota[]) {
  const doc = new jsPDF();
  doc.setFontSize(18);
  doc.text('Ficha de Materia', 14, 18);

  doc.setFontSize(12);
  let y = 30;
  doc.text(`ID: ${materia.id ?? 'N/A'}`, 14, y);
  doc.text(`Nombre: ${materia.nombre}`, 80, y);
  y += 8;
  doc.text(`Código: ${materia.codigo}`, 14, y);
  doc.text(`Créditos: ${materia.creditos}`, 80, y);

  y += 12;
  doc.setFontSize(14);
  doc.text('Notas por Alumno', 14, y);
  y += 8;

  if (!notas || notas.length === 0) {
    doc.setFontSize(12);
    doc.text('No hay notas registradas para esta materia.', 14, y);
  } else {
    doc.setFontSize(11);
    notas.forEach((n, idx) => {
      if (y > 270) { doc.addPage(); y = 20; }
      const fecha = n.fechaRegistro ? new Date(n.fechaRegistro).toLocaleString() : 'N/A';
      addWrappedText(doc, `${idx + 1}. Alumno: ${n.alumnoNombre ?? 'N/D'} — Valor: ${n.valor.toFixed(2)} — Fecha: ${fecha}`, 14, y, 7, 180);
      y += 8;
    });
  }

  doc.save(`materia-${materia.id ?? 'unknown'}.pdf`);
}

export async function generateNotaPdf(nota: Nota) {
  const doc = new jsPDF();
  doc.setFontSize(16);
  doc.text('Detalle de Nota', 14, 18);

  doc.setFontSize(12);
  let y = 30;
  doc.text(`ID: ${nota.id ?? 'N/A'}`, 14, y);
  doc.text(`Alumno: ${nota.alumnoNombre ?? `ID ${nota.alumnoId}`}`, 14, y + 8);
  doc.text(`Materia: ${nota.materiaNombre ?? `ID ${nota.materiaId}`}`, 14, y + 16);
  doc.text(`Valor: ${nota.valor.toFixed(2)}`, 14, y + 24);
  doc.text(`Fecha registro: ${nota.fechaRegistro ? new Date(nota.fechaRegistro).toLocaleString() : 'N/A'}`, 14, y + 32);

  doc.save(`nota-${nota.id ?? 'unknown'}.pdf`);
}

export async function generateAlumnosListPdf(alumnos: Alumno[]) {
  const doc = new jsPDF();
  doc.setFontSize(18);
  doc.text('Listado de Alumnos', 14, 18);

  doc.setFontSize(12);
  let y = 30;

  if (!alumnos || alumnos.length === 0) {
    doc.text('No hay alumnos para exportar.', 14, y);
  } else {
    // Header
    if (y > 270) { doc.addPage(); y = 20; }
    doc.setFontSize(12);
    doc.text('ID', 14, y);
    doc.text('Nombre', 40, y);
    doc.text('Apellido', 100, y);
    doc.text('Email', 140, y);
    y += 8;

    alumnos.forEach((a) => {
      if (y > 270) { doc.addPage(); y = 20; }
      doc.setFontSize(11);
      doc.text(String(a.id ?? 'N/A'), 14, y);
      doc.text(a.nombre, 40, y);
      doc.text(a.apellido, 100, y);
      doc.text(a.email, 140, y);
      y += 8;
    });
  }

  doc.save(`alumnos-list-${new Date().toISOString().split('T')[0]}.pdf`);
}

export async function generateMateriasListPdf(materias: Materia[]) {
  const doc = new jsPDF();
  doc.setFontSize(18);
  doc.text('Listado de Materias', 14, 18);

  doc.setFontSize(12);
  let y = 30;

  if (!materias || materias.length === 0) {
    doc.text('No hay materias para exportar.', 14, y);
  } else {
    doc.setFontSize(12);
    doc.text('ID', 14, y);
    doc.text('Nombre', 40, y);
    doc.text('Código', 110, y);
    doc.text('Créditos', 150, y);
    y += 8;

    materias.forEach((m) => {
      if (y > 270) { doc.addPage(); y = 20; }
      doc.setFontSize(11);
      doc.text(String(m.id ?? 'N/A'), 14, y);
      doc.text(m.nombre, 40, y);
      doc.text(m.codigo, 110, y);
      doc.text(String(m.creditos ?? 'N/A'), 150, y);
      y += 8;
    });
  }

  doc.save(`materias-list-${new Date().toISOString().split('T')[0]}.pdf`);
}

export async function generateNotasListPdf(notas: Nota[]) {
  const doc = new jsPDF();
  doc.setFontSize(18);
  doc.text('Listado de Notas', 14, 18);

  doc.setFontSize(12);
  let y = 30;

  if (!notas || notas.length === 0) {
    doc.text('No hay notas para exportar.', 14, y);
  } else {
    // header
    doc.setFontSize(12);
    doc.text('ID', 14, y);
    doc.text('Alumno', 34, y);
    doc.text('Materia', 94, y);
    doc.text('Valor', 154, y);
    doc.text('Fecha', 170, y);
    y += 8;

    notas.forEach((n) => {
      if (y > 270) { doc.addPage(); y = 20; }
      doc.setFontSize(11);
      doc.text(String(n.id ?? 'N/A'), 14, y);
      doc.text(n.alumnoNombre ?? `ID ${n.alumnoId}`, 34, y);
      doc.text(n.materiaNombre ?? `ID ${n.materiaId}`, 94, y);
      doc.text(String(n.valor.toFixed(2)), 154, y);
      doc.text(n.fechaRegistro ? new Date(n.fechaRegistro).toLocaleDateString() : 'N/A', 170, y);
      y += 8;
    });
  }

  doc.save(`notas-list-${new Date().toISOString().split('T')[0]}.pdf`);
}

export default { generateAlumnoPdf, generateMateriaPdf, generateNotaPdf, generateAlumnosListPdf, generateMateriasListPdf, generateNotasListPdf };

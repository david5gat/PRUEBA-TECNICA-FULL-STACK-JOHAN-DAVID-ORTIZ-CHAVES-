package com.academia.api.service;

import com.academia.api.dto.NotaDTO;
import com.academia.api.exception.ResourceNotFoundException;
import com.academia.api.model.Alumno;
import com.academia.api.model.Materia;
import com.academia.api.model.Nota;
import com.academia.api.repository.AlumnoRepository;
import com.academia.api.repository.MateriaRepository;
import com.academia.api.repository.NotaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class NotaService {

    private final NotaRepository notaRepository;
    private final AlumnoRepository alumnoRepository;
    private final MateriaRepository materiaRepository;

    public NotaDTO registrarNota(NotaDTO notaDTO) {
        Alumno alumno = alumnoRepository.findById(notaDTO.getAlumnoId())
                .orElseThrow(() -> new ResourceNotFoundException("Alumno no encontrado con id: " + notaDTO.getAlumnoId()));

        Materia materia = materiaRepository.findById(notaDTO.getMateriaId())
                .orElseThrow(() -> new ResourceNotFoundException("Materia no encontrada con id: " + notaDTO.getMateriaId()));

        Nota nota = Nota.builder()
                .valor(notaDTO.getValor())
                .fechaRegistro(LocalDateTime.now())
                .alumno(alumno)
                .materia(materia)
                .build();

        Nota saved = notaRepository.save(nota);
        return mapToDTO(saved);
    }

    @Transactional(readOnly = true)
    public List<NotaDTO> listarNotasPorAlumno(Long alumnoId) {
        return notaRepository.findByAlumnoId(alumnoId).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<NotaDTO> listarNotasPorAlumnoYMateria(Long alumnoId, Long materiaId) {
        return notaRepository.findByAlumnoIdAndMateriaId(alumnoId, materiaId).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<NotaDTO> listarTodasLasNotas() {
        return notaRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public NotaDTO obtenerNotaById(Long id) {
        return notaRepository.findById(id)
                .map(this::mapToDTO)
                .orElseThrow(() -> new ResourceNotFoundException("Nota no encontrada con id: " + id));
    }

    public void eliminarNota(Long id) {
        if (!notaRepository.existsById(id)) {
            throw new ResourceNotFoundException("Nota no encontrada con id: " + id);
        }
        notaRepository.deleteById(id);
    }

    private NotaDTO mapToDTO(Nota nota) {
        return NotaDTO.builder()
                .id(nota.getId())
                .valor(nota.getValor())
                .fechaRegistro(nota.getFechaRegistro())
                .alumnoId(nota.getAlumno().getId())
                .materiaId(nota.getMateria().getId())
                .alumnoNombre(nota.getAlumno().getNombre() + " " + nota.getAlumno().getApellido())
                .materiaNombre(nota.getMateria().getNombre())
                .build();
    }
}

package com.academia.api.service;

import com.academia.api.dto.AlumnoDTO;
import com.academia.api.exception.ResourceNotFoundException;
import com.academia.api.model.Alumno;
import com.academia.api.repository.AlumnoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class AlumnoService {

    private final AlumnoRepository alumnoRepository;

    public AlumnoDTO crearAlumno(AlumnoDTO alumnoDTO) {
        Alumno alumno = mapToEntity(alumnoDTO);
        Alumno saved = alumnoRepository.save(alumno);
        return mapToDTO(saved);
    }

    @Transactional(readOnly = true)
    public List<AlumnoDTO> listarAlumnos() {
        return alumnoRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public AlumnoDTO obtenerAlumnoById(Long id) {
        return alumnoRepository.findById(id)
                .map(this::mapToDTO)
                .orElseThrow(() -> new ResourceNotFoundException("Alumno no encontrado con id: " + id));
    }

    public AlumnoDTO actualizarAlumno(Long id, AlumnoDTO alumnoDTO) {
        Alumno alumno = alumnoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Alumno no encontrado con id: " + id));

        alumno.setNombre(alumnoDTO.getNombre());
        alumno.setApellido(alumnoDTO.getApellido());
        alumno.setEmail(alumnoDTO.getEmail());
        alumno.setFechaNacimiento(alumnoDTO.getFechaNacimiento());

        Alumno updated = alumnoRepository.save(alumno);
        return mapToDTO(updated);
    }

    public void eliminarAlumno(Long id) {
        if (!alumnoRepository.existsById(id)) {
            throw new ResourceNotFoundException("Alumno no encontrado con id: " + id);
        }
        alumnoRepository.deleteById(id);
    }

    private AlumnoDTO mapToDTO(Alumno alumno) {
        return AlumnoDTO.builder()
                .id(alumno.getId())
                .nombre(alumno.getNombre())
                .apellido(alumno.getApellido())
                .email(alumno.getEmail())
                .fechaNacimiento(alumno.getFechaNacimiento())
                .build();
    }

    private Alumno mapToEntity(AlumnoDTO dto) {
        return Alumno.builder()
                .nombre(dto.getNombre())
                .apellido(dto.getApellido())
                .email(dto.getEmail())
                .fechaNacimiento(dto.getFechaNacimiento())
                .build();
    }
}

package com.academia.api.service;

import com.academia.api.dto.MateriaDTO;
import com.academia.api.exception.ResourceNotFoundException;
import com.academia.api.model.Materia;
import com.academia.api.repository.MateriaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class MateriaService {

    private final MateriaRepository materiaRepository;

    public MateriaDTO crearMateria(MateriaDTO materiaDTO) {
        Materia materia = mapToEntity(materiaDTO);
        Materia saved = materiaRepository.save(materia);
        return mapToDTO(saved);
    }

    @Transactional(readOnly = true)
    public List<MateriaDTO> listarMaterias() {
        return materiaRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public MateriaDTO obtenerMateriaById(Long id) {
        return materiaRepository.findById(id)
                .map(this::mapToDTO)
                .orElseThrow(() -> new ResourceNotFoundException("Materia no encontrada con id: " + id));
    }

    public MateriaDTO actualizarMateria(Long id, MateriaDTO materiaDTO) {
        Materia materia = materiaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Materia no encontrada con id: " + id));

        materia.setNombre(materiaDTO.getNombre());
        materia.setCodigo(materiaDTO.getCodigo());
        materia.setCreditos(materiaDTO.getCreditos());

        Materia updated = materiaRepository.save(materia);
        return mapToDTO(updated);
    }

    public void eliminarMateria(Long id) {
        if (!materiaRepository.existsById(id)) {
            throw new ResourceNotFoundException("Materia no encontrada con id: " + id);
        }
        materiaRepository.deleteById(id);
    }

    private MateriaDTO mapToDTO(Materia materia) {
        return MateriaDTO.builder()
                .id(materia.getId())
                .nombre(materia.getNombre())
                .codigo(materia.getCodigo())
                .creditos(materia.getCreditos())
                .build();
    }

    private Materia mapToEntity(MateriaDTO dto) {
        return Materia.builder()
                .nombre(dto.getNombre())
                .codigo(dto.getCodigo())
                .creditos(dto.getCreditos())
                .build();
    }
}

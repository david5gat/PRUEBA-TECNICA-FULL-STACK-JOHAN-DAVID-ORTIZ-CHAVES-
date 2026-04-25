package com.academia.api.controller;

import com.academia.api.dto.MateriaDTO;
import com.academia.api.service.MateriaService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/materias")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class MateriaController {

    private final MateriaService materiaService;

    @PostMapping
    public ResponseEntity<MateriaDTO> crearMateria(@Valid @RequestBody MateriaDTO materiaDTO) {
        MateriaDTO created = materiaService.crearMateria(materiaDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @GetMapping
    public ResponseEntity<List<MateriaDTO>> listarMaterias() {
        List<MateriaDTO> materias = materiaService.listarMaterias();
        return ResponseEntity.ok(materias);
    }

    @GetMapping("/{id}")
    public ResponseEntity<MateriaDTO> obtenerMateria(@PathVariable Long id) {
        MateriaDTO materia = materiaService.obtenerMateriaById(id);
        return ResponseEntity.ok(materia);
    }

    @PutMapping("/{id}")
    public ResponseEntity<MateriaDTO> actualizarMateria(@PathVariable Long id, @Valid @RequestBody MateriaDTO materiaDTO) {
        MateriaDTO updated = materiaService.actualizarMateria(id, materiaDTO);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarMateria(@PathVariable Long id) {
        materiaService.eliminarMateria(id);
        return ResponseEntity.noContent().build();
    }
}

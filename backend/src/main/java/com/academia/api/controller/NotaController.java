package com.academia.api.controller;

import com.academia.api.dto.NotaDTO;
import com.academia.api.service.NotaService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notas")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class NotaController {

    private final NotaService notaService;

    @PostMapping
    public ResponseEntity<NotaDTO> registrarNota(@Valid @RequestBody NotaDTO notaDTO) {
        NotaDTO created = notaService.registrarNota(notaDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @GetMapping
    public ResponseEntity<List<NotaDTO>> listarNotas() {
        List<NotaDTO> notas = notaService.listarTodasLasNotas();
        return ResponseEntity.ok(notas);
    }

    @GetMapping("/alumno/{alumnoId}")
    public ResponseEntity<List<NotaDTO>> listarNotasPorAlumno(@PathVariable Long alumnoId) {
        List<NotaDTO> notas = notaService.listarNotasPorAlumno(alumnoId);
        return ResponseEntity.ok(notas);
    }

    @GetMapping("/alumno/{alumnoId}/materia/{materiaId}")
    public ResponseEntity<List<NotaDTO>> listarNotasPorAlumnoYMateria(
            @PathVariable Long alumnoId,
            @PathVariable Long materiaId) {
        List<NotaDTO> notas = notaService.listarNotasPorAlumnoYMateria(alumnoId, materiaId);
        return ResponseEntity.ok(notas);
    }

    @GetMapping("/{id}")
    public ResponseEntity<NotaDTO> obtenerNota(@PathVariable Long id) {
        NotaDTO nota = notaService.obtenerNotaById(id);
        return ResponseEntity.ok(nota);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarNota(@PathVariable Long id) {
        notaService.eliminarNota(id);
        return ResponseEntity.noContent().build();
    }
}

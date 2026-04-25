package com.academia.api.controller;

import com.academia.api.dto.AlumnoDTO;
import com.academia.api.service.AlumnoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/alumnos")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AlumnoController {

    private final AlumnoService alumnoService;

    @PostMapping
    public ResponseEntity<AlumnoDTO> crearAlumno(@Valid @RequestBody AlumnoDTO alumnoDTO) {
        AlumnoDTO created = alumnoService.crearAlumno(alumnoDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @GetMapping
    public ResponseEntity<List<AlumnoDTO>> listarAlumnos() {
        List<AlumnoDTO> alumnos = alumnoService.listarAlumnos();
        return ResponseEntity.ok(alumnos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AlumnoDTO> obtenerAlumno(@PathVariable Long id) {
        AlumnoDTO alumno = alumnoService.obtenerAlumnoById(id);
        return ResponseEntity.ok(alumno);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AlumnoDTO> actualizarAlumno(@PathVariable Long id, @Valid @RequestBody AlumnoDTO alumnoDTO) {
        AlumnoDTO updated = alumnoService.actualizarAlumno(id, alumnoDTO);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarAlumno(@PathVariable Long id) {
        alumnoService.eliminarAlumno(id);
        return ResponseEntity.noContent().build();
    }
}

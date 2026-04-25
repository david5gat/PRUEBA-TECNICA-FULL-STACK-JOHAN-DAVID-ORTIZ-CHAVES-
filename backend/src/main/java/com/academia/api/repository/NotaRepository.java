package com.academia.api.repository;

import com.academia.api.model.Nota;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotaRepository extends JpaRepository<Nota, Long> {
    List<Nota> findByAlumnoId(Long alumnoId);
    List<Nota> findByAlumnoIdAndMateriaId(Long alumnoId, Long materiaId);
    List<Nota> findByMateriaId(Long materiaId);
}

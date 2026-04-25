package com.academia.api.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.validation.constraints.*;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NotaDTO {
    private Long id;
    
    @NotNull(message = "El valor de la nota es requerido")
    @DecimalMin(value = "0.0", message = "La nota debe ser mayor o igual a 0")
    @DecimalMax(value = "5.0", message = "La nota no puede superar 5.0")
    private Double valor;
    
    private LocalDateTime fechaRegistro;
    
    @NotNull(message = "El ID del alumno es requerido")
    private Long alumnoId;
    
    @NotNull(message = "El ID de la materia es requerido")
    private Long materiaId;
    
    private String alumnoNombre;
    private String materiaNombre;
}

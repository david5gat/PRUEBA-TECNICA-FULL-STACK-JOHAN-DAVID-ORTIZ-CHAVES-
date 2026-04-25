package com.academia.api.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.validation.constraints.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MateriaDTO {
    private Long id;
    
    @NotBlank(message = "El nombre de la materia es requerido")
    @Size(min = 2, max = 100, message = "El nombre debe tener entre 2 y 100 caracteres")
    private String nombre;
    
    @NotBlank(message = "El código de la materia es requerido")
    @Size(min = 3, max = 20, message = "El código debe tener entre 3 y 20 caracteres")
    private String codigo;
    
    @NotNull(message = "Los créditos son requeridos")
    @Min(value = 1, message = "Los créditos deben ser al menos 1")
    @Max(value = 6, message = "Los créditos no pueden superar 6")
    private Integer creditos;
}

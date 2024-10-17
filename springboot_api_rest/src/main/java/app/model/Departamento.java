package app.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Data
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table (name="departamento")
public class Departamento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "nombre_departamento", nullable = false, length = 100)
    private String nombreDepartamento;

    @OneToOne
    @JoinColumn(name = "jefe_departamento", referencedColumnName = "id")
    @JsonIgnore
    private Empleado jefeDepartamento;

//    private String nombreJefe = jefeDepartamento.getNombre();


    @JsonIgnore
    @OneToMany(mappedBy = "departamento")
    private Set<Empleado> empleados = new HashSet<>();

    @Column
    private LocalDateTime fechaRegistro;

    @PrePersist
    private void asignarFechaRegistro(){
        this.fechaRegistro = LocalDateTime.now();
    }
}

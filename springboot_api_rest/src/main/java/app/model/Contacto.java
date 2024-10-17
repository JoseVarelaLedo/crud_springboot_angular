package app.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table (name="contacto")
public class Contacto {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column (nullable = false, length = 50)
    private String nombre;
    @Column (nullable = false, length = 50)
    private String apellidos;
    @Column (nullable = false, length = 50)
    private String telefono;
    @Column (nullable = false, unique = true, length = 100)
    private String email;
    @Column (nullable = false, length = 255)
    private String direccion;

    private LocalDateTime fechaRegistro;
    @PrePersist
    private void asignarFechaRegistro(){
        this.fechaRegistro = LocalDateTime.now();
    }


}

package app.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Entity
@Table (name="empleado")
public class Empleado {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, length = 100)
    private String nombre;

    @Column(nullable = false, length = 100)
    private String apellidos;

    @Column(length = 15)
    private String telefono;

    @Column(length = 255)
    private String direccion;

    @Column(name = "correo_electronico", nullable = false, unique = true, length = 100)
    private String correoElectronico;

    @Column(name = "es_jefe")
    private Boolean esJefe = false;

    @Column(unique = true, length = 50)
    private String nickname;

    // Relación con Usuario (Composición)
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "usuario_id", referencedColumnName = "id")
    @JsonIgnore
    private Usuario usuario;

    // Relación con Contacto (Composición)
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "contacto_id", referencedColumnName = "id")
    @JsonIgnore
    private Contacto contacto;

    @ManyToOne
    @JoinColumn(name = "departamento_id", referencedColumnName = "id")
    @JsonIgnore
    private Departamento departamento;

    @DateTimeFormat(iso= DateTimeFormat.ISO.DATE)
    private LocalDate fechaNacimiento;


    private LocalDateTime fechaRegistro;

    @PrePersist
    private void onCreate(){
        this.fechaRegistro = LocalDateTime.now();
    }
}

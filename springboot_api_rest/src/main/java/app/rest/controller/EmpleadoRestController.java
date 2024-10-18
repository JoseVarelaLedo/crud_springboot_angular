package app.rest.controller;

import app.exceptions.ResourceNotFoundException;
import app.model.Departamento;
import app.model.Empleado;
import app.service.EmpleadoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/empleados")
@CrossOrigin(origins = "http://localhost:4200/")

public class EmpleadoRestController {
    @Autowired
    private EmpleadoService empleadoService;

    @GetMapping
    private ResponseEntity<List<Empleado>> getTodosEmpleados(){
        return ResponseEntity.ok(empleadoService.listarEmpleados());
    }

    @GetMapping ("/{id}")
    public ResponseEntity<Empleado> getContactoPorId(@PathVariable Integer id){
        try{
            Empleado empleado = empleadoService.obtenerEmpleadoPorId(id);
            return ResponseEntity.ok (empleado);
        }catch (ResourceNotFoundException ex){
            throw new ResourceNotFoundException("Empleado " + id + " no encontrado");
        }
    }

    @PostMapping
    public ResponseEntity<Empleado> crearDepartamento(@RequestBody Empleado empleado) {
        try {
            empleadoService.crearEmpleado(empleado);
            return new ResponseEntity<>(empleado, HttpStatus.CREATED); // Retorna 201 CREATED
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR); // Si ocurre un error, retorna 500
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Empleado> updateDepartamento(@PathVariable Integer id, @RequestBody Empleado datosActualizados) {
        try {
            Empleado empleadoExistente = empleadoService.obtenerEmpleadoPorId(id);

            // Se crea un nuevo objeto Contacto combinando valores viejos y nuevos usando Builder de Lombok
            Empleado empleadoActualizado = Empleado.builder()
                    .id(empleadoExistente.getId()) // Se mantiene el mismo ID
                    .nombre(datosActualizados.getNombre() != null ? datosActualizados.getNombre() : empleadoExistente.getNombre())
                    .apellidos(datosActualizados.getApellidos() != null ? datosActualizados.getApellidos() : empleadoExistente.getApellidos())
                    .telefono(datosActualizados.getTelefono() != null ? datosActualizados.getTelefono() : empleadoExistente.getTelefono())
                    .direccion(datosActualizados.getDireccion() != null ? datosActualizados.getDireccion() : empleadoExistente.getDireccion())
                    .correoElectronico(datosActualizados.getCorreoElectronico() != null ? datosActualizados.getCorreoElectronico() : empleadoExistente.getCorreoElectronico())
                    .esJefe(datosActualizados.getEsJefe() != null ? datosActualizados.getEsJefe() : empleadoExistente.getEsJefe())
                    .fechaRegistro(empleadoExistente.getFechaRegistro()) // Se mantiene la fecha de registro original
                    .build();

            empleadoService.actualizarEmpleado(empleadoActualizado);
            return ResponseEntity.ok(empleadoActualizado);
        } catch (ResourceNotFoundException ex) {
            throw new ResourceNotFoundException("Empleado " + id + " no encontrado");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Boolean>> borrarDepartamento(@PathVariable Integer id) {
        try {
            Empleado empleado = empleadoService.obtenerEmpleadoPorId(id);
            if (empleado == null) {
                throw new ResourceNotFoundException("Empleado " + id + " no encontrado");
            }
            empleadoService.borrarEmpleado(id);

            // Respuesta de éxito
            Map<String, Boolean> response = new HashMap<>();
            response.put("deleted", Boolean.TRUE);
            return ResponseEntity.ok(response);

        } catch (ResourceNotFoundException ex) {
            throw new ResourceNotFoundException("Empleado " + id + " no encontrado");
        }
    }
}

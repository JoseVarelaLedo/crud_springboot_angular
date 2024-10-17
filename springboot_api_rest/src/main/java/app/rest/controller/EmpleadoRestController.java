package app.rest.controller;

import app.model.Empleado;
import app.service.EmpleadoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

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
}

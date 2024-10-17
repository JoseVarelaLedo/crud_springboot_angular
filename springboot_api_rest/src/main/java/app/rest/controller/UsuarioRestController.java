package app.rest.controller;

import app.model.Usuario;
import app.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/usuarios")
@CrossOrigin (origins = "http://localhost:4200/")
public class UsuarioRestController {
    @Autowired
    private UsuarioService usuarioService;
    @GetMapping
    private ResponseEntity<List<Usuario>> getTodosUsuarios(){
        return ResponseEntity.ok(usuarioService.listarUsuarios());
    }
}

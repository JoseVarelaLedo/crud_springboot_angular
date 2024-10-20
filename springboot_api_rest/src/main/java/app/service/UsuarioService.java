package app.service;

import app.model.Usuario;
import app.repository.UsuarioRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuarioService {
    @Autowired
    private UsuarioRepository usuarioRepository;
    public List<Usuario> listarUsuarios( ) {
        return usuarioRepository.findAll();
    }

    @Transactional
    public void crearUsuario(Usuario usuario) {
        usuarioRepository.save(usuario);
    }

    public Usuario obtenerUsuarioPorId(Integer id) {
        return usuarioRepository.findById(id).orElse(null);
    }

    @Transactional
    public void actualizarUsuario(Usuario usuario) {
        usuarioRepository.save(usuario);
    }

    public void borrarUsuario(Integer id) {
        usuarioRepository.deleteById(id);
    }
}

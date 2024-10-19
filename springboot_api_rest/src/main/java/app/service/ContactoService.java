package app.service;

import app.model.Contacto;
import app.repository.ContactoRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContactoService {
    @Autowired
    private ContactoRepository contactoRepository;
    public List<Contacto> listarContactos() {
        return contactoRepository.findAll();
    }

    @Transactional
    public void crearContacto(Contacto contacto) {
        contactoRepository.save(contacto);
    }

    public Contacto obtenerContactoPorId(Integer id) {
        return contactoRepository.findById(id).orElse(null);
    }

    @Transactional
    public void actualizarContacto(Contacto contacto) {
        contactoRepository.save(contacto);
    }

    public void borrarContacto(Integer id) {
        contactoRepository.deleteById(id);
    }
}

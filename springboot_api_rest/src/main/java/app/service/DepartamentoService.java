package app.service;


import app.model.Departamento;
import app.repository.DepartamentoRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DepartamentoService {
    @Autowired
    private DepartamentoRepository departamentoRepository;
    public List<Departamento> listarDepartamento( ) {
        return departamentoRepository.findAll();
    }

    @Transactional
    public void crearDepartamento(Departamento departamento) {
        departamentoRepository.save(departamento);
    }

    public Departamento obtenerDepartamentoPorID(Integer id) {
        return departamentoRepository.findById(id).orElse(null);
    }

    @Transactional
    public void actualizarDepartamento(Departamento departamento) {
        departamentoRepository.save(departamento);
    }

    public void borrarDepartamento(Integer id) {
        departamentoRepository.deleteById(id);
    }
}

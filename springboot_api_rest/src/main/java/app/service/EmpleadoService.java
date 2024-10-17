package app.service;

import app.model.Empleado;
import app.repository.EmpleadoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmpleadoService {
    @Autowired
    private EmpleadoRepository empleadoRepository;
    public List<Empleado> listarEmpleados( ) {
        return empleadoRepository.findAll();
    }

    public void crearEmpleado(Empleado empleado) {
        empleadoRepository.save(empleado);
    }

    public Empleado obtenerEmpleadoPorId(Integer id) {
        return empleadoRepository.findById(id).orElse(null);
    }

    public void actualizarEmpleado(Empleado empleado) {
        empleadoRepository.save(empleado);
    }

    public void borrarEmpleado(Integer id) {
        empleadoRepository.deleteById(id);
    }
}

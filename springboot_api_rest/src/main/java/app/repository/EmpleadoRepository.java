package app.repository;

import app.model.Contacto;
import app.model.Empleado;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

//tiene que extender a JPRepository, indicando entre corchetes el tipo
//de dato con el que va a trabajar, Empleado, y el tipo de dato de la PK
//que en el caso de Contacto es un Integer
@Repository
@RepositoryRestResource(path = "empleados", collectionResourceRel = "empleados")
public interface EmpleadoRepository extends JpaRepository<Empleado, Integer> {
    //
}

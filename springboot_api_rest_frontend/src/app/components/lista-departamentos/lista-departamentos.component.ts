import { Component } from '@angular/core';
import { DepartamentoService } from '../../services/departamento.service';
import { Departamento } from '../../model/departamento';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { Jefe } from '../../model/jefe';

@Component({
  selector: 'app-lista-departamentos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-departamentos.component.html',
  styleUrls: ['./lista-departamentos.component.css']
})
export class ListaDepartamentosComponent {
  departamentos: Departamento[];
  jefe:any;
  jefes: { [key: number]: Jefe } = {}; // Almacena los jefes por ID de departamento


  constructor (private readonly departamentoService:DepartamentoService, private readonly router:Router) { }

  ngOnInit(): void{
    this.obtenerDepartamentos();
  }

  private obtenerDepartamentos() {
    this.departamentoService.obtenerListaDeDepartamentos().subscribe(datosDepartamento => {
      this.departamentos = datosDepartamento;
      // Obtener el jefe para cada departamento
      this.departamentos.forEach(departamento => {
        this.departamentoService.obtenerJefePorDepartamento(departamento.id).subscribe(jefe => {
          this.jefes[departamento.id] = jefe; // Almacena el jefe en el objeto
        });
      });
    });
  }



  actualizarDepartamento (id:number) {
    this.router.navigate (['/actualizar-departamento', id]);
     // Refrescar la lista de departamentos después de eliminar
    this.obtenerDepartamentos();
  }

  eliminarDepartamento(id: number) {
    const departamentoAEliminar = this.departamentos.find(departamento => departamento.id === id);

    if (departamentoAEliminar) {
      Swal.fire({
        title: '¿Estás seguro?',
        text: `¿Deseas eliminar el departamento ${departamentoAEliminar.nombreDepartamento}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.departamentoService.eliminarDepartamento(id).subscribe({
            next: () => {
              Swal.fire({
                title: 'Departamento eliminado' ,
                text: `El departamento ${departamentoAEliminar.nombreDepartamento} ha sido eliminado con éxito`,
                icon: 'success',
                confirmButtonText: 'Aceptar'
              });
              // Refrescar la lista de contactos después de eliminar
              this.obtenerDepartamentos();
            },
            error: (error) => {
              console.error("Error al eliminar el departamento", error);
              Swal.fire({
                title: 'Error',
                text: 'Ocurrió un error al eliminar el departamento',
                icon: 'error',
                confirmButtonText: 'Aceptar'
              });
            }
          });
        }
      });
    } else {
      Swal.fire({
        title: 'Error',
        text: 'Departamento no encontrado',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  }
}

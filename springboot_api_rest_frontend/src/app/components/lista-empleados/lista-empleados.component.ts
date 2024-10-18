import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Empleado } from '../../model/empleado';
import { EmpleadoService } from '../../services/empleado.service';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-lista-empleados',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './lista-empleados.component.html',
  styleUrls: ['./lista-empleados.component.css']
})
export class ListaEmpleadosComponent {
  empleados: Empleado[];

  constructor (private readonly empleadoService:EmpleadoService, private readonly router:Router) { }

  ngOnInit(): void{
    this.obtenerEmpleados();
  }

  private obtenerEmpleados(){
    this.empleadoService.obtenerListaDeEmpleados().subscribe(datosEmpleado=>{this.empleados = datosEmpleado});
  }

  actualizarEmpleado (id:number) {
    this.router.navigate (['/actualizar-empleado', id]);
     // Para refrescar la lista de contactos después de eliminar
    this.obtenerEmpleados();
  }

  eliminarEmpleado(id: number) {
    const empleadoAEliminar = this.empleados.find(empleado => empleado.id === id);

    if (empleadoAEliminar) {
      Swal.fire({
        title: '¿Estás seguro?',
        text: `¿Deseas eliminar el empleado ${empleadoAEliminar.nombre} ${empleadoAEliminar.apellidos}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.empleadoService.eliminarEmpleado(id).subscribe({
            next: () => {
              Swal.fire({
                title: 'Empleado eliminado',
                text: `El empleado ${empleadoAEliminar.nombre} ${empleadoAEliminar.apellidos} ha sido eliminado con éxito`,
                icon: 'success',
                confirmButtonText: 'Aceptar'
              });
              // Refrescar la lista de contactos después de eliminar
              this.obtenerEmpleados();
            },
            error: (error) => {
              console.error("Error al eliminar el empleado", error);
              Swal.fire({
                title: 'Error',
                text: 'Ocurrió un error al eliminar el empleado',
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
        text: 'Empleado no encontrado',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  }
}

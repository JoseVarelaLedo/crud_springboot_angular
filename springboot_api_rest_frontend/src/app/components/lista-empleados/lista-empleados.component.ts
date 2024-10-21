import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Empleado } from '../../model/empleado';
import { EmpleadoService } from '../../services/empleado.service';
import { Router, RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-lista-empleados',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslateModule],
  templateUrl: './lista-empleados.component.html',
  styleUrls: ['./lista-empleados.component.css']
})
export class ListaEmpleadosComponent {
  empleados: Empleado[];
  page = 0;
  size = 7;
  totalElements= 0;
  totalPages=0;
  sortField = 'id'; // Campo de ordenación por defecto
  sortDirection = 'asc'; // Dirección por defecto
  columnas = [
    { titulo: 'ID', campo: 'id' },
    { titulo: 'NOMBRE', campo: 'nombre' },
    { titulo: 'APELLIDOS', campo: 'apellidos' },
    { titulo: 'TELÉFONO', campo: 'telefono' },
    { titulo: 'eMAIL', campo: 'correoElectronico' },
    { titulo: 'DIRECCIÓN', campo: 'direccion' },
    { titulo: 'DEPARTAMENTO', campo: 'departamentoId' },
    { titulo: 'ESTATUS', campo: 'esJefe' },
    { titulo: 'NICKNAME', campo: 'nickname' },
    { titulo: 'FECHA NACIMIENTO', campo: 'fechaNacimiento' },
    { titulo: 'FECHA REGISTRO', campo: 'fechaRegistro' }
  ];

  constructor (private readonly empleadoService:EmpleadoService, private readonly router:Router) { }

  ngOnInit(): void{

    this.obtenerEmpleados();
  }

  //método funcional antes de paginación
  // private obtenerEmpleados(){
  //   this.empleadoService.obtenerListaDeEmpleados().subscribe(datosEmpleado=>{this.empleados = datosEmpleado});
  // }
  // private obtenerEmpleados() {
  //   this.empleadoService.obtenerListaDeEmpleados(this.page, this.size).subscribe(response => {
  //     this.empleados = response.content;  // Lista de empleados paginados
  //     this.totalElements = response.totalElements;  // Número total de empleados
  //     this.totalPages = response.totalPages;  // Total de páginas
  //   });
  // }

  private obtenerEmpleados() {
    this.empleadoService.obtenerListaDeEmpleados(this.page, this.size, this.sortField, this.sortDirection).subscribe(
      (response: any) => {
        this.empleados = response.content;
        this.totalPages = response.totalPages;
      },
      (error) => {
        console.error('Error al obtener la lista de empleados', error);
      }
    );
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

  nextPage() {
    if (this.page + 1 < this.totalPages) {
      this.page++;
      this.obtenerEmpleados();
    }
  }

  prevPage() {
    if (this.page > 0) {
      this.page--;
      this.obtenerEmpleados();
    }
  }
  // Método para cambiar el orden
  // ordenarPor(campo: string) {
  //   if (this.sortField === campo) {
  //     // Si ya está ordenando por este campo, cambiar la dirección
  //     this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
  //   } else {
  //     // Si es un nuevo campo, reiniciar a ascendente
  //     this.sortField = campo;
  //     this.sortDirection = 'asc';
  //   }
  //   this.obtenerEmpleados();
  // }
  ordenarPor(campo: string) {
    this.sortField = campo;
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.obtenerEmpleados();  // Volver a obtener empleados con la nueva ordenación
  }


}

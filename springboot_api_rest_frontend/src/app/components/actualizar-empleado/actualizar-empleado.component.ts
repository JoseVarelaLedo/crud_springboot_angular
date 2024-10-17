import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, of, tap } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { Empleado } from '../../model/empleado';
import { EmpleadoService } from '../../services/empleado.service';

@Component({
  selector: 'app-actualizar-empleado',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './actualizar-empleado.component.html',
  styleUrls: ['./actualizar-empleado.component.css']
})
export class ActualizarEmpleadoComponent {
  id: number;
  empleado: Empleado = new Empleado();

  constructor(
    private readonly empleadoService: EmpleadoService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.empleadoService.obtenerEmpleadoPorId(this.id).pipe(
      tap((datosActualizados: Empleado) => { // Asegúrate de tipar datosActualizados como Empleado
        this.empleado = datosActualizados;
      }),
      catchError(error => {
        console.error(error);
        return of(null); // Retorna un observable vacío en caso de error
      })
    ).subscribe();
  }

  navigateListaEmpleados() {
    this.router.navigate(['/empleados']);
    Swal.fire({
        title: 'Empleado actualizado',
        text: `El empleado ${this.empleado.nombre} ${this.empleado.apellidos} ha sido actualizado con éxito`,
        icon: 'success',
        confirmButtonText: 'Aceptar'
    });
  }

  onSubmit(): void {
    if (this.empleado) {
      this.empleadoService.actualizarEmpleado(this.id, this.empleado).pipe(
        tap(() => {
          this.navigateListaEmpleados(); // Redirige en caso de éxito
        }),
        catchError(error => {
          console.error('Error al actualizar el empleado:', error);
          return of(null); // Retorna un observable vacío en caso de error
        })
      ).subscribe();
    }
  }
}

import { Empleado } from '../../model/empleado';
import { EmpleadoService } from './../../services/empleado.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrar-empleado',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './registrar-empleado.component.html',
  styleUrls: ['./registrar-empleado.component.css']
})
export class RegistrarEmpleadoComponent {
  empleado: Empleado = {
    id: 0,
    nombre: '',
    apellidos: '',
    telefono: '',
    direccion: '',
    correoElectronico: '',
    esJefe: false,
    nickname: '',
    departamentoId : 0,
    nombreDepartamento: '',
    fechaNacimiento: new Date(),
    fechaRegistro: new Date()
  };

  constructor ( private readonly empleadoService : EmpleadoService, private readonly router : Router ) { }

  ngOnInit(): void {
  }

  guardarEmpleado(){
    this.empleadoService.registrarEmpleado (this.empleado).subscribe(datosEmpleado =>{

      this.navigateListaEmpleados();
    }, error => console.log (error));
  }

  navigateListaEmpleados(){
    this.router.navigate(['/empleados']);
    Swal.fire({
      title: 'Empleado creado',
      text: `El empleado ${this.empleado.nombre} ha sido creado con éxito`,
      icon: 'success',
      confirmButtonText: 'Aceptar'
  });
  }

  onSubmit() {
    this.guardarEmpleado();
  }
}

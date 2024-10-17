import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Departamento } from '../../model/departamento';
import { FormsModule } from '@angular/forms';
import { DepartamentoService } from '../../services/departamento.service';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-registrar-departamento',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './registrar-departamento.component.html',
  styleUrls: ['./registrar-departamento.component.css']
})
export class RegistrarDepartamentoComponent {
  departamento: Departamento = {
    id: 0,         // Inicializa con valores por defecto
    nombreDepartamento: '',
    fechaRegistro: new Date()
  };

  constructor ( private readonly departamentoService : DepartamentoService, private readonly router : Router ) { }

  ngOnInit(): void {
  }

  guardarContacto(){
    this.departamentoService.registrarDepartamento (this.departamento).subscribe(datosDepartamento =>{
      // console.log(datoContacto);
      this.navigateListaDepartamentos();
    }, error => console.log (error));
  }

  navigateListaDepartamentos(){
    this.router.navigate(['/departamentos']);
    Swal.fire({
      title: 'Departamento creado',
      text: `El departamento ${this.departamento.nombreDepartamento} ha sido creado con éxito`,
      icon: 'success',
      confirmButtonText: 'Aceptar'
  });
  }

  onSubmit() {
    this.guardarContacto();
  }
}

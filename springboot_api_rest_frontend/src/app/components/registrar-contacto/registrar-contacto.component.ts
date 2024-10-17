import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Contacto } from '../../model/contacto';
import { FormsModule } from '@angular/forms';
import { ContactoService } from '../../services/contacto.service';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-registrar-contacto',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule ],
  templateUrl: './registrar-contacto.component.html',
  styleUrls: ['./registrar-contacto.component.css']
})
export class RegistrarContactoComponent implements OnInit{
  contacto: Contacto = {
    id: 0,         // Inicializa con valores por defecto
    nombre: '',
    apellidos: '',
    telefono: '',
    email: '',
    direccion: '',
    fechaRegistro: new Date()
  };

  constructor ( private readonly contactoService : ContactoService, private readonly router : Router ) { }

  ngOnInit(): void {
  }

  guardarContacto(){
    this.contactoService.registrarContacto (this.contacto).subscribe(datoContacto =>{
      // console.log(datoContacto);
      this.navigateListaContactos();
    }, error => console.log (error));
  }

  navigateListaContactos(){
    this.router.navigate(['/contactos']);
    Swal.fire({
      title: 'Contacto creado',
      text: `El contacto ${this.contacto.nombre} ${this.contacto.apellidos} ha sido creado con éxito`,
      icon: 'success',
      confirmButtonText: 'Aceptar'
  });
  }

  onSubmit() {
    this.guardarContacto();
  }
}

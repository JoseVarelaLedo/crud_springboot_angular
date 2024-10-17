import { Component, OnInit } from '@angular/core';
import { Contacto } from '../../model/contacto'
import { CommonModule } from '@angular/common';
import { ContactoService } from '../../services/contacto.service';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-lista-contactos',
  standalone: true,
  imports: [CommonModule,  RouterLink],
  templateUrl: './lista-contactos.component.html',
  styleUrls: ['./lista-contactos.component.css']

})
export class ListaContactosComponent implements OnInit{
  contactos: Contacto[];

  constructor (private readonly contactoService:ContactoService, private readonly router:Router) { }

  ngOnInit(): void{
    this.obtenerContactos();
  ;
  }

  private obtenerContactos(){
    this.contactoService.obtenerListaDeContactos().subscribe(datosContacto=>{this.contactos = datosContacto});
  }

  actualizarContacto (id:number) {
    this.router.navigate (['/actualizar-contacto', id]);
     // Refrescar la lista de contactos después de eliminar
    this.obtenerContactos();
  }

  eliminarContacto(id: number) {
    const contactoAEliminar = this.contactos.find(contacto => contacto.id === id);

    if (contactoAEliminar) {
      Swal.fire({
        title: '¿Estás seguro?',
        text: `¿Deseas eliminar el contacto ${contactoAEliminar.nombre} ${contactoAEliminar.apellidos}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.contactoService.eliminarContacto(id).subscribe({
            next: () => {
              Swal.fire({
                title: 'Contacto eliminado',
                text: `El contacto ${contactoAEliminar.nombre} ${contactoAEliminar.apellidos} ha sido eliminado con éxito`,
                icon: 'success',
                confirmButtonText: 'Aceptar'
              });
              // Refrescar la lista de contactos después de eliminar
              this.obtenerContactos();
            },
            error: (error) => {
              console.error("Error al eliminar el contacto", error);
              Swal.fire({
                title: 'Error',
                text: 'Ocurrió un error al eliminar el contacto',
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
        text: 'Contacto no encontrado',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  }
}

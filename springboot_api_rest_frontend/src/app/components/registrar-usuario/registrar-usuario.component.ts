import { UsuarioService } from './../../services/usuario.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { Usuario } from '../../model/usuario';

@Component({
  selector: 'app-registrar-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.css']
})
export class RegistrarUsuarioComponent {

  usuario: Usuario = {
    id: 0,
    nickname : '',
    contrasena: '',
    fechaRegistro: new Date()
  };

  constructor ( private readonly usuarioService : UsuarioService, private readonly router : Router ) { }

  ngOnInit(): void {
  }

  guardarUsuario(){
    this.usuarioService.registrarUsuario (this.usuario).subscribe(datoContacto =>{
      // console.log(datoContacto);
      this.navigateListaUsuarios();
    }, error => console.log (error));
  }

  navigateListaUsuarios(){
    this.router.navigate(['/usuarios']);
    Swal.fire({
      title: 'Usuario creado',
      text: `El usuario ${this.usuario.nickname} ha sido creado con éxito`,
      icon: 'success',
      confirmButtonText: 'Aceptar'
  });
  }

  onSubmit() {
    this.guardarUsuario();
  }
}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Usuario } from '../../model/usuario';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-lista-usuarios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent {
  usuarios: Usuario[];

  constructor (private readonly usuarioService:UsuarioService) { }

  ngOnInit(): void{
    this.obtenerUsuarios();
  ;
  }

  private obtenerUsuarios(){
    this.usuarioService.obtenerListaDeUsuarios().subscribe(datosUsuario=>{this.usuarios = datosUsuario});
  }
}

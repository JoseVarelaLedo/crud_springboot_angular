import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../model/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private readonly baseURL = "http://localhost:9666/usuarios";


  constructor(private readonly httpClient: HttpClient) { }

  obtenerListaDeUsuarios (): Observable <Usuario[]>{
    return this.httpClient.get<Usuario[]>(`${this.baseURL}`);
  }
}

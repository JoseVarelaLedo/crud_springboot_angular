import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contacto } from '../model/contacto';

@Injectable({
  providedIn: 'root'
})
export class ContactoService {

  private readonly baseURL = "http://localhost:9666/contactos";


  constructor(private readonly httpClient: HttpClient) { }

  obtenerListaDeContactos (): Observable <Contacto[]>{
    return this.httpClient.get<Contacto[]>(`${this.baseURL}`);
  }

  obtenerContactoPorId (id:number) : Observable<Contacto>{
    return this.httpClient.get<Contacto> (`${this.baseURL}/${id}`);
  }

  registrarContacto (contacto:Contacto) : Observable<Contacto>{
    return this.httpClient.post<Contacto>(`${this.baseURL}`, contacto);
  }

  eliminarContacto (id:number) : Observable<Contacto>{
    return this.httpClient.delete <Contacto>(`${this.baseURL}/${id}`);
  }

  actualizarContacto(id: number, contacto: Contacto): Observable<Contacto> {
    return this.httpClient.put<Contacto>(`${this.baseURL}/${id}`, contacto);
  }
}

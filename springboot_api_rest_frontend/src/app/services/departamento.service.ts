import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Departamento } from '../model/departamento';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {

  private readonly baseURL = "http://localhost:9666/departamentos";


  constructor(private readonly httpClient: HttpClient) { }

  obtenerListaDeDepartamentos (): Observable <Departamento[]>{
    return this.httpClient.get<Departamento[]>(`${this.baseURL}`);
  }

  obtenerDepartamentoPorId (id:number) : Observable<Departamento>{
    return this.httpClient.get<Departamento> (`${this.baseURL}/${id}`);
  }

  registrarDepartamento (departamento:Departamento) : Observable<Departamento>{
    return this.httpClient.post<Departamento>(`${this.baseURL}`, departamento);
  }

  eliminarDepartamento (id:number) : Observable<Departamento>{
    return this.httpClient.delete <Departamento>(`${this.baseURL}/${id}`);
  }

  actualizarDepartamento(id: number, departamento: Departamento): Observable<Departamento> {
    return this.httpClient.put<Departamento>(`${this.baseURL}/${id}`, departamento);
  }
}

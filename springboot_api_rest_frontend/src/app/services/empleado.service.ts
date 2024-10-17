import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Empleado } from '../model/empleado';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  private readonly baseURL = "http://localhost:9666/empleados";


  constructor(private readonly httpClient: HttpClient) { }

  obtenerListaDeEmpleados (): Observable <Empleado[]>{
    return this.httpClient.get<Empleado[]>(`${this.baseURL}`);
  }

  obtenerEmpleadoPorId (id:number) : Observable<Empleado>{
    return this.httpClient.get<Empleado> (`${this.baseURL}/${id}`);
  }

  registrarEmpleado (empleado:Empleado) : Observable<Empleado>{
    return this.httpClient.post<Empleado>(`${this.baseURL}`, empleado);
  }

  eliminarEmpleado (id:number) : Observable<Empleado>{
    return this.httpClient.delete <Empleado>(`${this.baseURL}/${id}`);
  }

  actualizarEmpleado(id: number, empleado: Empleado): Observable<Empleado> {
    return this.httpClient.put<Empleado>(`${this.baseURL}/${id}`, empleado);
  }
}

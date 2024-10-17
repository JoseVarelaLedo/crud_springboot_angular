import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Empleado } from '../../model/empleado';
import { EmpleadoService } from '../../services/empleado.service';

@Component({
  selector: 'app-lista-empleados',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-empleados.component.html',
  styleUrls: ['./lista-empleados.component.css']
})
export class ListaEmpleadosComponent {
  empleados: Empleado[];

  constructor (private readonly empleadoService:EmpleadoService) { }

  ngOnInit(): void{
    this.obtenerEmpleados();
  }

  private obtenerEmpleados(){
    this.empleadoService.obtenerListaDeEmpleados().subscribe(datosEmpleado=>{this.empleados = datosEmpleado});
  }
}

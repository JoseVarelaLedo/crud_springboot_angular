//template original
// import { Routes } from '@angular/router';

// export const routes: Routes = [];

//v1
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaContactosComponent } from './components/lista-contactos/lista-contactos.component';
import { ListaDepartamentosComponent } from './components/lista-departamentos/lista-departamentos.component';
import { ListaEmpleadosComponent } from './components/lista-empleados/lista-empleados.component';
import { ListaUsuariosComponent } from './components/lista-usuarios/lista-usuarios.component';
import { RegistrarContactoComponent } from './components/registrar-contacto/registrar-contacto.component';
import { ActualizarContactoComponent } from './components/actualizar-contacto/actualizar-contacto.component';
import { RegistrarDepartamentoComponent } from './components/registrar-departamento/registrar-departamento.component';
import { ActualizarDepartamentoComponent } from './components/actualizar-departamento/actualizar-departamento.component';


export const routes: Routes = [
  { path: '', redirectTo: '/contactos', pathMatch: 'full' },   // Redirección a contactos por defecto
  { path: 'contactos', component: ListaContactosComponent },   // Ruta para listar contactos
  { path: 'departamentos', component: ListaDepartamentosComponent },   // Ruta para listar departamentos
  { path: 'empleados', component: ListaEmpleadosComponent },   // Ruta para listar empleados
  { path: 'usuarios', component: ListaUsuariosComponent },   // Ruta para listar usuarios
  { path: 'registrar-contacto', component: RegistrarContactoComponent },   // Ruta para registrar contactos
  { path: 'registrar-departamento', component: RegistrarDepartamentoComponent },   // Ruta para registrar departamentos
  { path: 'actualizar-contacto/:id', component: ActualizarContactoComponent },   // Ruta para registrar contactos
  { path: 'actualizar-departamento/:id', component: ActualizarDepartamentoComponent },   // Ruta para registrar contactos


  { path: '**', redirectTo: '' }   // Redirección para rutas no encontradas (404)
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


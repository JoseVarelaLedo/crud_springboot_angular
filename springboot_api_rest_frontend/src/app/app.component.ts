import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ListaContactosComponent } from "./components/lista-contactos/lista-contactos.component";
import { ListaEmpleadosComponent } from "./components/lista-empleados/lista-empleados.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ListaContactosComponent, ListaEmpleadosComponent ,RouterLink, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Sistema Gestión BD';
}

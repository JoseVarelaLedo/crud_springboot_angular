import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ListaContactosComponent } from "./components/lista-contactos/lista-contactos.component";
import { ListaEmpleadosComponent } from "./components/lista-empleados/lista-empleados.component";
import { FormsModule } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core';
import { NgIf } from '@angular/common';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ListaContactosComponent, ListaEmpleadosComponent ,RouterLink, FormsModule, TranslateModule, NgIf],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Sistema Gestión BD';
  constructor(private translate: TranslateService) {
    // Definir los idiomas disponibles
    this.translate.addLangs(['en', 'es']);

    // Establecer el idioma predeterminado (puedes cambiar 'es' a otro idioma si prefieres)
    this.translate.setDefaultLang('es');

    // Obtener el idioma del navegador (si está disponible) o usar el predeterminado
    const browserLang = this.translate.getBrowserLang();
    this.translate.use(browserLang?.match(/en|es/) ? browserLang : 'es');
  }

  // Método para cambiar el idioma
  changeLanguage(lang: string) {
    this.translate.use(lang);
  }
}

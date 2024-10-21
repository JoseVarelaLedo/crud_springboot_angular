import { Provider } from '@angular/core';
import { TranslateService, TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from './translate.loader';

export function provideTranslateService(): Provider[] {
  return [
    {
      provide: TranslateService,
      useFactory: (translate: TranslateService) => {
        translate.setDefaultLang('en'); // Idioma predeterminado
        translate.use('es'); // Cambia esto según el idioma por defecto que necesites
        return translate;
      },
      deps: [TranslateService]
    }
  ];
}

export function provideTranslateLoader(): Provider[] {
  return [
    {
      provide: TranslateLoader,
      useFactory: (http: HttpClient) => new TranslateHttpLoader(http),
      deps: [HttpClient]
    }
  ];
}

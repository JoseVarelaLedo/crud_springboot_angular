import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'customTranslate',
  standalone: true
})
export class CustomTranslatePipe implements PipeTransform {

  constructor(private translateService: TranslateService) {}

  transform(value: string): string {
    // Usa el servicio de traducción para traducir la clave
    return this.translateService.instant(value);
  }
}


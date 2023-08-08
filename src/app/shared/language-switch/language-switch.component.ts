import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-language-switch',
  templateUrl: './language-switch.component.html',
  styleUrls: ['./language-switch.component.scss'],
})
export class LanguageSwitchComponent {
  constructor(private readonly translate: TranslateService) {
    this.translate.use('en');
  }

  setLanguage(value: string): void {
    this.translate.use(value);
  }

  getCurrentLanguage(): string {
    return this.translate.currentLang;
  }
}

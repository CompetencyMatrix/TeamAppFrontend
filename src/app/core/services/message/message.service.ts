import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messages: string[] = [];

  constructor(private readonly translate: TranslateService) {}

  addByKey(messageKey: string, interpolateParams?: object | undefined): void {
    this.translate
      .get(messageKey, interpolateParams)
      .subscribe((message: string) => this.add(message));
  }
  add(message: string) {
    this.messages.push(message);
  }

  clear() {
    this.messages = [];
  }
}

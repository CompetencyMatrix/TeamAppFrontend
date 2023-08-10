import { DestroyRef, inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  destroyRef: DestroyRef = inject(DestroyRef);
  messages: string[] = [];

  constructor(private readonly translate: TranslateService) {}

  // TODO: which way to add message by key is preffered - asynchronus or synchronus?
  addByKey(messageKey: string, interpolateParams?: object | undefined): void {
    this.translate
      .get(messageKey, interpolateParams)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((message: string) => this.add(message));
  }

  addByKeySynchronus(
    messageKey: string,
    interpolateParams?: object | undefined
  ): void {
    this.add(this.translate.instant(messageKey, interpolateParams));
  }
  add(message: string) {
    this.messages.push(message);
  }

  clear() {
    this.messages = [];
  }
}

import { inject, Injectable } from '@angular/core';
import {
  FormControlDirective,
  FormControlName,
  NgControl,
  NgModel,
} from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class InjectionManagerService {
  public injectNgControl(): FormControlDirective | FormControlName | NgModel {
    const ngControl: NgControl | null = inject(NgControl, {
      self: true,
      optional: true,
    });

    if (!ngControl) throw new ReferenceError('Provided NgControl was null.');

    if (
      ngControl instanceof FormControlDirective ||
      ngControl instanceof FormControlName ||
      ngControl instanceof NgModel
    ) {
      return ngControl;
    }

    throw new ReferenceError('Provided NgControl was of unknown type');
  }
}

import {
  ControlValueAccessor,
  FormControlDirective,
  FormControlName,
  NG_VALUE_ACCESSOR,
  NgControl,
  NgModel,
} from '@angular/forms';
import { Directive, inject } from '@angular/core';

@Directive({
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: NoopValueAccessorDirective,
    },
  ],
  selector: 'app-noop-accessor-directive',
})
export class NoopValueAccessorDirective implements ControlValueAccessor {
  writeValue(obj: any): void {}
  registerOnChange(fn: any): void {}
  registerOnTouched(fn: any): void {}
}

export function injectNgControl():
  | FormControlDirective
  | FormControlName
  | NgModel {
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

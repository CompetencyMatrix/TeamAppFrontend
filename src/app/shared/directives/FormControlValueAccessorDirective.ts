import {
  ControlValueAccessor,
  FormControlDirective,
  FormControlName,
  NG_VALUE_ACCESSOR,
  NgControl,
  NgModel,
} from '@angular/forms';
import { Directive, forwardRef, inject, OnDestroy } from '@angular/core';
import { Observable, ReplaySubject, Subject } from 'rxjs';

@Directive({
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormControlValueAccessorDirective),
      multi: true,
    },
  ],
  selector: 'formControlValueAccessor',
})
export class FormControlValueAccessorDirective<T>
  implements ControlValueAccessor, OnDestroy
{
  private onChange: any;
  private onTouched: any;
  private valueSubject: Subject<T> = new ReplaySubject<T>();
  readonly value$: Observable<T> = this.valueSubject.asObservable();

  constructor() {}

  ngOnDestroy(): void {
    this.valueSubject.complete();
  }

  valueChange(newValue: T): void {
    this.onChange(newValue);
  }

  touchedChange(wasTouched: boolean): void {
    this.onTouched(wasTouched);
  }

  writeValue(obj: any): void {
    console.log('writeValue\n' + JSON.stringify(obj));
    this.valueSubject.next(obj);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}

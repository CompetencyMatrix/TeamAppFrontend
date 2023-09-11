import { Directive, forwardRef, OnDestroy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
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

  ngOnDestroy(): void {
    this.valueSubject.complete();
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

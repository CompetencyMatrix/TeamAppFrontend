import { Pipe, PipeTransform } from '@angular/core';

// TODO
@Pipe({
  name: 'nameConcat',
})
export class NameConcatPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }
}

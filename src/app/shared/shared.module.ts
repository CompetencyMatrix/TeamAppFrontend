import { NgModule } from '@angular/core';
import { NameConcatPipe } from './pipes/name-concat/name-concat.pipe';

@NgModule({
  declarations: [NameConcatPipe],
  imports: [],
  exports: [NameConcatPipe],
})
export class SharedModule {}

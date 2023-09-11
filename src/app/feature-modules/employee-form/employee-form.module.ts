import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeFormRoutingModule } from './employee-form-routing.module';
import { EmployeeFormComponent } from './employee-form.component';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { ChipsMultiselectComponent } from './components/chips-multiselect/chips-multiselect.component';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [EmployeeFormComponent, ChipsMultiselectComponent],
  imports: [
    CommonModule,
    EmployeeFormRoutingModule,
    MatInputModule,
    TranslateModule,
    MatButtonModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatIconModule,
    MatRadioModule,
    MatButtonToggleModule,
    MatCardModule,
  ],
})
export class EmployeeFormModule {}

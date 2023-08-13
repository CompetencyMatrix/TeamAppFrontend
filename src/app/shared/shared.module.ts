import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageSwitchComponent } from './components/language-switch/language-switch.component';
import { MessagesComponent } from './components/messages/messages.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { SidenavListComponent } from './components/sidenav-list/sidenav-list.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import { NameConcatPipe } from './pipes/name-concat/name-concat.pipe';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [
    LanguageSwitchComponent,
    MessagesComponent,
    NavbarComponent,
    SidenavComponent,
    SidenavListComponent,
    NameConcatPipe,
  ],
  imports: [
    CommonModule,
    TranslateModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    RouterOutlet,
    MatListModule,
  ],
  exports: [NavbarComponent, SidenavComponent, NameConcatPipe],
})
export class SharedModule {}

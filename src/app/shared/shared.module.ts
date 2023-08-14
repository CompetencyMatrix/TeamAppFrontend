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
import { RouterLink, RouterOutlet } from '@angular/router';
import { NameConcatPipe } from './pipes/name-concat/name-concat.pipe';
import { MatListModule } from '@angular/material/list';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    LanguageSwitchComponent,
    MessagesComponent,
    NavbarComponent,
    SidenavComponent,
    SidenavListComponent,
    NameConcatPipe,
    PageNotFoundComponent,
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
    RouterLink,
  ],
  exports: [NavbarComponent, SidenavComponent, NameConcatPipe],
})
export class SharedModule {}

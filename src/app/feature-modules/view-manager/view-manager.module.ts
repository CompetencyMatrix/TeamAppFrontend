import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewManagerComponent } from './view-manager.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import { SidenavListComponent } from '../../core/components/sidenav-list/sidenav-list.component';
import { NavbarComponent } from '../../core/components/navbar/navbar.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { LanguageSwitchComponent } from '../../core/components/language-switch/language-switch.component';
import { MessagesComponent } from './components/messages/messages.component';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { ViewManagerRoutingModule } from './view-manager-routing.module';
import { MatCardModule } from '@angular/material/card';
import {
  CdkFixedSizeVirtualScroll,
  CdkVirtualForOf,
  CdkVirtualScrollableWindow,
  CdkVirtualScrollViewport,
} from '@angular/cdk/scrolling';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    ViewManagerComponent,
    SidenavListComponent,
    NavbarComponent,
    LanguageSwitchComponent,
    MessagesComponent,
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    RouterOutlet,
    TranslateModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    ViewManagerRoutingModule,
    MatCardModule,
    CdkVirtualScrollViewport,
    CdkVirtualForOf,
    CdkFixedSizeVirtualScroll,
    CdkVirtualScrollableWindow,
    MatSnackBarModule,
  ],
  exports: [MessagesComponent],
})
export class ViewManagerModule {}

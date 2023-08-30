import { Component, EventEmitter, Output } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  @Output() public sidenavToggle = new EventEmitter();

  constructor(private location: Location) {}

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  goBack(): void {
    this.location.back();
  }
}

import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  isCollapsed = true;
  isDropdownOpen = false;

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    // Sottoscriviti a isLoggedIn$ per aggiornare la navbar
    this.authService.isLoggedIn$.subscribe((loggedInStatus) => {
      console.log('Navbar isLoggedIn status:', loggedInStatus); // Verifica se lo stato cambia
      this.isLoggedIn = loggedInStatus;
    });
  }

  logout(): void {
    console.log('Attempting logout'); // Verifica se il logout viene tentato
    this.authService.logout();
  }

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }

  toggleDropdown(event: MouseEvent) {
    // Impedisce l'azione di default del link
    event.preventDefault();
    event.stopPropagation();

    // Cambia lo stato del dropdown
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  @HostListener('document:click', ['$event'])
  closeDropdown(event: MouseEvent) {
    // Chiude il dropdown se si clicca fuori dal menu
    if (this.isDropdownOpen) {
      this.isDropdownOpen = false;
    }
  }
}

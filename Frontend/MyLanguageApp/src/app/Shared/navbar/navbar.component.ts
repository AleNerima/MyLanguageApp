import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;

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
}

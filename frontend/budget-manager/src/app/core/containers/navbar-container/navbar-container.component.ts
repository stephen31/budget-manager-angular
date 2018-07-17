import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AuthStore } from '../../store/auth.store';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';

@Component({
  selector: 'bm-navbar-container',
  templateUrl: './navbar-container.component.html',
  styleUrls: ['./navbar-container.component.scss']
})
export class NavbarContainerComponent implements OnInit {

  user$: Observable<User>;
  isLoggedIn$: Observable<boolean>;

  constructor(private authService: AuthService, private router: Router, private authStore: AuthStore) {
    this.user$ = authStore.user;
    this.isLoggedIn$ = authStore.isLoggedIn;
   }

  ngOnInit() {
  }

  goToInfos() {
    this.router.navigate(['/me']);
  }

  logout() {
    this.authService.logout();
  }

}

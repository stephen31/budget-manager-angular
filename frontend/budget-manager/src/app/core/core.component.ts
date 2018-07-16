import { Component, OnInit } from '@angular/core';
import { AuthStore } from './store/auth.store';
import { Observable } from '../../../node_modules/rxjs';
import { User } from './models/user.model';

@Component({
  selector: 'bm-root',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss']
})
export class CoreComponent implements OnInit {

  user$: Observable<User>;
  isLoggedIn$: Observable<boolean>;

  constructor(private authStore: AuthStore) {
    this.user$ = authStore.user;
    this.isLoggedIn$ = authStore.isLoggedIn;
  }

  ngOnInit() {
  }

}

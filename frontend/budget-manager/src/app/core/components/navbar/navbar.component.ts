import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { User } from '../../models/user.model';

@Component({
  selector: 'bm-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent implements OnInit {

  @Input() user: User;
  @Input() isLoggedIn: boolean;
  @Output() infos = new EventEmitter();
  @Output() logout = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  infosClicked(event) {
    this.infos.emit(event);
  }

  logoutClicked(event) {
    this.logout.emit(event);
  }
  // get checkView() {
  //   console.log('Navbar - Checking the view');
  //   return true;
  // }

}

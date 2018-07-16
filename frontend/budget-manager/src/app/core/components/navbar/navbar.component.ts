import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
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

  constructor() { }

  ngOnInit() {
  }

  // get checkView() {
  //   console.log('Navbar - Checking the view');
  //   return true;
  // }

}

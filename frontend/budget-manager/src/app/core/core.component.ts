import { Component, OnInit } from '@angular/core';
import { AuthStore } from './store/auth.store';
import { Observable } from 'rxjs';
import { User } from './models/user.model';

@Component({
  selector: 'bm-root',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss']
})
export class CoreComponent implements OnInit {

  constructor() {}

  ngOnInit() {
  }

}

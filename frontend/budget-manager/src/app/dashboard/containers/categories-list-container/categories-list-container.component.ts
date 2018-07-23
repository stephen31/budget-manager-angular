import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'bm-categories-list-container',
  templateUrl: 'categories-list-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CategoriesListContainerComponent implements OnInit {
  constructor() { }

  ngOnInit() { }
}
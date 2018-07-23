import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'bm-transactions-list-container',
  templateUrl: 'transactions-list-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class TransactionsListContainerComponent implements OnInit {
  constructor() { }

  ngOnInit() { }
}

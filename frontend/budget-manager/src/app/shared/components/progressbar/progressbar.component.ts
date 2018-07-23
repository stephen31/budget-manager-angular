import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'bm-progressbar',
  templateUrl: 'progressbar.component.html',
  styleUrls: ['progressbar.component.scss']
})

export class ProgressbarComponent implements OnInit {

  @Input() textInfos;
  @Input() percentValue = '0%';
  @Input() color;

  constructor() { }

  ngOnInit() { }
}

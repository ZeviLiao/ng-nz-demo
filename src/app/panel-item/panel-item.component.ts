import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-panel-item',
  templateUrl: './panel-item.component.html',
  styleUrls: ['./panel-item.component.scss']
})
export class PanelItemComponent implements OnInit {

  constructor() { }

  @Input() unBoundData = [];
  @Input() itemId = 0;

  ngOnInit(): void {}

}

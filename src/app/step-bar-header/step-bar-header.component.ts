import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-step-bar-header',
  templateUrl: './step-bar-header.component.html',
  styleUrls: ['./step-bar-header.component.scss']
})
export class StepBarHeaderComponent implements OnInit {

  constructor() { }

  @Input()
  curStateIndex: number;

  ngOnInit(): void {
  }

}

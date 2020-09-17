import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tool-links',
  templateUrl: './tool-links.component.html',
  styleUrls: ['./tool-links.component.scss']
})
export class ToolLinksComponent implements OnInit {

  constructor() { }

  visible = false;

  ngOnInit(): void {
  }

  clickMe(): void {
    this.visible = false;
  }

  change(value: boolean): void {
    console.log(value);
  }

}

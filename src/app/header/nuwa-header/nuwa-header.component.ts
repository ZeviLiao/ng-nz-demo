import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nuwa-header',
  templateUrl: './nuwa-header.component.html',
  styleUrls: ['./nuwa-header.component.scss']
})
export class NuwaHeaderComponent implements OnInit {

  constructor() { }

  visible = false;
  visible2 = false;

  ngOnInit(): void {
  }

  clickMe(): void {
    this.visible = false;
  }
  clickMe2(): void {
    this.visible2 = false;
  }

  change(value: boolean): void {
    console.log(value);
  }

}

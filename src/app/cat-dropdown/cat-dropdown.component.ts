import { Component } from '@angular/core';

@Component({
  selector: 'app-cat-dropdown',
  templateUrl: './cat-dropdown.component.html'
})
export class CatDropdownComponent {

  menu = '';
  log(data: string): void {
    console.log(data);
  }
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-cat-dropdown',
  templateUrl: './cat-dropdown.component.html'
})
export class CatDropdownComponent {

  curCat = '1st menu item';
  log(data: string): void {
    this.curCat = data;
  }
  editCat(data: string): void {
    alert('edit');
  }
}

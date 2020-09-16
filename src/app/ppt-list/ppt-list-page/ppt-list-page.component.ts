import { Component, OnInit } from '@angular/core';
import { NzContextMenuService, NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';

@Component({
  selector: 'app-ppt-list-page',
  templateUrl: './ppt-list-page.component.html',
  styleUrls: ['./ppt-list-page.component.scss']
})
export class PptListPageComponent implements OnInit {

  constructor(private nzContextMenuService: NzContextMenuService) { }

  ngOnInit(): void {
  }
  contextMenu($event: MouseEvent, menu: NzDropdownMenuComponent): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.nzContextMenuService.create($event, menu);
  }

  closeMenu(): void {
    this.nzContextMenuService.close();
  }
}

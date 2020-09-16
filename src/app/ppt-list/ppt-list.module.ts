import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PptListPageComponent } from './ppt-list-page/ppt-list-page.component';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';



@NgModule({
  declarations: [PptListPageComponent],
  imports: [
    CommonModule,
    NzDropDownModule
  ],
  exports: [PptListPageComponent]
})
export class PptListModule { }

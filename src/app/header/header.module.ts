import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NuwaHeaderComponent } from './nuwa-header/nuwa-header.component';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzPopoverModule } from 'ng-zorro-antd/popover';


@NgModule({
  declarations: [NuwaHeaderComponent],
  imports: [
    CommonModule,
    NzAvatarModule,
    NzPopoverModule,
  ],
  exports: [NuwaHeaderComponent]
})
export class HeaderModule { }

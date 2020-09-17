import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NuwaHeaderComponent } from './nuwa-header/nuwa-header.component';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { LogoComponent } from './logo/logo.component';
import { TeamSelectorComponent } from './team-selector/team-selector.component';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { LangSelectorComponent } from './lang-selector/lang-selector.component';
import { ToolLinksComponent } from './tool-links/tool-links.component';
import { AvatarComponent } from './avatar/avatar.component';


@NgModule({
  declarations: [NuwaHeaderComponent, LogoComponent, TeamSelectorComponent, LangSelectorComponent, ToolLinksComponent, AvatarComponent],
  imports: [
    CommonModule,
    NzAvatarModule,
    NzPopoverModule,
    NzSelectModule
  ],
  exports: [NuwaHeaderComponent]
})
export class HeaderModule { }

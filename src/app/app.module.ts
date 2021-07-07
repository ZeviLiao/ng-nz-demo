import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
// import { NgZorroAntdModule} from 'ng-zorro-antd';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CatDropdownComponent } from './cat-dropdown/cat-dropdown.component';
import { HeaderModule } from './header/header.module';
import { PptListModule } from './ppt-list/ppt-list.module';
// import { NzTreeModule } from 'ng-zorro-antd/tree';
import { TreeDemoComponent } from './tree-demo/tree-demo.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { TableDemoComponent } from './table-demo/table-demo.component';
import { NzInputModule } from 'ng-zorro-antd/input';
// import { ClarityModule } from '@clr/angular';
import { BsTreeDemoComponent } from './bs-tree-demo/bs-tree-demo.component';
import { TreeModule } from '@circlon/angular-tree-component';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { StepDialogComponent } from './step-dialog/step-dialog.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { StepComponent } from './step/step.component';
import { StepBarComponent } from './step-bar/step-bar.component';
// import { ElebtnComponent } from './elebtn/elebtn.component';
import { ElModule } from 'element-angular';
import { TreePanelComponent } from './tree-panel/tree-panel.component';
import { TreeItemComponent } from './tree-item/tree-item.component';
import { PanelItemComponent } from './panel-item/panel-item.component';

registerLocaleData(en);


@NgModule({
  declarations: [
    AppComponent,
    CatDropdownComponent,
    TreeDemoComponent,
    TableDemoComponent,
    BsTreeDemoComponent,
    StepComponent,
    StepDialogComponent,
    StepBarComponent,
    // ElebtnComponent,
    TreePanelComponent,
    TreeItemComponent,
    PanelItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzButtonModule,
    NzSelectModule,
    NzDropDownModule,
    NzIconModule,
    HeaderModule,
    PptListModule,
    // NzTreeModule,
    NzTableModule,
    NzInputModule,
    // ClarityModule,
    TreeModule,
    NzStepsModule,
    NzModalModule,
    ElModule.forRoot(),
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }

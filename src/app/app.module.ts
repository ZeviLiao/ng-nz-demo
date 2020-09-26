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
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { TreeDemoComponent } from './tree-demo/tree-demo.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { TableDemoComponent } from './table-demo/table-demo.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { ClarityModule } from '@clr/angular';


registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    CatDropdownComponent,
    TreeDemoComponent,
    TableDemoComponent
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
    NzTreeModule,
    NzTableModule,
    NzInputModule,
    ClarityModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }

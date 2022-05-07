import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { HeaderComponent } from './header';
import { SidenavComponent } from './sidenav';
import { FooterComponent } from './footer';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MenuItemComponent } from './sidenav/menu-item';
import { RouterModule } from '@angular/router';

const COMPONENTS = [HeaderComponent, SidenavComponent, FooterComponent];

@NgModule({
  declarations: [...COMPONENTS, MenuItemComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    FontAwesomeModule,
    MatSidenavModule,
    MatButtonModule,
    MatMenuModule,
  ],
  exports: [...COMPONENTS],
})
export class SharedModule {}

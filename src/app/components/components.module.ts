import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [BreadcrumbComponent],
  imports: [CommonModule, MatIconModule],
  exports: [BreadcrumbComponent],
})
export class ComponentsModule {}

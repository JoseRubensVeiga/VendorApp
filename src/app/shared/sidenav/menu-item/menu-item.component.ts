import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MenuItem, MenuSubItem } from 'src/app/models/MenuItem';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss'],
})
export class MenuItemComponent implements OnInit {
  @Input() selected: boolean;
  @Input() menuItem: MenuItem;
  @Input() sidenavOpened: boolean;

  @Output() clickItem = new EventEmitter();

  get children(): MenuSubItem[] | undefined {
    return this.menuItem.children;
  }

  get hasChildren(): boolean {
    return !!this.children;
  }

  get subMenuStyle(): { [key: string]: string } {
    const childrenAmount = this.children?.length || 0;
    const maxHeight = childrenAmount * 50;
    return { 'max-height': `${maxHeight}px` };
  }

  constructor() {}

  ngOnInit(): void {}

  emitClickItem(): void {
    this.clickItem.emit();
  }
}

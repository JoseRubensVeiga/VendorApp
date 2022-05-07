export interface MenuSubItemInterface {
  label: string;
  url: string;
}

export class MenuSubItem {
  label: string;
  url: string;

  constructor(data: MenuSubItemInterface) {
    this.label = data.label;
    this.url = data.url;
  }
}

export interface MenuItemInterface {
  icon: string;
  label: string;
  url: string;
  children?: MenuSubItemInterface[];
}

export class MenuItem {
  icon: string;
  label: string;
  url: string;
  children?: MenuSubItem[];

  constructor(data: MenuItemInterface) {
    this.icon = data.icon;
    this.label = data.label;
    this.url = data.url;

    this.children = data.children?.map((c: any) => new MenuSubItem(c));
  }
}

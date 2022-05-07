export class MenuSubItemMock {
  label = 'label';
  url = 'url';
}

export class MenuItemMock {
  icon = 'icon';
  label = 'label';
  url = 'url';
  children = [new MenuSubItemMock()];
}

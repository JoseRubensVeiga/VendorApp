import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDrawer, MatSidenavContainer } from '@angular/material/sidenav';
import { filter, map } from 'rxjs/operators';
import { MenuItem } from 'src/app/models/MenuItem';
import { AuthService } from 'src/app/services/auth';
import { MediaService } from 'src/app/services/media';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit, AfterViewInit {
  @ViewChild('drawer') drawer: MatDrawer;
  @ViewChild('sidenavContainer') sidenavContainer: MatSidenavContainer;

  isLogged$ = this.authService.isLogged$;
  isSmallScreen$ = this.mediaService.screenWidth$.pipe(
    map((screen) => screen <= 700)
  );

  selectedItem: number | null = null;
  isByMouseEnter = false;

  menuItems: MenuItem[] = [
    new MenuItem({
      icon: 'dashboard',
      label: 'Dashboard 1',
      url: '/dashboard',
      children: [
        {
          label: 'sub item 01',
          url: '/subrota',
        },
        {
          label: 'sub item 02',
          url: '/subrota2',
        },
        {
          label: 'sub item 02',
          url: '/subrota2',
        },
        {
          label: 'sub item 02',
          url: '/subrota2',
        },
      ],
    }),
    new MenuItem({
      icon: 'fact_check',
      label: 'Minhas Comissões',
      url: '/',
      children: [
        {
          label: 'sub item 02',
          url: '/subrota2',
        },
        {
          label: 'sub item 02',
          url: '/subrota2',
        },
        {
          label: 'sub item 02',
          url: '/subrota2',
        },
        {
          label: 'sub item 02',
          url: '/subrota2',
        },
        {
          label: 'sub item 02',
          url: '/subrota2',
        },
        {
          label: 'sub item 02',
          url: '/subrota2',
        },
        {
          label: 'sub item 02',
          url: '/subrota2',
        },
        {
          label: 'sub item 02',
          url: '/subrota2',
        },
      ],
    }),
    new MenuItem({
      icon: 'work',
      label: 'Vendas e Propostas',
      url: '/proposal',
    }),
    new MenuItem({
      icon: 'chat',
      label: 'Suporte',
      url: '/',
    }),
  ];

  constructor(
    private mediaService: MediaService,
    private authService: AuthService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.registerLoggedListener();
    this.registerScreenChangeListener();
  }

  ngAfterViewInit(): void {
    this.initDrawer();
  }

  toggleSidenav(): void {
    if (this.isDrawerAlreadyIntanced() && this.isDrawerOpened()) {
      this.closeDrawer();
      return;
    }

    this.openDrawer();
  }

  onItemClicked(index: number): void {
    if (this.selectedItem === index) {
      this.selectedItem = null;
      return;
    }

    this.selectedItem = index;
  }

  onMouseEnter(): void {
    if (this.isDrawerAlreadyIntanced() && !this.isDrawerOpened()) {
      this.openDrawer(true);
    }
  }

  onMouseLeave(): void {
    if (this.isByMouseEnter) {
      this.closeDrawer();
    }
  }

  private registerLoggedListener(): void {
    this.isLogged$.pipe(filter((v) => !v)).subscribe(this.closeDrawer);
  }

  private registerScreenChangeListener(): void {
    this.mediaService.screenWidth$.subscribe((screenWidth) => {
      this.refreshDrawer(screenWidth);
    });
  }

  private refreshDrawer(screenWidth: number): void {
    if (screenWidth <= 700) {
      this.closeDrawer();
    }
  }

  private initDrawer(): void {
    const screenWidth = this.mediaService.screenWidth$.getValue();
    this.refreshDrawer(screenWidth);
  }

  private closeDrawer = (): void => {
    if (this.isDrawerAlreadyIntanced()) {
      this.drawer.close();
    }
    this.selectedItem = null;
    this.cd.detectChanges();
  };

  private openDrawer(isByMouseEnter = false): void {
    this.isByMouseEnter = isByMouseEnter;
    if (this.isDrawerAlreadyIntanced()) {
      this.drawer.open();
    }

    setTimeout(() => this.sidenavContainer?.updateContentMargins(), 200);

    this.cd.detectChanges();
  }

  private isDrawerAlreadyIntanced(): boolean {
    return !!this.drawer;
  }

  private isDrawerOpened(): boolean {
    if (this.isDrawerAlreadyIntanced()) {
      return this.drawer.opened;
    }

    return false;
  }
}

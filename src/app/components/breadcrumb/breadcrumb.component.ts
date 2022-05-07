import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { MediaService } from 'src/app/services/media';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent implements OnInit {
  isSmallScreen$ = this.mediaService.screenWidth$.pipe(map(this.isSmallScreen));

  constructor(private mediaService: MediaService) {}

  ngOnInit(): void {}

  private isSmallScreen(value: number): boolean {
    return value <= 900;
  }
}

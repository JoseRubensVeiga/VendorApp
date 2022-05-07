import { Injectable } from '@angular/core';
import { BehaviorSubject, fromEvent, Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MediaService {
  screenWidth$ = new BehaviorSubject<number>(window.innerWidth);

  constructor() {
    this.registerListener();
  }

  private registerListener(): void {
    this.getScreenWidth().subscribe((value) => {
      this.screenWidth$.next(value);
    });
  }

  private parseNumber = (value: any): number => Number(value);

  private getScreenWidth(): Observable<number> {
    return fromEvent(window, 'resize').pipe(
      pluck('target', 'innerWidth'),
      map(this.parseNumber)
    );
  }
}

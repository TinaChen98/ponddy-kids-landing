import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {BehaviorSubject, fromEvent} from 'rxjs';
import {tap, throttleTime} from 'rxjs/operators';
import {isPlatformBrowser} from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  public $mobile = new BehaviorSubject<boolean>(false)
  $screenWidth = new BehaviorSubject<number>(900);
  isBrowser: boolean;


  constructor(
    @Inject(PLATFORM_ID) private platformId: any) {


    if (isPlatformBrowser(this.platformId)) {
      this.isBrowser = true
      this.checkScreenSize()
      this.updateSreenWidth()
      const screenSizeChanged$ = fromEvent(window, 'resize')
        .pipe(throttleTime(300),
          tap(res => this.checkScreenSize()),
          tap(res => this.updateSreenWidth()))
      screenSizeChanged$.subscribe()
    } else {
      this.isBrowser = false
      this.$mobile.next(false);
    }

  }

  checkScreenSize(): void {
    if (window.innerWidth <= 991.98) { // 768px portrait
      this.$mobile.next(true);
    } else {
      this.$mobile.next(false)
    }
  }

  private updateSreenWidth() {
    this.$screenWidth.next(window.innerWidth);
  }
}




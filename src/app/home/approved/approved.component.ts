import { Component } from '@angular/core';
import { DeviceService } from 'src/utils/device.service';

@Component({
  selector: 'home-approved',
  templateUrl: './approved.component.html',
  styleUrls: ['./approved.component.scss']
})
export class ApprovedComponent {
  mobile = true;
  web = false;
  courseWidth: number;
  courseHeight: number;

  constructor(public device: DeviceService) {
    if (device.$mobile.getValue()) {
      this.courseWidth = 240;
      this.courseHeight = 550;
      this.mobile = true;
      this.web = false;
    } else {
      this.courseHeight = 600;
      this.courseWidth = 500;
      this.mobile = false;
      this.web = true;
    }
  }
}

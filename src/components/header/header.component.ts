import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageScrollService } from 'ngx-page-scroll-core';
import { UserProvider } from 'src/core/providers/user.provider';
import { DeviceService } from 'src/utils/device.service';
import { LoginComponent } from '../popup/login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

  mobile = true
  web = false
  courseWidth: number
  courseHeight: number
  userSelf: any;
  email: any;
  testUser: any;
  kids_token: any;
  kids_uuid: any;
  tutors_token: any;
  tutors_uuid: any;

  constructor(public device: DeviceService, private readonly userProvider: UserProvider, public dialog: MatDialog) {
    if (device.$mobile.getValue()) {
      this.courseWidth = 240
      this.courseHeight = 550
      this.mobile = true
      this.web = false
    } else {
      this.courseHeight = 600
      this.courseWidth = 500
      this.mobile = false
      this.web = true
    }
  }

  ngOnInit(): void {
    if(localStorage.getItem('userSelf')) {
      this.userSelf = JSON.parse(localStorage.getItem('userSelf')!);
      this.kids_token = localStorage.getItem('kids_token');
      this.tutors_token = localStorage.getItem('tutors_token');
      this.tutors_uuid = localStorage.getItem('tutors_uuid');
      this.email = true;
    }
  }

  login() {
    this.dialog.open(LoginComponent)
  }

  logout() {
    localStorage.clear();
    location.replace('/');
    setTimeout(() => {
      // TODO: 待上版，改正式機
      // document.location.href = 'https://auth.ponddy.com/en/logout/?redirect_uri=kids.ponddy.com&client_id=215e3662-7d1a-4bc6-b151-971441e92638';
    }, 500)
  }

  changeProfile() {
    let url = `https://auth.ponddy.com/auth/profile/?client_id=215e3662-7d1a-4bc6-b151-971441e92638&token=${this.kids_token}&redirect_uri=https://kids.ponddy.com/`;
    url = decodeURIComponent(url)
    window.open(url, '_self')
  }

  goToClass() {
    let url = `https://admin-api.iponddy.com/sign/auth/in?token=${this.tutors_token}&next=kids_dashboard&uuid=${this.tutors_uuid}`;
    url = decodeURIComponent(url)
    console.log(url)
    window.open(url, '_self')
  }
}

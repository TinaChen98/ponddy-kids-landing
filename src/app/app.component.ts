import { Component, OnInit } from '@angular/core';
import { UserProvider } from 'src/core/providers/user.provider';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'kids-landing';
  kids_token: any;
  kids_uuid: any;

  constructor(private readonly userProvider: UserProvider) {}

  ngOnInit(): void {
    this.userToken();
  }

  userToken() {
    if(window.location.search) {
      const urlParams = new URLSearchParams(window.location.search);
      this.kids_token = urlParams.get('token');
      this.kids_uuid = urlParams.get('uuid');
      localStorage.setItem('kids_token', this.kids_token);
      localStorage.setItem('kids_uuid', this.kids_uuid);

      this.userProvider.userToken(this.kids_token).subscribe( token => {
        localStorage.setItem('token', JSON.stringify(token));
        let tokenAll = JSON.parse(localStorage.getItem('token')!);
        localStorage.setItem('tutors_token', tokenAll[10].token);
        localStorage.setItem('tutors_uuid', tokenAll[10].uuid);
        location.replace('/');
      })
      this.userProvider.userSelf(this.kids_token).subscribe( self => {
        localStorage.setItem('userSelf', JSON.stringify(self));
      })
    }

  }
}

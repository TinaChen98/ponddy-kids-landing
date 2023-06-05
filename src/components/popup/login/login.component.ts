import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserProvider } from 'src/core/providers/user.provider';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  userState: any;
  loginState: any;
  textEmail = '';
  email: any;
  textPassword = '';
  passwordLeast: any;
  passwordContain: any;
  pageStep = 'login';
  verifyState: any;
  textVerify: string[] = new Array();
  onDisabled = false;
  is_valid = false;

  constructor(private readonly userProvider: UserProvider, public dialog: MatDialog) {
  }

  clickSocialLogin(socialClass: any) {
    let url;
    switch (socialClass){
      case 'fb':
          url = `https://auth.ponddy.com/en/auth/social/facebook?client_id=215e3662-7d1a-4bc6-b151-971441e92638&redirect_uri=https://kids.ponddy.com/&next=/`;
          break
      case 'google':
          url = `https://auth.ponddy.com/en/auth/social/google-oauth2?client_id=215e3662-7d1a-4bc6-b151-971441e92638&token=null&redirect_uri=https://kids.ponddy.com/&next=/`;
          break
    }
    window.open(`${url}`, '_self')
  }

  keyupEmail(event: any) {
    this.textEmail = event.target.value;
    var text = event.target.value.split('@')
    if(text.length>1 && text[1]!='') {
      this.email = true
    } else {
      this.email = false
    }
    if(this.email && this.passwordLeast && this.passwordContain) {
      this.onDisabled = true
    } else {
      this.onDisabled = false
    }
  }
  keyupPassword(event: any) {
    this.textPassword = event.target.value;
    const regex = /^(?=.*[0-9])(?=.*[A-Za-z])[A-Za-z0-9]+$/;
    if(event.target.value.length >= 8 ) {
      this.passwordLeast = true;
    } else {
      this.passwordLeast = false;
    }
    if(regex.test(event.target.value)){
      this.passwordContain = true;
    } else {
      this.passwordContain = false;
    }

    if(this.email && this.passwordLeast && this.passwordContain) {
      this.onDisabled = true;
    } else {
      this.onDisabled = false;
    }
  }

  clickContinue(email: any){
    this.userProvider.userState(email).subscribe(
      state => {
        this.userState = true;
        if(state) {
          this.userState = true;
        } else {
          this.userState = false;
        }
      },
      err => {
        this.userState = false;
      }
    )
  }
  clickLogin(email: any, password: any){
    this.userProvider.userLogin(email, password, 'Tutor 2.0').subscribe(
      state => {
        this.loginState = true;
        localStorage.setItem('tutors_token', state.token)
        localStorage.setItem('tutors_uuid', state.uuid)

        this.userProvider.userLogin(email, password, 'Ponddy Kids').subscribe(
          state => {
            this.loginState = true;
            this.pageStep = 'login_ok'
            localStorage.setItem('kids_token', state.token)
            localStorage.setItem('kids_uuid', state.uuid)
            this.userProvider.userSelf(state.token).subscribe( self => {
              localStorage.setItem('userSelf', JSON.stringify(self));
            })

            setTimeout(() => {
              this.dialog.closeAll();
              location.replace('/');
            }, 2000);
          },
          err => {
            this.loginState = false;
          }
        )
      },
      err => {
        this.loginState = false;
      }
    )
  }

  clickCreate() {
    this.userProvider.userState(this.textEmail).subscribe(
      userSelf => {
        if(userSelf.is_valid) {
          // 帳號已存在，且已驗證
          console.log(userSelf)
          this.is_valid = true;
        } else {
          // 帳號已存在，但尚未驗證
          this.userProvider.userResend(this.textEmail).subscribe(
            userResend => {
              this.pageStep = 'verify'
            },
            error => {
              console.error(error)
            }
          )
        }
      },
      error => {
        // 尚未註冊，開始註冊
        this.userProvider.userRegister(this.textEmail, this.textPassword)
        .subscribe(
          userRegister => {
            this.pageStep = 'verify'
          },
          error => {
            console.error(error)
          },
        );
      },
    );


    // this.userProvider.userRegister(this.textEmail, this.textPassword).subscribe(
    //   state => {
    //     this.pageStep = 'verify'

    //   }
    // )
  }

  keyupVerify(event: any, numVerify: any) {
    this.textVerify[numVerify-1] = event.target.value;

    if(this.textVerify.length === 4) {
      for(let i=0;i<this.textVerify.length;i++) {
        if(this.textVerify[i] === '') {
          this.onDisabled = false;
          return;
        } else {
          this.onDisabled = true;
        }
      }
    } else {
      this.onDisabled = false;
    }
  }

  clickVerify(){
    this.userProvider.userVerify(this.textEmail, this.textVerify)
    .subscribe(
      userVerify => {
        this.pageStep = 'verify_ok'
        this.verifyState = false;

        setTimeout(() => {
          this.pageStep = 'login'
        }, 2000);
      },
      error => {
        this.verifyState = false;
        console.error(error);
      },
    );
  }


  pageStepCreate (){
    this.pageStep = 'create'
  }
  pageStepLogin (){
    this.pageStep = 'login'
  }
}

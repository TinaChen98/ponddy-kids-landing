import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserProvider } from 'src/core/providers/user.provider';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  passwordLeast = true;
  passwordContain = true;
  textPassword = '';
  confirmPassword = true;
  textConfirmPassword = '';
  onDisabled = false;
  stepAccount = 1;
  verify = true;
  stateVerify = true;
  textVerify: string[] = new Array()
  textVerify1: any;
  textVerify2: any;
  textVerify3: any;
  textVerify4: any;
  g_recaptcha = true;
  eForm!: Event;

  textState = ['register - password', 'register - successfully', 'register - verify error', 'registration failed']

  dataUser: any;
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {email: string, step: any, is_valid: boolean},
    private readonly userProvider: UserProvider
  ){
    this.dataUser = data;
    this.stepAccount = data.step
  }

  ngOnInit() { }

  onClose() {
    // location.href = location.href
  }

  // step 1
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

    if(this.textConfirmPassword !='') {
      if(this.textConfirmPassword === this.textPassword) {
        this.confirmPassword = true
      } else {
        this.confirmPassword = false
      }
    }

    if(this.passwordLeast && this.passwordContain && this.confirmPassword) {
      this.onDisabled = true;
    } else {
      this.onDisabled = false;
    }
  }

  keyupConfirmPassword(event: any) {
    this.textConfirmPassword = event.target.value;
    if(this.textConfirmPassword === this.textPassword) {
      this.confirmPassword = true
    } else {
      this.confirmPassword = false
    }
    if(this.passwordLeast && this.passwordContain && this.confirmPassword) {
      this.onDisabled = true
    } else {
      this.onDisabled = false
    }
  }


  // step 2
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

  // step send email
  public userRegister(e: Event, step: any) {
    // console.log(e)
    if(this.g_recaptcha) {
      if(step === 1) {
        // 註冊帳號 - 設定密碼
        this.userProvider.userRegister(this.dataUser.email, this.textPassword)
        .subscribe(
          userRegister => {
            this.stepAccount = 2;
            this.onDisabled = false;
            this.sendEmail(e)
          },
          error => {
            console.error(error)
          },
        );
      } else if(step === 2){
        // 帳號已存在，但尚未驗證 is_valid = false
        // 註冊帳號，第一次驗證 is_valid = true

        // 驗證帳號
        this.userProvider.userVerify(this.dataUser.email, this.textVerify)
        .subscribe(
          userVerify => {
            this.verify = true;
            this.stepAccount = 3;
            this.sendEmail(e)
          },
          error => {
            this.verify = false;
            this.sendEmail(e);
            console.error(error);
          },
        );
      }
    } else {
      this.eForm = e
    }

    e.preventDefault();
  }

  public sendEmail(e: any) {
    emailjs.sendForm('service_x9fj97d', 'template_3ea1g51', e.target as HTMLFormElement, 'user_I9kbNANU0UDJQZwgggq3p')
      .then((result: EmailJSResponseStatus) => {
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      });
  }

}

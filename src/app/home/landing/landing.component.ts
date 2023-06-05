import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { RecaptchaErrorParameters } from 'ng-recaptcha';
import { LoadingComponent } from 'src/components/loading/loading.component';
import { EmailFailComponent } from 'src/components/popup/email-fail/email-fail.component';
import { EmailSuccessComponent } from 'src/components/popup/email-success/email-success.component';
import { RegisterComponent } from 'src/components/popup/register/register.component';
import { UserProvider } from 'src/core/providers/user.provider';
import { DeviceService } from 'src/utils/device.service';

@Component({
  selector: 'home-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  defaultImage = './assets/images/home/landing-main-w.png';
  image = './assets/images/home/landing-main-w.png';
  parent: any;
  textParent: any;
  phone: any;
  textPhone: any;
  email: any
  textEmail: any
  tokenEmail: any
  questions: any;
  onDisabled = false;
  g_recaptcha = false;
  eForm!: Event;
  mobile = true
  web = false
  courseWidth: number
  courseHeight: number
  textState = ['register - start', 'This account is not verified yet', 'Account Already Exists']
  stepAccount: any;

  constructor(public device: DeviceService, public dialog: MatDialog, private http: HttpClient,private readonly userProvider: UserProvider) {
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
      this.tokenEmail = JSON.parse(localStorage.getItem('userSelf')!).email;
      this.email = true;
    }
  }

  onEmail(event: any) {
    this.textEmail = event.target.value;
    var text = event.target.value.split('@')
    if(text.length>1 && text[1]!='') {
      this.email = true
    } else {
      this.email = false
    }
    if(this.parent && this.phone && this.email) {
      this.onDisabled = true
    } else {
      this.onDisabled = false
    }
  }

  onParent(event: any) {
    this.textParent = event.target.value;
    if(event.target.value) {
      this.parent = true
    } else {
      this.parent = false
    }
    if(this.parent && this.phone && this.email) {
      this.onDisabled = true
    } else {
      this.onDisabled = false
    }
  }

  onPhone(event: any) {
    this.textPhone = event.target.value;
    if(event.target.value) {
      this.phone = true
    } else {
      this.phone = false
    }
    if(this.parent && this.phone && this.email) {
      this.onDisabled = true
    } else {
      this.onDisabled = false
    }
  }

  public captchaResponse = "";
  public resolved(captchaResponse: string): void {
    const newResponse = captchaResponse
      ? `${captchaResponse.substr(0, 7)}...${captchaResponse.substr(-7)}`
      : captchaResponse;
    this.captchaResponse += `${JSON.stringify(newResponse)}\n`;
    console.log('test')
    this.g_recaptcha = true
    this.userState(this.eForm)
  }

  public onError(errorDetails: RecaptchaErrorParameters): void {
    this.captchaResponse += `ERROR; error details (if any) have been logged to console\n`;
    console.log(`reCAPTCHA error encountered; details:`, errorDetails);
    this.g_recaptcha = false
  }

  public userState(e: Event) {
    if(this.g_recaptcha) {
      if(this.dialog.openDialogs.length === 0) {
        this.userProvider.userState(this.textEmail).subscribe(
          userSelf => {
            if(userSelf.is_valid) {
              this.stepAccount = 3
              this.sendEmail();
              // 帳號已存在，且已驗證
              this.dialog.open(RegisterComponent, {
                data: {
                  parent: this.textParent,
                  phone: this.textPhone,
                  email: this.textEmail,
                  step: 3,
                  is_valid: userSelf.is_valid
                },
              })
            } else {
              this.stepAccount = 2
              this.sendEmail();
              // 帳號已存在，但尚未驗證
              this.userProvider.userResend(this.textEmail).subscribe(
                userResend => {
                  this.dialog.open(RegisterComponent, {
                    data: {
                      parent: this.textParent,
                      phone: this.textPhone,
                      email: this.textEmail,
                      step: 2,
                      is_valid: userSelf.is_valid
                    },
                  })
                },
                error => {
                  console.error(error)
                }
              )
            }
          },
          error => {
            this.stepAccount = 1
            this.sendEmail();
            // 尚未註冊，開始註冊
            this.dialog.open(RegisterComponent, {
              data: {
                parent: this.textParent,
                phone: this.textPhone,
                email: this.textEmail,
                step: 1,
                is_valid: true
              },
            })
          },
        );
      }
    } else {
        this.eForm = e
    }
    e.preventDefault();
  }

  public sendEmail() {
    emailjs.sendForm('service_x9fj97d', 'template_3ea1g51', this.eForm.target as HTMLFormElement, 'user_I9kbNANU0UDJQZwgggq3p')
      .then((result: EmailJSResponseStatus) => {
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      });
  }
}

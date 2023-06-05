import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingComponent } from './loading/loading.component';
import { EmailFailComponent } from './popup/email-fail/email-fail.component';
import { EmailSuccessComponent } from './popup/email-success/email-success.component';
import { RegisterComponent } from './popup/register/register.component';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { MatMenuModule } from '@angular/material/menu';
import { LoginComponent } from './popup/login/login.component';


@NgModule({
  declarations: [ HeaderComponent, FooterComponent, LoadingComponent, EmailSuccessComponent, EmailFailComponent, RegisterComponent, LoginComponent ],
  imports: [
    CommonModule,
    RouterModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    LazyLoadImageModule,
    MatMenuModule
  ],
  exports: [ HeaderComponent, FooterComponent, LoadingComponent, EmailSuccessComponent, EmailFailComponent, RegisterComponent, LoginComponent]
})
export class ShareModule { }

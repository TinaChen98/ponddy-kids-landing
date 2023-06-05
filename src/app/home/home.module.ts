import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { ShareModule } from 'src/components/share.module';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { FormsModule } from '@angular/forms';
import { RecaptchaFormsModule, RecaptchaModule, RecaptchaSettings, RECAPTCHA_SETTINGS } from 'ng-recaptcha';
import { environment } from 'src/environments/environment';
import { ApprovedComponent } from './approved/approved.component';
import { FeatureComponent } from './feature/feature.component';
import { LearningComponent } from './learning/learning.component';
import { FormComponent } from './form/form.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
];

@NgModule({
  declarations: [
    HomeComponent,
    LandingComponent,
    ApprovedComponent,
    FeatureComponent,
    LearningComponent,
    FormComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ShareModule,
    LazyLoadImageModule,
    FormsModule,
    RecaptchaModule,
    RecaptchaFormsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: environment.recaptcha.siteKey,
      } as RecaptchaSettings,
    },
  ],
})
export class HomeModule { }

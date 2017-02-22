import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { AuthData } from '../providers/auth-data';
import {SignupPage} from '../pages/signup/signup';
import {ResetPasswordPage} from '../pages/reset-password/reset-password';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage,
    ResetPasswordPage
  ],
imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage,
    ResetPasswordPage
  ],
  providers: [AuthData, {provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}

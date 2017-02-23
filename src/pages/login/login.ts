import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController, 
  AlertController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthData } from '../../providers/auth-data';

import {SignupPage} from '../signup/signup';
import {ResetPasswordPage} from '../reset-password/reset-password';
import {TabPage } from '../tab/tab';
/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
//items = ['sdfds','adf'];
  public loginForm;
  emailChanged: boolean = false;
  passwordChanged: boolean = false;
  submitAttempt: boolean = false;
  loading: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder,public authData:AuthData,public alertCtrl: AlertController, 
    public loadingCtrl: LoadingController) {
    this.loginForm = formBuilder.group({
        email: ['', Validators.compose([Validators.required])],
        password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
      });
  }
 loginUser(){
    this.submitAttempt = true;
  if(!this.loginForm.valid){
    
  }
  else {
      this.authData.login(this.loginForm.value.email, this.loginForm.value.password).then( authData => {
        if (authData.emailVerified){
        this.navCtrl.setRoot(TabPage);
      }
      else{
        let alert = this.alertCtrl.create({
      title: 'Comfirmation',
      subTitle: 'You need to verified your email',
      buttons: ['OK']
    });
    alert.present();
      }
      
      }, error => {

        this.loading.dismiss().then( () => {
          let alert = this.alertCtrl.create({
            message: "your email or password was wrong",
            buttons: [
              {
                text: "Ok",
                role: 'cancel'
              }
            ]
          });
          alert.present();          
        });
      });
      
       this.loading = this.loadingCtrl.create({
        dismissOnPageChange: true,
        content: "Please wait...",
        duration: 500
      });
      this.loading.present();
    }

}
elementChanged(input){
   let field = input.inputControl.name;
    this[field + "Changed"] = true;
  }

  goToSignup(){
    this.navCtrl.push(SignupPage);
  }
  goToResetPassword(){
    this.navCtrl.push(ResetPasswordPage);
  }
  
  
   
}





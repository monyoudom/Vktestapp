import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController,AlertController } from 'ionic-angular';

import { FormBuilder, Validators } from '@angular/forms';
import { AuthData } from '../../providers/auth-data';
/*
  Generated class for the ResetPassword page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html'
})
export class ResetPasswordPage {
  public resetPasswordFrom: any;
   emailChanged: boolean = false;
   submitAttempt: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,public formBuilder: FormBuilder,public authData:AuthData,
  public alertCtrl: AlertController,) {
    this.resetPasswordFrom = formBuilder.group({
      email : ['', Validators.compose([Validators.maxLength(30), Validators.required])],

    })

  }

 resetPassword(){

    this.submitAttempt = true;

    if (!this. resetPasswordFrom.valid){
      console.log(this. resetPasswordFrom.value);
    } else {
      this.authData.resetPassword(this. resetPasswordFrom.value.email).then((user) => {
        let alert = this.alertCtrl.create({
          message: "We just sent you a reset link to your email",
          buttons: [
            {
              text: "Ok",
              role: 'cancel',
              handler: () => {
                this.navCtrl.pop();
              }
            }
          ]
        });
        alert.present();

      }, (error) => {
        var errorMessage: string = error.message;
        let errorAlert = this.alertCtrl.create({
          message: errorMessage,
          buttons: [
            {
              text: "Ok",
              role: 'cancel'
            }
          ]
        });
        errorAlert.present();
      });
    }
  }
   
   elementChanged(input){
   let field = input.inputControl.name;
    this[field + "Changed"] = true;
   }

}

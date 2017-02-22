import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
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

  constructor(public navCtrl: NavController, public navParams: NavParams,public formBuilder: FormBuilder) {
    this.resetPasswordFrom = formBuilder.group({
      email : ['', Validators.compose([Validators.maxLength(30), Validators.required])],

    })

  }

 resetPassword() {
    console.log('ionViewDidLoad ResetPasswordPage');
  }
   
   elementChanged(input){
   let field = input.inputControl.name;
    this[field + "Changed"] = true;
   }

}

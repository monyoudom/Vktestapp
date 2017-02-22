import { Component } from '@angular/core';
import { NavController, NavParams ,AlertController,LoadingController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthData } from '../../providers/auth-data';
import {LoginPage } from '../login/login';
import firebase    from  'firebase';
/*
  Generated class for the Signup page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  public signupForm: any;
  emailChanged: boolean = false;
  passwordChanged: boolean = false;
  firstnameChanged: boolean =false;
  lastnameChanged: boolean =false;
  phoneChanged: boolean = false;
  submitAttempt: boolean = false;
  public userProfile: any;

  loading: any;

  constructor(public navCtrl: NavController, 
  public navParams: NavParams,
  public formBuilder:FormBuilder,
  public authData:AuthData,
  public alertCtrl: AlertController,
  public loadingCtrl: LoadingController ) {
  this.signupForm = formBuilder.group(
    {
      firstname: ['', Validators.compose([Validators.maxLength(15), Validators.required])],
      lastname: ['', Validators.compose([Validators.maxLength(15), Validators.required])],
      email: ['', Validators.compose([ Validators.required])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
      phone: ['', Validators.compose([Validators.maxLength(14), Validators.required])]

    });
     this.userProfile = firebase.database().ref('/userProfile'); 

  }

 signupUser() {
   this.submitAttempt = true;
   if(!this.signupForm.valid){
     console.log(this.signupForm)
   }
   else
   {
         this.authData.signupUser(this.signupForm.value.firstname,
         this.signupForm.value.lastname,
         this.signupForm.value.email,
         this.signupForm.value.password,
         this.signupForm.value.phone).then( (newUser) => {
        
         this.authData.logoutUser().then(() => {
                 this.navCtrl.setRoot(LoginPage);
                  });

      //    this.userProfile.child(newUser.uid).set({
      //    firstname : this.signupForm.value.firstname,
      //    lastname  :this.signupForm.value.lastname,
      //    phone : this.signupForm.value.phone,
         

          
      //  });
      

     });
      this.loading = this.loadingCtrl.create({
        dismissOnPageChange: true,
        content: "Please wait...",
        duration: 700
      });
      this.loading.present();
    }
      

     
    
     
   }
   
   elementChanged(input){
   let field = input.inputControl.name;
    this[field + "Changed"] = true;
   }
    
  }
  



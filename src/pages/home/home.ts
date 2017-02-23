import { Component } from '@angular/core';

import { NavController,LoadingController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import {LoginPage } from '../login/login';
import { AuthData } from'../../providers/auth-data';
import firebase from 'firebase';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public resetPasswordFrom: any;
  postChanged : boolean = false;
  submitAttempt: Boolean = false;
  public userProfile: any;
  public userID: any;
  public posts:any;
  loading: any;
  
  
  

  constructor(public navCtrl: NavController,public authData:AuthData,public formBuilder : FormBuilder,public loadingCtrl : LoadingController) {
    this.resetPasswordFrom = formBuilder.group({
     email: ['', Validators.compose([Validators.maxLength(100), Validators.required])],
    });
    this.userID  = firebase.auth().currentUser.uid;
     this.userProfile = firebase.database().ref('/userProfile/' + this.userID+'/')
     

    
  }
 resetPassword(){
    this.submitAttempt= true;
    if(!this.resetPasswordFrom.valid){
      alert("No");

    }
    else{
     this.userProfile.push({
   post : this.resetPasswordFrom.value.email,

    });
    this.loading = this.loadingCtrl.create({
        
        content: "Please wait...",
        duration: 1000
      });
      this.loading.present();
this.userProfile.on("value", function(snapshot) {
   console.log(snapshot.val());
   alert("result"+JSON.stringify(snapshot.val()));
}, function (error) {
   console.log("Error: " + error.code);
});



   

   




      
      
    }
    

  }

logOut(){
  this.authData.logoutUser().then(() => {
    this.navCtrl.setRoot(LoginPage);
  });
}
elementChanged(input){
   let field = input.inputControl.name;
    this[field + "Changed"] = true;
   }
}

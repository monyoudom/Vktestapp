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
  
  
  
  public userProfile: any;
  public userID: any;
  public posts:any;

  loading: any;
  public firstname :any;
  public username:any;
  public lastname:any;
  
  

 

  public data:any;

  constructor(public navCtrl: NavController,public authData:AuthData,public formBuilder : FormBuilder,public loadingCtrl : LoadingController) {
    
   
    this.userID  = firebase.auth().currentUser.uid;
    this.userProfile = firebase.database().ref('/userProfile/' + this.userID+'/post/');
    this.firstname = firebase.database().ref('/userProfile/').child(this.userID);
    
    this.firstname.orderByChild("firstname").once("value", username =>{
        this.username = username.val().firstname
        this.lastname = username.val().lastname
        console.log("firstname is "+this.username);
        console.log("last name "+this.lastname);
    });
    


  }
 
logOut(){
  this.authData.logoutUser().then(() => {
    this.navCtrl.setRoot(LoginPage);
  });
}

}

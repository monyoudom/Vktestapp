import { Component } from '@angular/core';

import { NavController,LoadingController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import {LoginPage } from '../login/login';
import { AuthData } from'../../providers/auth-data';
import firebase from 'firebase';
import {NewfeedsPage} from '../newfeeds/newfeeds';


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
  public firstname :any;
  public username:any;
  public lastname:any;
  
  
  public data:any;
  
  
  

  constructor(public navCtrl: NavController,public authData:AuthData,public formBuilder : FormBuilder,public loadingCtrl : LoadingController) {
    this.resetPasswordFrom = formBuilder.group({
      //value from form resetPasswordFrom
     email: ['', Validators.compose([Validators.maxLength(100), Validators.required])],
    });
   
    this.userID  = firebase.auth().currentUser.uid;
    this.userProfile = firebase.database().ref('/userProfile/' + this.userID+'/post/');
    this.firstname = firebase.database().ref('/userProfile/').child(this.userID);
    
    this.firstname.orderByChild("firstname").once("value", username =>{
        this.username = username.val().firstname
        this.lastname = username.val().lastname
        console.log("firstname is "+this.username);
        console.log("last name "+this.lastname);
    });
    this.userProfile.orderByKey().on("child_added", data =>{
      this.posts = data.val().post;
      console.log("posts   "+this.posts);
      console.log("Hello :" + JSON.stringify(data.val()));
    });

     

    
  }
 resetPassword(){
    this.submitAttempt= true;
    if(!this.resetPasswordFrom.valid){
      alert("No");

    }
    else{
     this.userProfile.push({
       //insert value from form email
   post : this.resetPasswordFrom.value.email,
   

    });
    this.loading = this.loadingCtrl.create({
        
        content: "Please wait...",
        duration: 1000
      });
      this.loading.present();
      


   
    
this.navCtrl.push(NewfeedsPage);

   

   




      
      
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

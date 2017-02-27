import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AuthData } from'../../providers/auth-data';
import firebase from 'firebase';
import {NewfeedsPage} from '../newfeeds/newfeeds';
import { FormBuilder, Validators } from '@angular/forms';

/*
  Generated class for the Post page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-post',
  templateUrl: 'post.html'
})
export class PostPage {
	public messages: any;
  postChanged : boolean = false;
  submitAttempt: Boolean = false;
  public userProfile: any;
  public userID: any;
  public posts:any=[];
  loading: any;
    
 

  
  public data:any;
  
  
  

  constructor(public navCtrl: NavController,public authData:AuthData,public formBuilder : FormBuilder,public loadingCtrl : LoadingController) {
    this.messages = formBuilder.group({
      //value from form messages
     email: ['', Validators.compose([Validators.maxLength(100), Validators.required])],
    });
    this.userID  = firebase.auth().currentUser.uid;
    
    this.userProfile = firebase.database().ref('/userProfile/' + this.userID+'/post/')
    
   
     

    
  }
 gotoNewfeeds(){
    this.submitAttempt= true;
    if(!this.messages.valid){
      

    }
    else{
     this.userProfile.push({
       //insert value from form email
   post : this.messages.value.email,
   

    });
    this.loading = this.loadingCtrl.create({
        
        content: "Please wait...",
        duration: 1000
      });
      this.loading.present();
      


   
    
this.navCtrl.setRoot(NewfeedsPage);

   

   




      
      
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

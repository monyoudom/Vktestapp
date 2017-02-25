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
  
  
  
  public userProfile: any;
  public userID: any;
  public posts:any;
  loading: any; 
  public data:any;

  constructor(public navCtrl: NavController,
    public authData:AuthData,
    public formBuilder : FormBuilder,
    public loadingCtrl : LoadingController) {
    this.userProfile = firebase.database().ref('/userProfile/' + this.userID+'/post/') 
    this.userProfile.orderByChild("post").on("child_added", data =>{
    this.posts = data.val().post;
    console.log("posts   "+this.posts);
});

  }
 
logOut(){
  this.authData.logoutUser().then(() => {
    this.navCtrl.setRoot(LoginPage);
  });
}

}

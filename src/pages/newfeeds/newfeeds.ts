import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController } from 'ionic-angular';
import firebase from 'firebase';

/*
  Generated class for the Newfeeds page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-newfeeds',
  templateUrl: 'newfeeds.html',

})
export class NewfeedsPage {
  public userProfile: any;
  public userID: any;
  public posts:any= [];
  public loading:any;
 

  constructor(public navCtrl: NavController, public navParams: NavParams,public loadingCtrl: LoadingController) {
     this.userID  = firebase.auth().currentUser.uid;
     this.userProfile = firebase.database().ref('/userProfile/' + this.userID+'/post/');
     

     this.userProfile.orderByChild("post").on("child_added", data =>{
    this.posts.push(data.val().post);
    console.log("posts   "+this.posts);
});
this.loading = this.loadingCtrl.create({
        dismissOnPageChange: true,
        content: "Please wait...",
        duration: 1000
      });
      this.loading.present();


  }

  NewFeed() {
    alert("test");
    

  }
    
}

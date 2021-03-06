import { Component , NgZone} from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import firebase from 'firebase';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { TabPage } from '../pages/tab/tab'
import { PostPage } from '../pages/post/post';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage : any;

  constructor(platform: Platform,public zone:NgZone) {

 var config = {
    apiKey: "AIzaSyA_gs_VbEeIUBqOKjsVJwxRlyhao1ocviQ",
    authDomain: "vkapp-2b64b.firebaseapp.com",
    databaseURL: "https://vkapp-2b64b.firebaseio.com",
    storageBucket: "vkapp-2b64b.appspot.com",
    messagingSenderId: "924893433774"
  };
  firebase.initializeApp(config);
 
 
  firebase.auth().onAuthStateChanged( user =>{

    this.zone.run( () => {
    if (!user) {
      this.rootPage = LoginPage;

      
    } else {
      
      
      
      
      if (user.emailVerified) {
        this.rootPage = TabPage;
        
      }
      else {
        user.sendEmailVerification();
        this.rootPage = LoginPage;
        
      }
    }
  });     
 
  });
  

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}

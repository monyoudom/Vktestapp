import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import firebase from 'firebase';

/*
  Generated class for the Server provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthData {
  
  public fireAuth :any;
  public userProfile: any;
  public user : any;

  constructor(public http: Http) {
  
   this.fireAuth = firebase.auth();
   this.userProfile = firebase.database().ref('/userProfile/'); 
  


  }
  
// Login function service need to paramater email and password from login page
  login(email:string, password: string): any{

    return this.fireAuth.signInWithEmailAndPassword(email,password);

  }

  signupUser(firstname:string,lastname:string,email:string, password:string,phone:any):any{

    return this.fireAuth.createUserWithEmailAndPassword(email,password).then((newUser)=>{

      this.userProfile.child(newUser.uid).set(
    { 
        firstname : firstname ,
        lastname : lastname,
       email:email,
       phone : phone,

             
      
    }
        
        );
    });
  }

  resetPassword(email: string):any{
 return this.fireAuth.sendPasswordResetEmail(email)
  }
logoutUser():any{
  return this.fireAuth.signOut();
}




}

import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  isLoggedIn=false;

  constructor(public firebaseAuth:AngularFireAuth) { }

  async singIn(email:string, pass:string){
    await this.firebaseAuth.signInWithEmailAndPassword(email,pass).then(
      res=>{
      this.isLoggedIn=true;
      localStorage.setItem('user', JSON.stringify(res.user));
      console.log('user: '+ JSON.stringify(res.user))
    },
    err=>{this.isLoggedIn=false;}
    )

  }

logout(){
  this.isLoggedIn=false;
  this.firebaseAuth.signOut();
  localStorage.removeItem('user');
}


}

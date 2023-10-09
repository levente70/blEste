import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { Felhasznalo } from './felhasznalo';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public afAuth: AngularFireAuth) {
  
  }


  googleAuth(){
    return this.login(new GoogleAuthProvider());
  }

  private login(provider: any){
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        if (result.user != undefined){
          localStorage.setItem('email', <string>result.user.email);
          localStorage.setItem('displayname', <string>result.user.displayName);
        }
      })
      .catch((error) => {
        alert(error);
      });
  }

  logout(){
    return this.afAuth.signOut().then(t => {
      localStorage.clear();
    })
  }


  isLoggedIn(){
    return localStorage.getItem('email') != null;
  }

  getCurrentUser(): Felhasznalo{
    let u = new Felhasznalo();
    u.email = localStorage.getItem('email') as string;
    let dpname = localStorage.getItem('displayname') as string;
    u.nev = dpname;
    
    return u;
  }

}

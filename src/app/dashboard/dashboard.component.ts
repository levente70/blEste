import { Component } from '@angular/core';
import { Kep } from '../kep';
import { KepService } from '../kep.service';
import { AuthService } from '../auth.service';
import { Felhasznalo } from '../felhasznalo';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  aktualis: Kep = new Kep();


  constructor(public service: KepService, public auth: AuthService){

  }
  
  report(){
    this.service.create(this.aktualis);
    //this.aktualis=new Kep();
    let user: Felhasznalo = this.auth.getCurrentUser();
    this.aktualis.email= user.email;
    this.aktualis.nev=user.nev;
    this.aktualis.kepCim='';
    this.aktualis.kepUrl='';
    this.aktualis.szavazok = [];
    
  }

  googleAuth(){
    this.auth.googleAuth().then(t => {
      let user = this.auth.getCurrentUser();
      this.aktualis.nev = user.nev;
      this.aktualis.email = user.email;
    });
  }

  
  logout(){
    this.auth.logout().then(t => {
      this.aktualis = new Kep();
    });
  }
}

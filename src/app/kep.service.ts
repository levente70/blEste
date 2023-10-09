import { Injectable } from '@angular/core';
import { Kep } from './kep';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class KepService {
  kepek: Map<string, Kep> = new Map<string, Kep>();

  constructor(private db: AngularFireDatabase, private auth: AuthService) {
    db.object('pictures').valueChanges().subscribe(t => {
      this.kepek = new Map(Object.entries(t as Object));
      console.log(this.kepek);
    });
   }

   create(p: Kep){
    let aktualisFelhasznalo = this.auth.getCurrentUser();
    p.szavazok?.push(aktualisFelhasznalo);
    this.db.list('pictures').push(p);
  }

  
  delete(key: string){
    this.db.list('pictures').remove(key);
  }

  update(key: string, value: Kep){
    this.db.list('pictures').update(key, value);
  }

  szavazas(key: string){
    let aktualisFelhasznalo = this.auth.getCurrentUser();
    let szavazo = this.findById(key);
    if (szavazo != undefined){
      if (szavazo.szavazok?.find(t => t.email == aktualisFelhasznalo.email) == undefined){
        szavazo.szavazok?.push(aktualisFelhasznalo);
      }
      this.update(key, szavazo);
    }
  }

  findById(key: string){
    return this.kepek.get(key);
  }

}

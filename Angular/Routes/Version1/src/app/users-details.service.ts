import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersDetailsService {

  constructor( ) {
    users : User[] = {
      name : "Adam"
    }
  }
}

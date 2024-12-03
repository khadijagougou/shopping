import {inject, Injectable} from '@angular/core';
import {AuthService} from "../authService/auth.service";
import {TeamService} from "../../../core/components/services/team/team.service";
const TOKEN = 'token';
const USER = 'user';
const ROLE = 'role';

@Injectable({
  providedIn: 'root'
})
export class UserStorageService {
private teamService = inject(TeamService);
  constructor() { }
  static saveToken(token: string): void {
    //kan7iydo token li deja kan bash n7to jdid
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN, token);
  }
  static saveUserRole(role: string): void {
    //kan7iydo token li deja kan bash n7to jdid
    window.localStorage.removeItem(ROLE);
    window.localStorage.setItem(ROLE, role);
  }
  static saveUser(user: { id: string }): void {
    console.log("Enregistrement de l'utilisateur :", user); // Ajoute un journal
    localStorage.setItem('user', JSON.stringify(user));  // Enregistre l'utilisateur avec le rôle
  }
  static getToken(): string | null {
    return typeof localStorage !== 'undefined' ? localStorage.getItem(TOKEN) : null;
  }

  static getUser(): any | null {
    return typeof localStorage !== 'undefined' ? JSON.parse(localStorage.getItem(USER) || 'null') : null;
  }



  static signOut():void{
    window.localStorage.removeItem(TOKEN);
    window.localStorage.removeItem(USER);
  }
}

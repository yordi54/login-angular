import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserI } from '../pages/interfaces/user.interface';
import { Observable, tap } from 'rxjs';
import { UserLoginI } from '../pages/interfaces/user-login.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private base_url = 'http://localhost:3000/api';
  private _user!: UserI;
  constructor( private http: HttpClient) { }
  get user() {
    return { ...this._user };
  }
  registerUser( user: UserI ): Observable<UserI> {
    return this.http.post<UserI>(`${this.base_url}/users`, user);
  }

  loginUser(user : UserLoginI ): Observable<UserI> {
    return this.http.post<UserI>(`${this.base_url}/users/login`, user ).pipe(
      tap(resp => { this._user = resp;})
    );
  }

}

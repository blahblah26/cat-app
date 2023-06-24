import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { user } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  authenticated: boolean = false;
  credentials = {username: '', password: ''};

  constructor(private http: HttpClient) { }

  authenticate(credentials: {username: string, password: string}): Observable<boolean> {
    return this.http.post<boolean>('login', credentials).pipe(); 
  }

  login(credentials: {username: string, password: string}): boolean {
    this.authenticate(credentials).subscribe((result) => this.authenticated = result);
    if (this.authenticated) {
      this.credentials = credentials;
    }
    return this.authenticated;
  }

  getUser() {
    if (!this.authenticated) {
      // TODO: redirect to login page
      return undefined;
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Basic ' + btoa(this.credentials.username + ':' + this.credentials.password)
      })
    };
    return this.http.get<user>('user/' + this.credentials.username, httpOptions).pipe();
  }

  changeUser(user: {username: string, password: string, email: string, profile: string}) {
    if (!this.authenticated) {
      // TODO: redirect to login page
      return undefined;
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Basic ' + btoa(this.credentials.username + ':' + this.credentials.password)
      })
    };
    return this.http.post<void>('user/' + this.credentials.username, user, httpOptions).pipe();
  }

  deleteUser() {
    if (!this.authenticated) {
      // TODO: redirect to login page
      return undefined;
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Basic ' + btoa(this.credentials.username + ':' + this.credentials.password)
      })
    };
    return this.http.delete<void>('user/' + this.credentials.username, httpOptions).pipe(tap(() => this.logout()));
  }

  createUser(user: {username: string, password: string, email: string, profile: string}) {
    return this.http.put('user/create', user).pipe();
  }

  logout() {
    this.authenticated = false;
    this.credentials = {username: '', password: ''};
    // TODO: redirect to login page
  }
}

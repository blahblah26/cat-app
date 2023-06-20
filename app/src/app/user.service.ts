import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { user } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  authenticated: boolean = false;

  constructor(private http: HttpClient) { }

  authenticate(credentials: {username: string, password: string}): Observable<boolean> {
    return this.http.post<boolean>('login', credentials).pipe(); 
  }

  login(credentials: {username: string, password: string}): boolean {
    this.authenticate(credentials).subscribe((result) => this.authenticated = result);
    return this.authenticated;
  }

  getUser(credentials: {username: string, password: string}): Observable<user> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Basic ' + btoa(credentials.username + ':' + credentials.password)
      })
    };
    return this.http.get<user>('user/' + credentials.username, httpOptions).pipe();
  }

  changeUser(credentials: {username: string, password: string}, user: {username: string, password: string, email: string, profilePicture: string}) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Basic ' + btoa(credentials.username + ':' + credentials.password)
      })
    };
    return this.http.post<void>('user/' + credentials.username, user, httpOptions).pipe();
  }

  deleteUser(credentials: {username: string, password: string}) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Basic ' + btoa(credentials.username + ':' + credentials.password)
      })
    };
    return this.http.delete<void>('user/' + credentials.username, httpOptions).pipe();
  }

  createUser(user: {username: string, password: string, email: string, profilePicture: string}) {
    return this.http.put('createuser/' + user.username, user).pipe();
  }
}

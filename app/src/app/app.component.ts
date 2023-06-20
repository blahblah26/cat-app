import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { user } from './user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client';
  credentials = {username: '', password: ''};
  constructor (private http: HttpClient) {}
  authenticated = false;
  user? : Observable<user>;
  login() {

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Basic ' + btoa(this.credentials.username + ':' + this.credentials.password)
      })
    };
    this.http.post<boolean>('login', this.credentials).subscribe(
      (data) => {
        this.authenticated = data;
        alert('Authenticated = ' + this.authenticated)
        if (this.authenticated) {
          this.user = this.http.get<user>('user/' + this.credentials.username, httpOptions).pipe();
        }
      });
  }
}

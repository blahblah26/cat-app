import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from './user.service';
import { Cat } from './cat';

@Injectable({
  providedIn: 'root'
})
export class CatService {

  constructor(private http: HttpClient, private userService: UserService) { }

  getCatByName(catName: string) {
    if (!this.userService.authenticated) {
      // TODO: route to login page
      return undefined;
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Basic ' + btoa(this.userService.credentials.username + ':' + this.userService.credentials.password)
      })
    };
    return this.http.get<Cat>('cat/' + catName, httpOptions).pipe();
  }

  getCatByUsername() {
    if (!this.userService.authenticated) {
      // TODO: route to login
      return undefined;
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Basic ' + btoa(this.userService.credentials.username + ':' + this.userService.credentials.password)
      })
    };
    return this.http.get<Cat[]>('user/' + this.userService.credentials.username + '/cats', httpOptions).pipe();
  }

  changeCat(cat: {picture: string}, catName: string) {
    if (!this.userService.authenticated) {
      // TODO: route to login page
      return undefined;
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Basic ' + btoa(this.userService.credentials.username + ':' + this.userService.credentials.password)
      })
    };
    return this.http.post<void>('cat/' + catName, cat, httpOptions).pipe();
  }

  deleteCat(catName: string) {
    if (!this.userService.authenticated) {
      // TODO: route to login page
      return undefined;
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Basic ' + btoa(this.userService.credentials.username + ':' + this.userService.credentials.password)
      })
    };
    return this.http.delete<void>('cat/' + catName, httpOptions).pipe();
  }

  createCat(cat: {name: string, user_id: number, picture: string}) {
    if (!this.userService.authenticated) {
      // TODO: route to login page
      return undefined;
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Basic ' + btoa(this.userService.credentials.username + ':' + this.userService.credentials.password)
      })
    };
    return this.http.put<void>('cat/create', cat, httpOptions).pipe()
  }
}

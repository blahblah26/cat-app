import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { CatService } from '../cat.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  authenticated = false;
  constructor(private userService: UserService, private catService: CatService, private router: Router) { }
  logout() {
    this.userService.logout();
  }
  getUsername(): string {
    return this.userService.credentials.username;
  }
}

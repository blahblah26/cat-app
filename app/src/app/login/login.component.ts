import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials = {username: '', password: ''};
  authError = false;

  constructor(private userService: UserService, private router: Router) { }

  login() {
    if (this.userService.login(this.credentials)) {
      this.authError = false;
      this.credentials = {username: '', password: ''};
      this.router.navigateByUrl("/home");
    } else {
      this.credentials = {username: '', password: ''};
      this.authError = true;
    }
  }
}

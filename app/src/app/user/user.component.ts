import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { user } from '../user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{
  user: user | undefined;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userService.getUser()?.subscribe((user) => this.user = user);
  }

  updateUser() {
    if (this.user) {
      this.userService.changeUser({username: this.user.username, password: this.user.password, email: this.user.email, profile: this.user.profile})?.subscribe(() =>
        this.userService.getUser()?.subscribe((user) => this.user = user)
      );
    }
  }
}

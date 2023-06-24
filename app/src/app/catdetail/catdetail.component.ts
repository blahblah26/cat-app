import { Component, Input } from '@angular/core';
import { CatService } from '../cat.service';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Cat } from '../cat';

@Component({
  selector: 'app-catdetail',
  templateUrl: './catdetail.component.html',
  styleUrls: ['./catdetail.component.css']
})
export class CatdetailComponent {
  @Input({required: true}) catName!: string;
  cat$: Observable<Cat> | undefined;

  constructor(private catService: CatService, private userService: UserService, private router: Router) {
    this.cat$ = this.catService.getCatByName(this.catName);
  }
}

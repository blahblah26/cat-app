import { Component, Input } from '@angular/core';
import { CatService } from '../cat.service';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { Cat } from '../cat';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-catlist',
  templateUrl: './catlist.component.html',
  styleUrls: ['./catlist.component.css']
})
export class CatlistComponent {
  @Input({required: true}) username!: string;
  catList$: Observable<Cat[]> | undefined;

  constructor(private catService: CatService, private userService: UserService, private router: Router) {
    this.catList$ = this.catService.getCatByUsername();
  }

}

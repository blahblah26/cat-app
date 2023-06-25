import { Component, Input, OnInit } from '@angular/core';
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
export class CatlistComponent implements OnInit {
  @Input({required: true}) username!: string;
  catList$: Observable<Cat[]> | undefined;
  newcat = {name: '', user_id: 0, picture: ''};

  constructor(private catService: CatService, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.catList$ = this.catService.getCatByUsername();
  }

  delete(cat: Cat) {
    this.catService.deleteCat(cat.name)?.subscribe(() => this.catList$ = this.catService.getCatByUsername());
  }

  create() {
    if (this.newcat) {
      this.catService.createCat({name: this.newcat.name, user_id: this.newcat.user_id, picture: this.newcat.picture})?.subscribe(() => {
        this.catList$ = this.catService.getCatByUsername();
      });
    }
  }

}

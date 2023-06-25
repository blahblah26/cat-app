import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CatService } from '../cat.service';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Cat } from '../cat';

@Component({
  selector: 'app-catdetail',
  templateUrl: './catdetail.component.html',
  styleUrls: ['./catdetail.component.css']
})
export class CatdetailComponent implements OnInit, OnDestroy{
  @Input() catName: string = '';
  cat?: Cat;
  catSub: Subscription | undefined;

  constructor(private catService: CatService, private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    if (!this.catName) {
      let tmp = this.route.snapshot.paramMap.get('name')?.toString();
      if (tmp) {
        this.catName = tmp;
      } else {
        this.catName = '';
      }
    }
    this.catSub = this.catService.getCatByName(this.catName)?.subscribe((cat) => this.cat = cat);
  }

  save() {
    if (this.cat) {
      this.catService.changeCat({picture: this.cat.picture}, this.cat.name)?.subscribe();
      this.catSub?.unsubscribe();
      this.catSub = this.catService.getCatByName(this.catName)?.subscribe((cat) => this.cat = cat);
    }
  }

  ngOnDestroy(): void {
      if (this.catSub) {
        this.catSub.unsubscribe();
      }
  }
}

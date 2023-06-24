import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatdetailComponent } from './catdetail.component';

describe('CatdetailComponent', () => {
  let component: CatdetailComponent;
  let fixture: ComponentFixture<CatdetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CatdetailComponent]
    });
    fixture = TestBed.createComponent(CatdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

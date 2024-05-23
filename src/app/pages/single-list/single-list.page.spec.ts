import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SingleListPage } from './single-list.page';

describe('SingleListPage', () => {
  let component: SingleListPage;
  let fixture: ComponentFixture<SingleListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayitemsComponent } from './displayitems.component';

describe('DisplayitemsComponent', () => {
  let component: DisplayitemsComponent;
  let fixture: ComponentFixture<DisplayitemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayitemsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayitemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

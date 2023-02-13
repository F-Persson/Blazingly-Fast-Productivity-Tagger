import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveTagComponent } from './save-tag.component';

describe('SaveTagComponent', () => {
  let component: SaveTagComponent;
  let fixture: ComponentFixture<SaveTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaveTagComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaveTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

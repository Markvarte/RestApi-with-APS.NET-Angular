import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateFlatsComponent } from './add-update-flats.component';

describe('AddUpdateFlatsComponent', () => {
  let component: AddUpdateFlatsComponent;
  let fixture: ComponentFixture<AddUpdateFlatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUpdateFlatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUpdateFlatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

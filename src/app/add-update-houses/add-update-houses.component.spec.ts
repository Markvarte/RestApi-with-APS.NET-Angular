import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateHousesComponent } from './add-update-houses.component';

describe('AddUpdateHousesComponent', () => {
  let component: AddUpdateHousesComponent;
  let fixture: ComponentFixture<AddUpdateHousesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUpdateHousesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUpdateHousesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

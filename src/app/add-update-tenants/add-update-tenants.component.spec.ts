import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateTenantsComponent } from './add-update-tenants.component';

describe('AddUpdateTenantsComponent', () => {
  let component: AddUpdateTenantsComponent;
  let fixture: ComponentFixture<AddUpdateTenantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUpdateTenantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUpdateTenantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

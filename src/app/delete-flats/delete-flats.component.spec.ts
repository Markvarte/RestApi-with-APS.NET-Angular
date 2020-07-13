import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteFlatsComponent } from './delete-flats.component';

describe('DeleteFlatsComponent', () => {
  let component: DeleteFlatsComponent;
  let fixture: ComponentFixture<DeleteFlatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteFlatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteFlatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

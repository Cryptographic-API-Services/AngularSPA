import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBillingInformationComponent } from './edit-billing-information.component';

describe('EditBillingInformationComponent', () => {
  let component: EditBillingInformationComponent;
  let fixture: ComponentFixture<EditBillingInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditBillingInformationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditBillingInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

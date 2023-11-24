import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordToolComponent } from './password-tool.component';

describe('PasswordToolComponent', () => {
  let component: PasswordToolComponent;
  let fixture: ComponentFixture<PasswordToolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasswordToolComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PasswordToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

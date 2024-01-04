import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBenchmarksComponent } from './user-benchmarks.component';

describe('UserBenchmarksComponent', () => {
  let component: UserBenchmarksComponent;
  let fixture: ComponentFixture<UserBenchmarksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserBenchmarksComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserBenchmarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

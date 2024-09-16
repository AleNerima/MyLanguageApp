import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherUsersProfileComponent } from './other-users-profile.component';

describe('OtherUsersProfileComponent', () => {
  let component: OtherUsersProfileComponent;
  let fixture: ComponentFixture<OtherUsersProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OtherUsersProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtherUsersProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

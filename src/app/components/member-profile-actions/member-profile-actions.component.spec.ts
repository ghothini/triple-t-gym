import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberProfileActionsComponent } from './member-profile-actions.component';

describe('MemberProfileActionsComponent', () => {
  let component: MemberProfileActionsComponent;
  let fixture: ComponentFixture<MemberProfileActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberProfileActionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberProfileActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

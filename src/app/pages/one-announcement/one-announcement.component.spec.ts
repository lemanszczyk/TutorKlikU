import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneAnnouncementComponent } from './one-announcement.component';

describe('OneAnnouncementComponent', () => {
  let component: OneAnnouncementComponent;
  let fixture: ComponentFixture<OneAnnouncementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OneAnnouncementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OneAnnouncementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

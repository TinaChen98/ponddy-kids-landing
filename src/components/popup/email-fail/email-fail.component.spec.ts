import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailFailComponent } from './email-fail.component';

describe('EmailFailComponent', () => {
  let component: EmailFailComponent;
  let fixture: ComponentFixture<EmailFailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailFailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailFailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

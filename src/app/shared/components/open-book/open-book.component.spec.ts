import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenBookComponent } from './open-book.component';

describe('OpenBookComponent', () => {
  let component: OpenBookComponent;
  let fixture: ComponentFixture<OpenBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenBookComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

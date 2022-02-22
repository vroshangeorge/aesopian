import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookblockComponent } from './bookblock.component';

describe('BookblockComponent', () => {
  let component: BookblockComponent;
  let fixture: ComponentFixture<BookblockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookblockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookblockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

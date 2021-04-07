import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestautocompleteComponent } from './testautocomplete.component';

describe('TestautocompleteComponent', () => {
  let component: TestautocompleteComponent;
  let fixture: ComponentFixture<TestautocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestautocompleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestautocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

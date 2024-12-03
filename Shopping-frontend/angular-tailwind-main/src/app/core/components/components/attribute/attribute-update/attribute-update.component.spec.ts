import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttributeUpdateComponent } from './attribute-update.component';

describe('AttributeUpdateComponent', () => {
  let component: AttributeUpdateComponent;
  let fixture: ComponentFixture<AttributeUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttributeUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttributeUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

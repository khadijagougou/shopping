import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SourcingCreateComponent } from './sourcing-create.component';

describe('SourcingCreateComponent', () => {
  let component: SourcingCreateComponent;
  let fixture: ComponentFixture<SourcingCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SourcingCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SourcingCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

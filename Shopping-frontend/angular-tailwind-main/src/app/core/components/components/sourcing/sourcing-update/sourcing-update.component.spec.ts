import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SourcingUpdateComponent } from './sourcing-update.component';

describe('SourcingUpdateComponent', () => {
  let component: SourcingUpdateComponent;
  let fixture: ComponentFixture<SourcingUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SourcingUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SourcingUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

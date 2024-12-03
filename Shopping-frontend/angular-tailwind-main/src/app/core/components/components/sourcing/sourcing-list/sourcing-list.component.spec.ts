import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SourcingListComponent } from './sourcing-list.component';

describe('SourcingListComponent', () => {
  let component: SourcingListComponent;
  let fixture: ComponentFixture<SourcingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SourcingListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SourcingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

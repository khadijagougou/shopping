import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamUpdateComponent } from './team-update.component';

describe('TeamUpdateComponent', () => {
  let component: TeamUpdateComponent;
  let fixture: ComponentFixture<TeamUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

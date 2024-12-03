import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForwardingAgentUpdateComponent } from './forwarding-agent-update.component';

describe('ForwardingAgentUpdateComponent', () => {
  let component: ForwardingAgentUpdateComponent;
  let fixture: ComponentFixture<ForwardingAgentUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForwardingAgentUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForwardingAgentUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForwardingAgentListComponent } from './forwarding-agent-list.component';

describe('ForwardingAgentListComponent', () => {
  let component: ForwardingAgentListComponent;
  let fixture: ComponentFixture<ForwardingAgentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForwardingAgentListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForwardingAgentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

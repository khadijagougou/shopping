import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForwardingAgentCreateComponent } from './forwarding-agent-create.component';

describe('ForwardingAgentCreateComponent', () => {
  let component: ForwardingAgentCreateComponent;
  let fixture: ComponentFixture<ForwardingAgentCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForwardingAgentCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForwardingAgentCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

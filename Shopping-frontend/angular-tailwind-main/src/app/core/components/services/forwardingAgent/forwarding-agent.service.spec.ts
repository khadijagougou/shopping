import { TestBed } from '@angular/core/testing';

import { ForwardingAgentService } from './forwarding-agent.service';

describe('ForwardingAgentService', () => {
  let service: ForwardingAgentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForwardingAgentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

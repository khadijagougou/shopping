import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransporterCreateComponent } from './transporter-create.component';

describe('TransporterCreateComponent', () => {
  let component: TransporterCreateComponent;
  let fixture: ComponentFixture<TransporterCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransporterCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransporterCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

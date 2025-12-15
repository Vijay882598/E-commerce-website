import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentCartComponent } from './payment-cart.component';

describe('PaymentCartComponent', () => {
  let component: PaymentCartComponent;
  let fixture: ComponentFixture<PaymentCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentCartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandinfoComponent } from './brandinfo.component';

describe('BrandinfoComponent', () => {
  let component: BrandinfoComponent;
  let fixture: ComponentFixture<BrandinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrandinfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrandinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopinglisteditComponent } from './shopinglistedit.component';

describe('ShopinglisteditComponent', () => {
  let component: ShopinglisteditComponent;
  let fixture: ComponentFixture<ShopinglisteditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopinglisteditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopinglisteditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

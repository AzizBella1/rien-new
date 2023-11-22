import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EreurComponent } from './ereur.component';

describe('EreurComponent', () => {
  let component: EreurComponent;
  let fixture: ComponentFixture<EreurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EreurComponent]
    });
    fixture = TestBed.createComponent(EreurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

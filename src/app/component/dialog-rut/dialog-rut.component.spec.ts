import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogRutComponent } from './dialog-rut.component';

describe('DialogRutComponent', () => {
  let component: DialogRutComponent;
  let fixture: ComponentFixture<DialogRutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogRutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogRutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDestinataryComponent } from './new-destinatary.component';

describe('NewDestinataryComponent', () => {
  let component: NewDestinataryComponent;
  let fixture: ComponentFixture<NewDestinataryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewDestinataryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewDestinataryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

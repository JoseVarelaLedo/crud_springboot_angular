import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarContactoComponent } from './actualizar-contacto.component';

describe('ActualizarContactoComponent', () => {
  let component: ActualizarContactoComponent;
  let fixture: ComponentFixture<ActualizarContactoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActualizarContactoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizarContactoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

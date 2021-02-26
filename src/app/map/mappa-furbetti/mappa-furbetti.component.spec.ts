import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MappaFurbettiComponent } from './mappa-furbetti.component';

describe('MappaFurbettiComponent', () => {
  let component: MappaFurbettiComponent;
  let fixture: ComponentFixture<MappaFurbettiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MappaFurbettiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MappaFurbettiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

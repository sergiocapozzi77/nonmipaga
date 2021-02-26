import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FurbettoInfoComponent } from './furbetto-info.component';

describe('FurbettoInfoComponent', () => {
  let component: FurbettoInfoComponent;
  let fixture: ComponentFixture<FurbettoInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FurbettoInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FurbettoInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

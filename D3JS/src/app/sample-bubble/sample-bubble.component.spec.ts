import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleBubbleComponent } from './sample-bubble.component';

describe('SampleBubbleComponent', () => {
  let component: SampleBubbleComponent;
  let fixture: ComponentFixture<SampleBubbleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SampleBubbleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SampleBubbleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

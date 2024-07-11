import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordGuessComponent } from './word-guess.component';

describe('WordGuessComponent', () => {
  let component: WordGuessComponent;
  let fixture: ComponentFixture<WordGuessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WordGuessComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WordGuessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

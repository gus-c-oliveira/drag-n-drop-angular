import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import {
  getAllElementsBySelector,
  getAllElementsTextContentBySelector,
  getElementBySelector,
  getElementTextContentBySelector,
} from './testing';

@Component({
  selector: 'gus-test-host',
  template: `
    <button>Click Me!</button>
    <span class="test-span">I'm a test component</span>
    <span class="test-span">and this is a test span</span>
  `,
})
class TestHostComponent {}

describe('Testing Utils', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestHostComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  describe('getElementBySelector', () => {
    it('should return the element given a fixture and corresponding css selector', () => {
      const buttonElement = getElementBySelector(fixture, 'button');
      expect(buttonElement).toBeTruthy();
    });
  });

  describe('getAllElementsBySelector', () => {
    it('should return all elements given a fixture and corresponding css selector', () => {
      const allSpans = getAllElementsBySelector(fixture, '.test-span');
      expect(allSpans).toBeTruthy();
      expect(allSpans.length).toEqual(2);
    });
  });

  describe('getElementTextContentBySelector', () => {
    it('should return the text content of an element given a fixture and corresponding selector', () => {
      const text = getElementTextContentBySelector(fixture, 'button');
      expect(text).toEqual('Click Me!');
    });
  });

  describe('getAllElementsTextContentBySelector', () => {
    it('should return the text content of an element given a fixture and corresponding selector', () => {
      const allTexts = getAllElementsTextContentBySelector(
        fixture,
        '.test-span'
      );
      expect(allTexts).toBeTruthy();
      expect(allTexts.length).toEqual(2);
      expect(allTexts[0]).toEqual(`I'm a test component`);
      expect(allTexts[1]).toEqual('and this is a test span');
    });
  });
});

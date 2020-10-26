import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

export const getElementBySelector = (
  fixture: ComponentFixture<any>,
  selector: string
) => {
  return fixture.debugElement.query(By.css(selector)).nativeElement;
};

export const getAllElementsBySelector = (
  fixture: ComponentFixture<any>,
  selector: string
) => {
  return fixture.debugElement
    .queryAll(By.css(selector))
    .map((item) => item.nativeElement);
};

export const getElementTextContentBySelector = (
  fixture: ComponentFixture<any>,
  selector: string
) => {
  return getElementBySelector(fixture, selector).textContent.trim();
};

export const getAllElementsTextContentBySelector = (
  fixture: ComponentFixture<any>,
  selector: string
) => {
  return getAllElementsBySelector(fixture, selector).map((item) =>
    item.textContent.trim()
  );
};

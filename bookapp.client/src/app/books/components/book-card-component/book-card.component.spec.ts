import { ComponentFixture, TestBed } from "@angular/core/testing";
import { BookCardComponent } from "./book-card.component";

describe('BookCardcomponent', () => {
  let component: BookCardComponent;
  let fixture: ComponentFixture<BookCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BookCardComponent,
      ]
    });

    fixture = TestBed.createComponent(BookCardComponent);
    component = fixture.componentInstance;
  })

  it('Should correct render text from inputs', () => {
    // arrange
    component.title = 'test';
    component.author = 'test';

    // act
    fixture.detectChanges();

    // assert
    const h3 = fixture.nativeElement.querySelector('h3');
    const p = fixture.nativeElement.querySelector('p');

    expect(h3.textContent).toContain('test');
    expect(p.textContent).toContain('test');
  });

  it('Should emit cardClickEvent', () => {
    // arrange
    spyOn(component.cardClickEvent, 'emit');
    const button = fixture.nativeElement.querySelector('.clickable-card');

    // act
    button.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    // assert
    expect(component.cardClickEvent.emit).toHaveBeenCalled();
  });
});

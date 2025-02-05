import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginationComponent } from './pagination.component';
import { By } from '@angular/platform-browser';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginationComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render current page', () => {
    // arrange
    component.page = 1;

    // act
    fixture.detectChanges();

    // assert
    const button = fixture.debugElement.query(By.css('.current-page-button'));
    expect(button).not.toBeNull()
  });

  const cases = [
    { currentPage: 1, lastPage: 3, expectedButtonsCount: 3, },
    { currentPage: 1, lastPage: 2, expectedButtonsCount: 2, },
    { currentPage: 5, lastPage: 12, expectedButtonsCount: 7, },
    { currentPage: 1, lastPage: 12, expectedButtonsCount: 4, },
    { currentPage: 12, lastPage: 12, expectedButtonsCount: 4, },
  ]

  cases.forEach(({ currentPage, lastPage, expectedButtonsCount }) => {
    it(`should correct render pages (current page=${currentPage}, last page=${lastPage}, expected count of buttons=${expectedButtonsCount})`, () => {
      // arrange
      component.page = currentPage;
      component.lastPage = lastPage;

      // act
      fixture.detectChanges();

      // assert
      const buttons = fixture.debugElement.queryAll(By.css('.pagination-button'));

      expect(buttons.length).toEqual(expectedButtonsCount);
    });
  });

  it('button click should trigger buttonClickEvent', () => {
    // arrange
    spyOn(component.buttonClickEvent, 'emit');

    component.page = 1;
    component.lastPage = 5;
    fixture.detectChanges();

    // act
    const buttons = fixture.debugElement.queryAll(By.css('.pagination-button'));
    buttons.forEach(b => {
      b.nativeElement.dispatchEvent(new Event('click'));
    });

    // assert
    expect(component.buttonClickEvent.emit).toHaveBeenCalledTimes(4);
  });
});

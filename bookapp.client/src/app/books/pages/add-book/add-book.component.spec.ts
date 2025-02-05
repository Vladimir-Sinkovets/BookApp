import { ComponentFixture, TestBed } from "@angular/core/testing";
import { AddBookComponent } from "./add-book.component";
import { TagApiService } from "../../services/tag-api.service";
import { Router } from "@angular/router";
import { BookApiService } from "../../services/book-api.service";
import { of } from "rxjs";
import { By } from "@angular/platform-browser";
import { TagButtonComponent } from "../../components/tag-component/tag-button.component";

describe('AddBookComponent', () => {
  let component: AddBookComponent;
  let bookApi: jasmine.SpyObj<BookApiService>;
  let tagApi: jasmine.SpyObj<TagApiService>;
  let router: jasmine.SpyObj<Router>;
  let fixture: ComponentFixture<AddBookComponent>;

  const testFormValue = {
    title: 'test',
    description: 'test',
    author: 'test',
    fragment: 'test',
    selectedTag: 'test',
  };

  beforeEach(() => {
    bookApi = jasmine.createSpyObj('BookApiService', ['addBook']);
    tagApi = jasmine.createSpyObj('TagApiService', ['getTags']);
    router = jasmine.createSpyObj('Router', ['navigateByUrl']);

    TestBed.configureTestingModule({
      providers: [
        AddBookComponent,
        { provide: BookApiService, useValue: bookApi, },
        { provide: TagApiService, useValue: tagApi, },
        { provide: Router, useValue: router, },
      ]
    });

    fixture = TestBed.createComponent(AddBookComponent);
    component = fixture.componentInstance;

    tagApi.getTags.and.returnValue(of({
      isSucceeded: true,
      message: 'Success',
      data: ['tag_0', 'tag_1', 'tag_2',],
    }));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shoud set tags on init', () => {
    // arrange

    // act
    component.ngOnInit();
    fixture.detectChanges();

    // assert
    expect(component.tags.length).toEqual(3);
    const tagElements = fixture.debugElement.queryAll(By.css('option'))
    expect(tagElements.length).toEqual(4);
  });

  it('should add book', () => {
    // arrange
    bookApi.addBook.and.returnValue(of({
      isSucceeded: true,
      message: 'Success',
      data: { id: 1, title: 'test', author: 'test', description: 'test', fragment: 'test', tags: ['test'] },
    }));

    component.form.setValue(testFormValue);

    // act
    component.handleSubmit();

    // assert
    expect(bookApi.addBook).toHaveBeenCalled();
  });

  it('should redirect to a new book page', () => {
    // arrange
    bookApi.addBook.and.returnValue(of({
      isSucceeded: true,
      message: 'Success',
      data: { id: 1, title: 'test', author: 'test', description: 'test', fragment: 'test', tags: ['test'] },
    }));

    component.form.setValue(testFormValue);

    // act
    component.handleSubmit();

    // assert
    expect(router.navigateByUrl).toHaveBeenCalledWith('/book/get/1');
  });

  it('should display an error message when an incorrect response is received', () => {
    // arrange
    bookApi.addBook.and.returnValue(of({
      isSucceeded: false,
      message: 'Erorr',
      data: undefined,
    }));

    component.form.setValue(testFormValue);

    // act
    component.handleSubmit();
    fixture.detectChanges();

    // assert
    const errorElement = fixture.nativeElement.querySelector('.error-message');
    expect(errorElement.textContent).toContain('Erorr');
  });

  it('should add tag by form', () => {
    // arrange
    component.form.setValue(testFormValue);

    // act
    const addTagButton = fixture.nativeElement.querySelector('button.form-button');
    addTagButton.dispatchEvent(new Event('click'));

    fixture.detectChanges();

    // assert
    expect(component.addedTags).toContain('test');
  });

  it('should render added tags', () => {
    // arrange
    component.addedTags = ['test_0', 'test_1', 'test_2', 'test_3',]

    // act
    fixture.detectChanges();

    // assert
    const tags = fixture.nativeElement.querySelectorAll('app-tag-button');

    expect(tags.length).toEqual(4);
  });

  it('tag click should remove added tag', () => {
    // arrange
    component.addedTags = [ 'test_0', 'test_1', 'test_2', 'test_3', ];

    // act
    fixture.detectChanges();
    component.tagClickHandler(component.addedTags[0])
    fixture.detectChanges();

    // assert
    const tags = fixture.nativeElement.querySelectorAll('app-tag-button');
    expect(tags.length).toEqual(3);
    expect(component.addedTags.length).toEqual(3);
  });
});

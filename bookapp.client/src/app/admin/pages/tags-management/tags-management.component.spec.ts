import { ComponentFixture, TestBed } from "@angular/core/testing";
import { TagsManagementComponent } from "./tags-management.component";
import { of } from "rxjs";
import { TagApiService } from "../../../shared/services/tag-api/tag-api.service";

describe('TagsManagementComponent', () => {
  let component: TagsManagementComponent;
  let tagApi: jasmine.SpyObj<TagApiService>;

  let fixture: ComponentFixture<TagsManagementComponent>;

  beforeEach(() => {
    tagApi = jasmine.createSpyObj(TagApiService, ['getTags', 'deleteTag', 'addTag']);

    TestBed.configureTestingModule({
      providers: [
        TagsManagementComponent,
        { provide: TagApiService, useValue: tagApi },
      ],
    });

    fixture = TestBed.createComponent(TagsManagementComponent);
    component = fixture.componentInstance;
  });

  it('Should load tags on the initialization', () => {
    // arrange
    tagApi.getTags.and.returnValue(of({
      isSucceeded: true,
      message: '',
      data: [
        'test_0',
        'test_1',
      ]
    }));

    // act
    component.ngOnInit();

    // assert
    expect(component.tags).toEqual(['test_0', 'test_1',]);
  });

  it('Should load tags on the initialization', () => {
    // arrange
    tagApi.getTags.and.returnValue(of({
      isSucceeded: true,
      message: '',
      data: [
        'test_0',
        'test_1',
      ]
    }));

    // act
    component.ngOnInit();

    // assert
    expect(component.tags).toEqual(['test_0', 'test_1',]);
  });

  it('Should show error message on the initialization', () => {
    // arrange
    tagApi.getTags.and.returnValue(of({
      isSucceeded: false,
      message: 'Server error',
      data: undefined
    }));

    // act
    component.ngOnInit();
    fixture.detectChanges();

    // assert
    const errorMessage = fixture.nativeElement.querySelector('.error-message');

    expect(errorMessage.textContent).toContain('Server error');
  });

  it('Click on tag should delete the tag', () => {
    // arrange
    spyOn(window, 'confirm').and.returnValue(true);

    tagApi.deleteTag.and.returnValue(of({
      isSucceeded: true,
      message: '',
      data: undefined,
    }));

    tagApi.getTags.and.returnValue(of({
      isSucceeded: true,
      message: '',
      data: [
        'test_0',
        'test_1',
      ],
    }));

    // act
    component.tagClickHandler('test');

    // assert
    expect(tagApi.deleteTag).toHaveBeenCalled();
  });

  it('Click on add button should add new tag', () => {
    // arrange
    spyOn(window, 'confirm').and.returnValue(true);

    tagApi.addTag.and.returnValue(of({
      isSucceeded: true,
      message: '',
      data: {
        id: 2,
        name: 'test_1',
      },
    }));

    tagApi.getTags.and.returnValue(of({
      isSucceeded: true,
      message: '',
      data: [
        'test_0',
        'test_1',
      ],
    }));

    component.form.setValue({
      newTag: 'test',
    });

    // act
    component.addButtonClickHandler();

    // assert
    expect(tagApi.addTag).toHaveBeenCalled();
  });
});

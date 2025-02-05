import { ComponentFixture, TestBed } from "@angular/core/testing";
import { TagButtonComponent } from "./tag-button.component";

describe('TagButtonComponent', () => {
  let component: TagButtonComponent;
  let fixture: ComponentFixture<TagButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TagButtonComponent,
      ]
    });

    fixture = TestBed.createComponent(TagButtonComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render tag name', () => {
    // arrange
    component.tag = 'test_tag';

    // act
    fixture.detectChanges();

    // assert
    const tag = fixture.nativeElement.querySelector('.tag-button');

    expect(tag.textContent).toContain('test_tag');
  });

  it('button should trigger clickEvent', () => {
    // arrange
    spyOn(component.clickEvent, 'emit');

    // act
    const button = fixture.nativeElement.querySelector('.tag-button');
    button.dispatchEvent(new Event('click'));
    // assert

    expect(component.clickEvent.emit).toHaveBeenCalled();
  });
});

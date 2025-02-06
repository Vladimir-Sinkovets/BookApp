import { provideHttpClient } from "@angular/common/http";
import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { TagApiService } from "./tag-api.service";
import { environment } from "../../../environments/environment";

describe('TagApiService', () => {
  let service: TagApiService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TagApiService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(TagApiService);
    httpController = TestBed.inject(HttpTestingController);
  })

  it('getTags() should send get request', () => {
    // arrange

    // act
    service.getTags()
      .subscribe();

    const req = httpController.expectOne(`${environment.apiUrl}/api/tag/all`);

    // assert
    expect(req.request.method).toEqual('GET');
  });

  it('getTags() should return tags', () => {
    // arrange
    const expectedTags = [  'test_0', 'test_1', 'test_2', ];
    const tags = [
      { id: 1, name: 'test_0', },
      { id: 2, name: 'test_1', },
      { id: 3, name: 'test_2', },
    ];
    // act
    service.getTags()
      .subscribe(response => {
        // assert
        expect(response.isSucceeded).toBeTrue();
        expect(response.message).toEqual('success');
        expect(response.data).toEqual(expectedTags);
      });

    const req = httpController.expectOne(`${environment.apiUrl}/api/tag/all`);

    req.flush(tags, { status: 200, statusText: 'OK' });
  });
});

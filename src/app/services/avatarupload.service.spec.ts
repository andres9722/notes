import { TestBed, inject } from '@angular/core/testing';

import { AvataruploadService } from './avatarupload.service';

describe('AvataruploadService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AvataruploadService]
    });
  });

  it('should be created', inject([AvataruploadService], (service: AvataruploadService) => {
    expect(service).toBeTruthy();
  }));
});

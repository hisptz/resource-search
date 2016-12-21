/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ResourceExtensionService } from './resource-extension.service';

describe('Service: ResourceExtension', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResourceExtensionService]
    });
  });

  it('should ...', inject([ResourceExtensionService], (service: ResourceExtensionService) => {
    expect(service).toBeTruthy();
  }));
});

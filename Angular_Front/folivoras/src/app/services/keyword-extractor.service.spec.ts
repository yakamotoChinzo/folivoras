/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { KeywordExtractorService } from './keyword-extractor.service';

describe('Service: KeywordExtractor', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KeywordExtractorService]
    });
  });

  it('should ...', inject([KeywordExtractorService], (service: KeywordExtractorService) => {
    expect(service).toBeTruthy();
  }));
});

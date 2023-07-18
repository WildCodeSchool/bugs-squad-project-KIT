import { TestBed } from '@angular/core/testing';

import { CatchErrorInterceptorInterceptor } from './catch-error-interceptor.interceptor';

describe('CatchErrorInterceptorInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [CatchErrorInterceptorInterceptor],
    })
  );

  it('should be created', () => {
    const interceptor: CatchErrorInterceptorInterceptor = TestBed.inject(CatchErrorInterceptorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});

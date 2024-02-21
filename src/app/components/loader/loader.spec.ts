import { LoaderService } from './loader.service';

describe('Checking in loader service', () => {
  let service: LoaderService;

  beforeEach(() => service = new LoaderService())

  it('should be hidden', () => {
    expect(service.getLoading()).toBe(false);
  });

  it('should be displayed', () => {
    service.show();
    expect(service.getLoading())
      .withContext('Loader component must be show')
      .toBe(true);
  });

  it('should be hide', () => {
    service.hide();
    expect(service.getLoading())
      .withContext('Loader component must be hidden')
      .toBe(false);
  });
});

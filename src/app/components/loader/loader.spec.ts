import { LoaderService } from './loader.service';

describe('Checking in loader service', () => {
  let loader: LoaderService;

  beforeEach(() => loader = new LoaderService())

  it('loader should be hidden', () => {
    expect(loader.getLoading().getValue()).toBe(false);
  });

  it('loader should be displayed', () => {
    loader.show();
    expect(loader.getLoading().getValue())
      .withContext('Loader component must be show')
      .toBe(true);
  });

  it('loader should be hide', () => {
    loader.hide();
    expect(loader.getLoading().getValue())
      .withContext('Loader component must be hidden')
      .toBe(false);
  });
});

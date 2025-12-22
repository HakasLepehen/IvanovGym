import { BoolToStringPipe } from './bool-to-string.pipe';

describe('BoolToStringPipe', () => {
  it('create an instance', () => {
    const pipe = new BoolToStringPipe();
    expect(pipe).toBeTruthy();
  });
});

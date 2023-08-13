import { NameConcatPipe } from './name-concat.pipe';

describe('NameConcatPipe', () => {
  it('create an instance', () => {
    const pipe = new NameConcatPipe();
    expect(pipe).toBeTruthy();
  });
});

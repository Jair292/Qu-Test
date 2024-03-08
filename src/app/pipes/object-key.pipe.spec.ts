import { ObjectKeysPipe } from "./object-key.pipe";


describe('ObjectKeysPipe', () => {
  let pipe: ObjectKeysPipe;

  beforeEach(() => {
    pipe = new ObjectKeysPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform object keys', () => {
    const obj = { key1: 'value1', key2: 'value2', key3: 'value3' };
    const transformed = pipe.transform(obj);
    expect(transformed).toEqual(['key1', 'key2', 'key3']);
  });

  it('should handle empty object', () => {
    const obj = {};
    const transformed = pipe.transform(obj);
    expect(transformed).toEqual([]);
  });

  it('should handle null input', () => {
    const obj = null;
    const transformed = pipe.transform(obj);
    expect(transformed).toEqual([]);
  });

  it('should handle undefined input', () => {
    const obj = undefined;
    const transformed = pipe.transform(obj);
    expect(transformed).toEqual([]);
  });

  it('should handle non-object input', () => {
    const obj = 'not an object';
    const transformed = pipe.transform(obj);
    expect(transformed).toEqual([]);
  });
});
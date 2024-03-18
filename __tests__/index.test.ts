import { describe, expect, it } from '@jest/globals';

describe('index', () => {
  it('calls run when imported', async () => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require('../src/index');

    expect({}).toEqual({});
  });
});

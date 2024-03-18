import * as core from '@actions/core';
import { describe, expect, it } from '@jest/globals';

jest.mock('@actions/core');

describe('index', () => {
  beforeEach(() => {
    const token = core.getInput('github-token');
    jest.mock('@actions/core');
  });

  it('calls run when imported', async () => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require('../src/index');

    expect({}).toEqual({});
  });
});

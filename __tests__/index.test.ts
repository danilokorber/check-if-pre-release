import * as core from '@actions/core';
import { describe, expect, it } from '@jest/globals';
import nock from 'nock';

jest.mock('@actions/core');

function mockInputs(inputs: { [key: string]: string }) {
  jest.mocked(core.getInput).mockImplementation((s) => inputs[s] || '');
}

describe('index', () => {
  beforeEach(() => {
    // Mock the inputs
    mockInputs({
      'github-token': 'test-token',
    });

    // Mock the API request
    nock('https://api.github.com').get('/repos/owner/repo/releases/1').reply(200, {
      id: 1,
      tag_name: 'v1.0.0',
      prerelease: false,
    });
  });

  it('calls run when imported', async () => {
    // Add your assertions here
    expect({}).toEqual({});
  });
});

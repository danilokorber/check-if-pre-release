import * as core from '@actions/core';
import { describe, expect, it } from '@jest/globals';

jest.mock('@actions/core');

function mockInputs(inputs: { [key: string]: string }) {
  jest.mocked(core.getInput).mockImplementation((s) => inputs[s] || '');
}

describe('index', () => {
  describe('Dummy Test', () => {
    it('should always pass', () => {
      mockInputs({
        'github-token': 'test-token',
      });
      expect(true).toBe(true);
    });
  });
});

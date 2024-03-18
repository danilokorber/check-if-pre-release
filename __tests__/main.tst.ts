// import * as core from '@actions/core';
// import * as github from '@actions/github';
// import * as main from '../src/main';

// import { beforeEach, describe, expect, it, jest } from '@jest/globals';

// // Mock the GitHub Actions core library
// jest.mock('@actions/core');
// jest.mock('@actions/github');

// describe('run', () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   it('should log the current release is a pre-release', async () => {
//     // Mock the inputs
//     jest.spyOn(core, 'getInput').mockReturnValueOnce('github-token');

//     // Mock the GitHub API responses
//     const release = {
//       id: 123,
//       prerelease: true,
//     };
//     const releases = [
//       {
//         id: 456,
//         prerelease: true,
//         tag_name: 'v1.0.0',
//       },
//     ];
//     github.context.payload.release = release;
//     (github.getOctokit as jest.Mock).mockReturnValueOnce({
//       rest: {
//         repos: {
//           getRelease: jest.fn().mockResolvedValueOnce({ data: { prerelease: true } } as unknown), // Explicitly type the response as unknown
//           listReleases: jest.fn().mockResolvedValueOnce({ data: releases }),
//         },
//       },
//     });

//     // Run the function
//     await main.run();

//     // Verify the console output
//     expect(console.log).toHaveBeenCalledWith('The current release is a pre-release');
//     expect(console.log).toHaveBeenCalledWith('The previous pre-release was v1.0.0');

//     // Verify the GitHub API calls
//     expect(github.getOctokit).toHaveBeenCalledWith('github-token');
//     expect(github.getOctokit().rest.repos.getRelease).toHaveBeenCalledWith({
//       owner: 'owner',
//       repo: 'repo',
//       release_id: 123,
//     });
//     expect(github.getOctokit().rest.repos.listReleases).toHaveBeenCalledWith({
//       owner: 'owner',
//       repo: 'repo',
//     });

//     // Verify the core library calls
//     expect(core.getInput).toHaveBeenCalledWith('github-token');
//     expect(core.setFailed).not.toHaveBeenCalled();
//   });

//   it('should log the current release is not a pre-release', async () => {
//     // Mock the inputs
//     jest.spyOn(core, 'getInput').mockReturnValueOnce('github-token');

//     // Mock the GitHub API responses
//     const release = {
//       id: 123,
//       prerelease: false,
//     };
//     const releases = [
//       {
//         id: 456,
//         prerelease: false,
//         tag_name: 'v1.0.0',
//       },
//     ];
//     jest.spyOn(github, 'getOctokit').mockReturnValueOnce({
//       rest: {
//         repos: {
//           getRelease: jest.fn().mockResolvedValueOnce({ data: { prerelease: false } }),
//           listReleases: jest.fn().mockResolvedValueOnce({ data: releases }),
//         },
//       },
//     });

//     // Run the function
//     await main.run();

//     // Verify the console output
//     expect(console.log).toHaveBeenCalledWith('The current release is not a pre-release');
//     expect(console.log).toHaveBeenCalledWith('The previous release was v1.0.0');

//     // Verify the GitHub API calls
//     expect(github.getOctokit).toHaveBeenCalledWith('github-token');
//     expect(github.getOctokit().rest.repos.getRelease).toHaveBeenCalledWith({
//       owner: 'owner',
//       repo: 'repo',
//       release_id: 123,
//     });
//     expect(github.getOctokit().rest.repos.listReleases).toHaveBeenCalledWith({
//       owner: 'owner',
//       repo: 'repo',
//       per_page: 2,
//     });

//     // Verify the core library calls
//     expect(core.getInput).toHaveBeenCalledWith('github-token');
//     expect(core.setFailed).not.toHaveBeenCalled();
//   });

//   it('should throw an error if the action is not triggered by a release', async () => {
//     // Mock the inputs
//     core.getInput.mockReturnValueOnce('github-token');

//     // Mock the GitHub API responses
//     github.context.payload.release = undefined;

//     // Run the function
//     await main.run();

//     // Verify the console output
//     expect(console.log).not.toHaveBeenCalled();

//     // Verify the GitHub API calls
//     expect(github.getOctokit).not.toHaveBeenCalled();

//     // Verify the core library calls
//     expect(core.getInput).toHaveBeenCalledWith('github-token');
//     expect(core.setFailed).toHaveBeenCalledWith('This action can only be triggered by a release');
//   });

//   it('should set the workflow run as failed if an error occurs', async () => {
//     // Mock the inputs
//     core.getInput.mockReturnValueOnce('github-token');

//     // Mock the GitHub API responses
//     const release = {
//       id: 123,
//       prerelease: true,
//     };
//     github.context.payload.release = release;
//     github.getOctokit.mockReturnValueOnce({
//       rest: {
//         repos: {
//           getRelease: jest.fn().mockRejectedValueOnce(new Error('API error')),
//         },
//       },
//     });

//     // Run the function
//     await main.run();

//     // Verify the console output
//     expect(console.log).not.toHaveBeenCalled();

//     // Verify the GitHub API calls
//     expect(github.getOctokit).toHaveBeenCalledWith('github-token');
//     expect(github.getOctokit().rest.repos.getRelease).toHaveBeenCalledWith({
//       owner: 'owner',
//       repo: 'repo',
//       release_id: 123,
//     });

//     // Verify the core library calls
//     expect(core.getInput).toHaveBeenCalledWith('github-token');
//     expect(core.setFailed).toHaveBeenCalledWith('API error');
//   });
// });

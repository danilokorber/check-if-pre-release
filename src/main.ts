import * as core from '@actions/core';
import * as github from '@actions/github';

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    const token = core.getInput('github-token');
    const octokit = github.getOctokit(token);

    // Get the current release
    const { owner, repo } = github.context.repo;
    const release = github.context.payload.release;
    if (!release) {
      throw new Error('This action can only be triggered by a release');
    }

    // Check if the release is a pre-release
    const {
      data: { prerelease },
    } = await octokit.rest.repos.getRelease({
      owner,
      repo,
      release_id: release.id,
    });

    if (prerelease) {
      console.log('The current release is a pre-release');
      const { data: releases } = await octokit.rest.repos.listReleases({
        owner,
        repo,
      });
      const previousPreRelease = releases.find((r) => r.prerelease && r.id !== release.id);
      if (previousPreRelease) {
        console.log(`The previous pre-release was ${previousPreRelease.tag_name}`);
      } else {
        console.log('There was no previous pre-release');
      }
    } else {
      console.log('The current release is not a pre-release');
      const { data: releases } = await octokit.rest.repos.listReleases({
        owner,
        repo,
        per_page: 2,
      });
      const previousRelease = releases.find((r) => !r.prerelease && r.id !== release.id);
      if (previousRelease) {
        console.log(`The previous release was ${previousRelease.tag_name}`);
      } else {
        console.log('There was no previous release');
      }
    }
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message);
  }
}

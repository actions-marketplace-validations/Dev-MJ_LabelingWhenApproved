const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
	try {
        const token = core.getInput('github-token');
        const labelName = core.getInput('label-name');
        
        const context = github.context;
        const octokit = github.getOctokit(token);

        const pullRequestNumber = context.payload.pull_request.number;

        var reviews = await octokit.request(`GET /repos/{owner}/{repo}/pulls/${pullRequestNumber}/reviews`, {
          ...context.repo
        });

        const approvedReviews = reviews.data.filter(review => review.state === 'APPROVED');
        const numberOfApprove = core.getInput('approves-number');

        if (approvedReviews.length >= numberOfApprove) {
          await octokit.rest.issues.addLabels({
            owner: context.repo.owner,
            repo: context.repo.repo,
            issue_number: pullRequestNumber,
            labels: [labelName]
          });
        }
      } catch (error) {
        core.setFailed(error.message);
      }
}

run();
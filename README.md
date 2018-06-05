# Leo Platform Quick Start Guide

### Step 1: Install required 3rd party tools

1. [Install the aws-cli toolkit](http://docs.aws.amazon.com/cli/latest/userguide/installing.html)
1. [Configure the aws-cli tools](http://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html)
1. [Install node](https://nodejs.org/en/)

### Step 2: Install the LEO Platform

##### Notes:
In the following steps, make sure you have selected either “US West (Oregon)” or “US East (N. Virginia)” as your region in AWS. Those are the only two supported regions.

##### Create a “Federated Identity”
1. In AWS, Go to Cognito
1. Click on “Manage Identity Pools”
1. If you already have an Identity pool, click on the name and jump to step 7.
1. If you don’t already have an identity, click “Create new Identity pool”.
1. Give the pool a name. (e.g. Leo) and click “Create Pool”.
1. On the next page, click “Allow”.
1. Click on “Sample Code”.
1. Copy on the Identity Pool ID to a text document. You’ll need this when creating LeoPlatform stack below.

##### Install the Leo Platform stack
1. Go to CloudFormation
1. Click “Create Stack”
1. Paste this cloudformation link (`https://s3-us-west-2.amazonaws.com/leo-cli-publishbucket-1rgojx1iw5yq9/quickstart/release/cloudformation-latest.json`) into the “Specify an Amazon S3 template URL” field and click “Next”.
1. Specify a stack name (e.g. LeoPlatformDev, LeoPlatformStage) in the “Stack name” input field.
1. Paste your Cognito ID from the “Create a Federated Identity” section above into the CognitoId input field, then click “Next”.
1. On the Options page, Click “Next”.
1. Select the checkmark that says: “I acknowledge that AWS CloudFormation might create IAM resources.”, then click “Create”.
1. Done. It will take several (5-10) minutes for the stack to be created.

### Step 3: Create a “quickstart” project
In your command line:
1. Install the LEO CLI: `npm install leo-cli -g`
1. Create a new project with the LEO CLI Quickstart: `leo-cli create quickstart <projectName>`

### Step 4: Test your new project
Browse to the bots/sampleload directory in your new project and run a test.
1. `cd <projectName>`
1. `cd bots/sampleload`
1. `npm test`

---

# Support
Want to hire an expert, or need technical support? Reach out to the Leo team: https://leoinsights.com/contact

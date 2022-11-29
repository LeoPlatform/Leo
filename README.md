# Leo Platform Quick Start Guide

### Step 1: Install required 3rd party tools

1. [Install the aws-cli toolkit](http://docs.aws.amazon.com/cli/latest/userguide/installing.html)
1. [Configure the aws-cli tools](http://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html)
1. [Install node](https://nodejs.org/en/)

### Step 2: Install the LEO Platform

##### Notes:
In the following steps, make sure you have selected either “US West (Oregon)” or “US East (N. Virginia)” as your region in AWS. Those are the only two supported regions.

##### Install the Leo Platform stack
1. Make sure your selected region is one of: US West (Oregon) or US East (N. Virginia).
1. Go to CloudFormation
1. Click “Create Stack”
1. Paste this cloudformation link (`https://s3.amazonaws.com/leo-cli-publishbucket-abb4i613j9y9/leo/1.0.1/cloudformation-1668810052558.json`) into the “Specify an Amazon S3 template URL” field and click “Next”.
1. Specify a stack name (e.g. LeoPlatformDev, LeoPlatformStage) in the “Stack name” input field.
1. Leave the Identity Pool ID blank. (In the future, we will support using an existing cognito pool. If you use an existing one here, you will have to manually setup auth roles).
1. Fill out the `Logins` 
1. On the Options page, Click “Next”.
1. Select the checkmark that says: “I acknowledge that AWS CloudFormation might create IAM resources.”, then click “Create”.
1. Done. It will take several (5-10) minutes for the stacks to be created.

### Step 3: Create a “quickstart” project
In your command line:
1. Install the LEO CLI: `npm install leo-cli -g`
1. Create a new project with the LEO CLI Quickstart: `leo-cli create quickstart <projectName>`

### Step 4: Test your new project
Browse to the bots/sampleload directory in your new project and run a test.
1. `cd <projectName>`
1. `cd bots/sampleload`
1. `npm test`

### Step 5: Get the URL for Botmon
1. In AWS, Go to API Gateway
1. Click on the link for the botmon for your stack. It will be formatted like this: **<stack_name>-Botmon-<random_chars>**
1. In the left-side navigation panel, click on “Dashboard”.
1. The page that loads will have a link at the top. The link for Botmon will say: Invoke this API at: <url>

# Entities and Aggregations
From a microservice, run: `leo-cli create aggregations`. 4 bots and a cloudformation will be created that run from the bots created in the quickstart above.
Documentation for Entities and Aggregation bots can be found here: https://github.com/LeoPlatform/connectors/tree/master/entity-table

---

# Support
Want to hire an expert, or need technical support? Reach out to the Leo team: https://leoinsights.com/contact

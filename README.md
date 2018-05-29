# Leo Platform Quick Start Guide

### Step 1: Install required 3rd party tools

1. [Install the aws-cli toolkit](http://docs.aws.amazon.com/cli/latest/userguide/installing.html)
1. [Configure the aws-cli tools](http://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html)
1. [Install node](https://nodejs.org/en/)

### Step 2: Install the LEO Platform

1. [Install the LEO Bus](#install-the-leo-bus)
1. Install the LEO CLI: `npm install leo-cli -g`
1. Create a new project with the LEO CLI Quickstart: `leo-cli create quickstart <projectName>`

### Step 3: Test your new project
Browse to the bots/sampleload directory in your new project and run a test.
1. `cd <projectName>`
1. `cd bots/sampleload`
1. `npm test`

#### Install the Leo Bus
##### LEO Bus cloudformation links
(by region)
 * us-west-2: https://s3-us-west-2.amazonaws.com/leo-cli-publishbucket-1rgojx1iw5yq9/leo-bus/2.0.1/cloudformation.json
 * us-east-1: https://s3.amazonaws.com/leo-cli-publishbucket-166d6oumno1f5/leo-bus/2.0.1/cloudformation.json

##### Quick setup instructions
1. Go to CloudFormation
1. Click “Create Stack”
1. Paste the cloudformation link for your selected region (above) into the “Specify an Amazon S3 template URL” field and click “Next”.
1. Specify a Bus stack name (e.g. DevBus) and click “Next”.
1. On the Options page, Click “Next”.
1. Select the checkmark that says: “I acknowledge that AWS CloudFormation might create IAM resources.”, then click “Create”.
1. Done. It will take several minutes for the stack to be created.

##### Full instructions
Full instructions and screenshots for setting up the LEO Bus can be found at:
https://github.com/LeoPlatform/bus

# Support
Want to hire an expert, or need technical support? Reach out to the Leo team: https://leoinsights.com/contact
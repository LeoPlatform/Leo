import * as cdk from "aws-cdk-lib";
import * as rstreams from "../src";

import { Match, Template } from "aws-cdk-lib/assertions";
import { Construct } from "constructs";

const randomString = require("random-string");

export class MyLeoStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const TrustedAWSPrinciples = [randomString(), randomString()];

    const platform = new rstreams.LeoPlatform(this, "MyLeoStack", {
      baseParameters: {
        Environment: "dev",
        InputCognitoId: "",
        TrustedAWSPrinciples,
        QueueReplicationDestinationLeoBotRoleARNs: [],
        QueueReplicationMapping: "[]",
      },
      parameterGroups: {
        lambdaProps: {},
        leoArchiveProps: {},
        leoCronProps: {},
        leoEventProps: {},
        leoSettingsProps: {},
        leoStreamProps: {},
        leoSystemProps: {},
      },
    });
  }
}

test("can create rstreams stack", () => {
  const app = new cdk.App();

  const stack = new MyLeoStack(app, "MyLeoStack");

  const template = Template.fromStack(stack);
  const principles = template.findParameters("TrustedAWSPrinciples");

  // console.log({
  //   template: template.toJSON(),
  //   principles,
  //   other: template.findResources("*", {
  //     principles: "TrustedAWSPrinciples",
  //   }),
  // });
  template.resourcePropertiesCountIs("AWS::IAM::Role", {}, 1);

  const parameterKeys = Object.keys(template.toJSON().Parameters);
  expect(parameterKeys.length).toBe(42);
});

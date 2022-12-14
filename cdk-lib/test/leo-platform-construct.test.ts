import * as cdk from "aws-cdk-lib";
import * as leoPlatform from "../src";

import { Template } from "aws-cdk-lib/assertions";
import { Construct } from "constructs";

/* eslint-disable-next-line */
const randomString = require("random-string");

export class MyLeoStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const TrustedAWSPrinciples = [randomString(), randomString()];

    new leoPlatform.LeoPlatform(this, "MyLeoStack", {
      templateFile: "../cloudformation.json",
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

test("can create LeoPlatform stack", () => {
  const app = new cdk.App();

  const stack = new MyLeoStack(app, "MyLeoStack");

  const template = Template.fromStack(stack);

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

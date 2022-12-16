/* eslint-disable @typescript-eslint/naming-convention */
import { CfnInclude } from "aws-cdk-lib/cloudformation-include";
import { Construct, IConstruct } from "constructs";
import { LeoPlatformProps } from "../types";
import * as path from "path";

export class LeoPlatform extends Construct {
  constructor(scope: IConstruct, id: string, props: LeoPlatformProps) {
    super(scope, id);

    const templateFile = path.resolve(
      props.templateFile ??
        "node_modules/leo-cdk-lib/lib/platform/cloudformation.json"
    );

    new CfnInclude(this, "Platform", {
      preserveLogicalIds: false,
      templateFile,
      parameters: {
        ...props.baseParameters,
        ...props.parameterGroups.lambdaProps,
        ...props.parameterGroups.leoArchiveProps,
        ...props.parameterGroups.leoCronProps,
        ...props.parameterGroups.leoEventProps,
        ...props.parameterGroups.leoSettingsProps,
        ...props.parameterGroups.leoStreamProps,
        ...props.parameterGroups.leoSystemProps,
      },
    });
  }
}

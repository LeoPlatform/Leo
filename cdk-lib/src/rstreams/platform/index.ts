/* eslint-disable @typescript-eslint/naming-convention */
import { CfnInclude } from "aws-cdk-lib/cloudformation-include";
import { Construct, IConstruct } from "constructs";
import { IRStreamsPlatformProps } from "../types";
import * as path from "path";

export class RStreamsPlatform extends Construct {
  constructor(scope: IConstruct, id: string, props: IRStreamsPlatformProps) {
    super(scope, id);

    new CfnInclude(this, "RStreamsPlatform", {
      preserveLogicalIds: false,
      templateFile: path.resolve(
        "node_modules/leo-cdk-lib/lib/rstreams/cloudformation.json"
      ),
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

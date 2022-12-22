/* eslint-disable @typescript-eslint/naming-convention */

export interface LeoPlatformProps {
  /**
   * CFN base parameters
   */
  readonly baseParameters: BaseParameters;
  /**
   * CFN parameter groups
   */
  readonly parameterGroups: LeoParameterGroups;

  /**
   * You can use your own template if you need to overwrite some
   * properties of this version.
   *
   * **note:** Params and nested options must be compatible
   * @default "node_modules/leo-cdk-lib/lib/leo/platform/cloudformation.json"
   */
  readonly templateFile?: string;
}

export interface BaseParameters {
  /**
   * Environment
   * @default dev
   */
  readonly Environment?: string;

  /**
   * Cognito Pool Id used for request authentication. Leave blank to have us create one
   */
  readonly InputCognitoId: string;

  /**
   * List of AWS principles this stack trusts. (i.e. arn:aws:iam::<account_id>:root)
   * Trusted accounts can assume the role of a bot on this stack and write to it.
   */
  readonly TrustedAWSPrinciples: string[];

  /**
   * List of LeoBotRole Arn's this stack will assume for replication. The AccountId
   * and Stack of the first ARN become the default AccountId and Stack used when
   * defining the QueueReplicationMapping.
   */
  readonly QueueReplicationDestinationLeoBotRoleARNs: string[];

  /**
   * JSON Array of Objects and/or Strings the form [\"SOURCE_QUEUE_A\", {\"SOURCE_QUEUE_B\": { \"account\": \"DEST_ACCOUNT_ID\", \"stack\": \"DEST_STACK_NAME\", \"destination\":  \"DEST_QUEUE\"}}, {...}].
   * Omitting \"destination\" will default to the source queue name. Omitting \"account\" or \"stack\" will default to the first AccountId and Stack of the LeoBotRoleArn list. Simply listing a string will assume all defaults.
   */
  readonly QueueReplicationMapping: string;

  /**
   * Array of logins
   * @default ""
   */
  readonly BusUiLogins?: string;

  /**
   * Custom Javascript for the web app
   * @default ""
   */
  readonly BusUiCustomJS?: string;

  /**
   * AWS policy ARN to add to LeoCronRole.  Useful for adding cross account invocations
   * @default ""
   */
  readonly LambdaInvokePolicy?: string;

  /**
   * Number of shards for LeoKinisesStream
   * @default 1
   */
  readonly KinesisShards?: number;

  /**
   * Number of seconds before LeoStream records are auto deleted
   * min: 0
   * @default 0
   */
   readonly MonitorShardHashKey?: number;

  /**
   * Number of seconds before LeoStream records are auto deleted
   * min: 1
   * @default 604800
   */
  readonly StreamTTLSeconds?: number;
}

export interface LeoParameterGroups {
  /**
   * Lambda props
   */
  readonly lambdaProps: LambdaProps;

  /**
   * Leo stream props
   */
  readonly leoStreamProps: LeoStreamProps;

  /**
   * Leo archive props
   */
  readonly leoArchiveProps: LeoArchiveProps;

  /**
   * Leo event props
   */
  readonly leoEventProps: LeoEventProps;

  /**
   * Leo settings props
   */
  readonly leoSettingsProps: LeoSettingsProps;

  /**
   * 
   */
  readonly leoCronProps: LeoCronProps;

  readonly leoSystemProps: LeoSystemProps;
}

export interface LambdaProps {
  /**
   * Kinesis stream processor memory
   * min: 128
   * max: 10240
   * @default 640
   */
  readonly KinesisStreamProcessorMemory?: number;
  /**
   * Firehose processor memory
   * min: 128
   * max: 10240
   * @default 640
   */
  readonly FirehoseStreamProcessorMemory?: number;
  /**
   * Cron processor memory
   * min: 128
   * max: 10240
   * @default 256
   */
  readonly CronProcessorMemory?: number;
  /**
   * Event trigger memory
   * min: 128
   * max: 10240
   * @default 128
   */
  readonly EventTriggerMemory?: number;
  /**
   * Leo monitor memory
   * min: 128
   * max: 10240
   * @default 256
   */
  readonly LeoMonitorMemory?: number;
}

export interface LeoStreamProps {
  /**
   * @default BillingModes.PROVISIONED
   */
  readonly LeoStreamBillingMode?: BillingModes;
  /**
   * @default 20
   */
  readonly LeoStreamMinReadCapacity?: number;
  /**
   * @default 1000
   */
  readonly LeoStreamMaxReadCapacity?: number;
  /**
   * @default 20
   */
  readonly LeoStreamMinWriteCapacity?: number;
  /**
   * @default 1000
   */
  readonly LeoStreamMaxWriteCapacity?: number;
}

export interface LeoArchiveProps {
  /**
   * @default BillingModes.PROVISIONED
   */
  readonly LeoArchiveBillingMode?: number;
  /**
   * @default 5
   */
  readonly LeoArchiveMinReadCapacity?: number;
  /**
   * @default 50
   */
  readonly LeoArchiveMaxReadCapacity?: number;
  /**
   * @default 5
   */
  readonly LeoArchiveMinWriteCapacity?: number;
  /**
   * @default 50
   */
  readonly LeoArchiveMaxWriteCapacity?: number;
}

export interface LeoEventProps {
  /**
   * @default BillingModes.PROVISIONED
   */
  readonly LeoEventBillingMode?: BillingModes;
  /**
   * @default 5
   */
  readonly LeoEventMinReadCapacity?: number;
  /**
   * @default 50
   */
  readonly LeoEventMaxReadCapacity?: number;
  /**
   * @default 5
   */
  readonly LeoEventMinWriteCapacity?: number;
  /**
   * @default 50
   */
  readonly LeoEventMaxWriteCapacity?: number;
}

export interface LeoSettingsProps {
  /**
   * @default BillingModes.PROVISIONED
   */
  readonly LeoSettingsBillingMode?: BillingModes;
  /**
   * @default 5
   */
  readonly LeoSettingsMinReadCapacity?: number;
  /**
   * @default 50
   */
  readonly LeoSettingsMaxReadCapacity?: number;
  /**
   * @default 5
   */
  readonly LeoSettingsMinWriteCapacity?: number;
  /**
   * @default 50
   */
  readonly LeoSettingsMaxWriteCapacity?: number;
}

export interface LeoCronProps {
  /**
   * @default BillingModes.PROVISIONED
   */
  readonly LeoCronBillingMode?: BillingModes;
  /**
   * @default 20
   */
  readonly LeoCronMinReadCapacity?: number;
  /**
   * @default 200
   */
  readonly LeoCronMaxReadCapacity?: number;
  /**
   * @default 20
   */
  readonly LeoCronMinWriteCapacity?: number;
  /**
   * @default 200
   */
  readonly LeoCronMaxWriteCapacity?: number;
}

export interface LeoSystemProps {
  /**
   * @default BillingModes.PROVISIONED
   */
  readonly LeoSystemBillingMode?: BillingModes;
  /**
   * @default 5
   */
  readonly LeoSystemMinReadCapacity?: number;
  /**
   * @default 50
   */
  readonly LeoSystemMaxReadCapacity?: number;
  /**
   * @default 5 
   */
  readonly LeoSystemMinWriteCapacity?: number;
  /**
   * @default 50 
   */
  readonly LeoSystemMaxWriteCapacity?: number;
}

export enum BillingModes {
  PROVISIONED = "PROVISIONED",
  PAY_PER_REQUEST = "PAY_PER_REQUEST",
}

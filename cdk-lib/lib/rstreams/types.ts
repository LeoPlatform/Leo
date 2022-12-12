/* eslint-disable @typescript-eslint/naming-convention */

export interface IRStreamsPlatformProps {
    readonly baseParameters: BaseParameters,
    readonly parameterGroups: IRStreamParameterGroups;
}

export interface BaseParameters{
    /**
     * Environment
     * @default dev
     */
     readonly Environment?: string;

     /**
      * Cognito Pool Id used for request authentication. Leave Blank to have us create one
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
      * AWS policy ARN to add to LeoCronRole.  Usefule for adding cross account invocations
      * @default ""
      */
      readonly LambdaInvokePolicy?: string;

     /**
      * Number of shards for LeoKinisesStream
      * @default 1
      */
      readonly KinesisShards?: number;
}

export interface IRStreamParameterGroups {
    readonly lambdaProps: ILambdaProps;

    readonly leoStreamProps: ILeoStreamProps;

    readonly leoArchiveProps: ILeoArchiveProps

    readonly leoEventProps: ILeoEventProps;

    readonly leoSettingsProps: ILeoSettingsProps;

    readonly leoCronProps: ILeoCronProps;

    readonly leoSystemProps: ILeoSystemProps;
}

export interface ILambdaProps {
    readonly KinesisStreamProcessorMemory?: number;
    readonly FirehoseStreamProcessorMemory?: number;
    readonly CronProcessorMemory?: number;
    readonly EventTriggerMemory?: number;
    readonly LeoMonitorMemory?: number;
}

export interface ILeoStreamProps {
    readonly LeoStreamBillingMode?: BillingModes;
    readonly LeoStreamMinReadCapacity?: number;
    readonly LeoStreamMaxReadCapacity?: number;
    readonly LeoStreamMinWriteCapacity?: number;
    readonly LeoStreamMaxWriteCapacity?: number;
}

export interface ILeoArchiveProps {
    readonly LeoArchiveBillingMode?: number;
    readonly LeoArchiveMinReadCapacity?: number;
    readonly LeoArchiveMaxReadCapacity?: number;
    readonly LeoArchiveMinWriteCapacity?: number;
    readonly LeoArchiveMaxWriteCapacity?: number;

}

export interface ILeoEventProps {
    readonly LeoEventBillingMode?: BillingModes;
    readonly LeoEventMinReadCapacity?: number;
    readonly LeoEventMaxReadCapacity?: number;
    readonly LeoEventMinWriteCapacity?: number;
    readonly LeoEventMaxWriteCapacity?: number;

}

export interface ILeoSettingsProps {
    readonly LeoSettingsBillingMode?: BillingModes;
    readonly LeoSettingsMinReadCapacity?: number;
    readonly LeoSettingsMaxReadCapacity?: number;
    readonly LeoSettingsMinWriteCapacity?: number;
    readonly LeoSettingsMaxWriteCapacity?: number;

}

export interface ILeoCronProps {
    readonly LeoCronBillingMode?: BillingModes;
    readonly LeoCronMinReadCapacity?: number;
    readonly LeoCronMaxReadCapacity?: number;
    readonly LeoCronMinWriteCapacity?: number;
    readonly LeoCronMaxWriteCapacity?: number;

}

export interface ILeoSystemProps {
    readonly LeoSystemBillingMode?: BillingModes;
    readonly LeoSystemMinReadCapacity?: number;
    readonly LeoSystemMaxReadCapacity?: number;
    readonly LeoSystemMinWriteCapacity?: number;
    readonly LeoSystemMaxWriteCapacity?: number;

}

export enum BillingModes {
    PROVISIONED = 'PROVISIONED',
    PAY_PER_REQUEST = 'PAY_PER_REQUEST'
}
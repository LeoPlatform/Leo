import { Construct, IConstruct } from "constructs";
import { StringParameter } from "aws-cdk-lib/aws-ssm";
import { NodejsFunction, NodejsFunctionProps } from "aws-cdk-lib/aws-lambda-nodejs";
import { Bot, BotProps, BotType, LambdaBotProps, RegisterBotProps } from "../types";
import { DockerImageFunction, DockerImageFunctionProps } from "aws-cdk-lib/aws-lambda";
import { CustomResource, Fn } from "aws-cdk-lib";
import { ManagedPolicy } from "aws-cdk-lib/aws-iam";


export class LambdaBot extends Construct {
    public bots: Bot[];

    constructor(scope: IConstruct, id: string, props: LambdaBotProps) {
        super(scope, id);

        const busStack = StringParameter.valueForStringParameter(
            this, props.busSsmId);

        const registerBotProps: RegisterBotProps[] = [];
        this.bots = [];

        props.botProps.forEach((botProp: BotProps) => {
            const environment = {
                RSTREAMS_CONFIG: JSON.stringify(this.getEnvironmentVariables(busStack))
            }
            let bot: NodejsFunction | DockerImageFunction;
            if (!botProp.functionProps || "entry" in botProp.functionProps) {
                bot = new NodejsFunction(this, `${botProp.name}`, {
                    ...botProp.functionProps as NodejsFunctionProps,
                    environment,
                });
            } else {
                bot = new DockerImageFunction(this, `${botProp.name}`, {
                    ...botProp.functionProps as DockerImageFunctionProps,
                    environment
                });
            }
            const props = {
                settings: botProp.settings,
                name: botProp.name,
                lambdaName: bot.functionName,
                type: BotType.CRON,
                id: bot.functionName,
                time: botProp.time
            };
            registerBotProps.push(props);
            bot.role?.addManagedPolicy(ManagedPolicy.fromManagedPolicyArn(this, `${props.name}BusPolicy`, Fn.importValue(`${busStack}-Policy`)));
            this.bots.push({ function: bot, registerBotProps: props })

        });
        this.registerBots(this, props.busSsmId, busStack, registerBotProps)
    }

    private getEnvironmentVariables = (busStack: string) => {
        return {
            region: Fn.importValue(`${busStack}-Region`),
            kinesis: Fn.importValue(`${busStack}-LeoKinesisStream`),
            s3: Fn.importValue(`${busStack}-LeoS3`),
            firehose: Fn.importValue(`${busStack}-LeoFirehoseStream`),
            resources: {
                LeoStream: Fn.importValue(`${busStack}-LeoStream`),
                LeoCron: Fn.importValue(`${busStack}-LeoCron`),
                LeoEvent: Fn.importValue(`${busStack}-LeoEvent`),
                LeoSettings: Fn.importValue(`${busStack}-LeoSettings`),
                LeoSystem: Fn.importValue(`${busStack}-LeoSystem`),
                LeoS3: Fn.importValue(`${busStack}-LeoS3`),
                LeoKinesisStream: Fn.importValue(`${busStack}-LeoKinesisStream`),
                LeoFirehoseStream: Fn.importValue(`${busStack}-LeoFirehoseStream`),
                Region: Fn.importValue(`${busStack}-Region`),
            }
        }
    }

    private registerBots = (scope: IConstruct, bustName: string, busStack: string, bots: RegisterBotProps[]) => {
        let formattedProperties: { [key: string]: RegisterBotProps } = {};
        for (let i = 0; i < bots.length; i++) {
            if (formattedProperties[bots[i].name]) {
                throw new Error(`Bot names must be unique. ${[bots[i].name]} has already been added to the cloudformation.`)
            }
            formattedProperties[bots[i].name] = bots[i];
        }

        new CustomResource(scope, `${bustName}Register`, {
            serviceToken: Fn.importValue(`${busStack}-Register`),
            properties: formattedProperties
        });
    }
}

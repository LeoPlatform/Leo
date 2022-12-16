import { Construct, IConstruct } from "constructs";
import { StringParameter } from "aws-cdk-lib/aws-ssm";
import { NodejsFunction, NodejsFunctionProps } from "aws-cdk-lib/aws-lambda-nodejs";
import { BotProps, BotType, NodeBotProps, RegisterBotProps } from "../types";
import { registerBots } from "../register";
import { DockerImageFunction, DockerImageFunctionProps } from "aws-cdk-lib/aws-lambda";


export class LambdaBot extends Construct {
    constructor(scope: IConstruct, id: string, props: NodeBotProps) {
        super(scope, id);

        const busStack = StringParameter.valueForStringParameter(
            this, props.bus);

        const registerBotProps: RegisterBotProps[] = [];

        props.botProps.forEach((botProp: BotProps) => {
            const environment = {
                RSTREAMS_CONFIG: JSON.stringify(rstreamsConfigEnvironments(busStack))
            }
            let bot: NodejsFunction | DockerImageFunction;
            if (!botProp.functionProps || 'entry' in botProp.functionProps ) {
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
            if (bot) {
                registerBotProps.push({
                    settings: botProp.settings,
                    name: botProp.name,
                    lambdaName: bot.functionName,
                    type: BotType.CRON,
                    id: bot.functionName,
                    time: botProp.time
                })
            } else {
                throw new Error(`Unable to register bot ${botProp.name}. The entry variable should point to a file or image.`);
            }

        });
        // TODO: Maybe add BotRole??
        registerBots(this, busStack, registerBotProps)
    }
}

const rstreamsConfigEnvironments = (rstreamsBus: string) => {
    return {
        region: `${rstreamsBus}-Region`,
        kinesis: `${rstreamsBus}-LeoKinesisStream`,
        s3: `${rstreamsBus}-LeoS3`,
        firehose: `${rstreamsBus}-LeoFirehoseStream`,
        resources: {
            LeoStream: `${rstreamsBus}-LeoStream`,
            LeoCron: `${rstreamsBus}-LeoCron`,
            LeoEvent: `${rstreamsBus}-LeoEvent`,
            LeoSettings: `${rstreamsBus}-LeoSettings`,
            LeoSystem: `${rstreamsBus}-LeoSystem`,
            LeoS3: `${rstreamsBus}-LeoS3`,
            LeoKinesisStream: `${rstreamsBus}-LeoKinesisStream`,
            LeoFirehoseStream: `${rstreamsBus}-LeoFirehoseStream`,
            Region: `${rstreamsBus}-Region`,
        }
    }
}

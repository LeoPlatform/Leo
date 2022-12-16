import { Construct, IConstruct } from "constructs";
import { StringParameter } from "aws-cdk-lib/aws-ssm";
import { NodejsFunction, NodejsFunctionProps } from "aws-cdk-lib/aws-lambda-nodejs";


export interface Bot {
    settings: {
        name: string
    }
}

export interface NodeBotProps extends Bot{
    config: NodejsFunctionProps;
}


export interface BotsRegisterProps {
    /**
     * 
     */
    botProps: NodeBotProps[];
    bus: string;
}


export class BotsRegister extends Construct {
  constructor(scope: IConstruct, id: string, props: BotsRegisterProps) {
    super(scope, id);

    const busStack = StringParameter.valueForStringParameter(
        this, props.bus);

    props.botProps.forEach( (botProp: NodeBotProps) => {
        const bot = new NodejsFunction(this, `${botProp.settings.name}`, {
            ...botProp.config,
            environment: {
                RSTREAMS_CONFIG: JSON.stringify(rstreamsConfigEnvironments(busStack))
            }
        });

    });
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

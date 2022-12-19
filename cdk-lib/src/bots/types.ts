import { DockerImageCode, DockerImageFunction, DockerImageFunctionProps, FunctionOptions, FunctionProps, Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction, NodejsFunctionProps } from "aws-cdk-lib/aws-lambda-nodejs";


/**
 * All of these settings are dependent on the lambda implementation. Likely some won't be used. There may be 
 * additional settings that also make sense to be included by extending this interface. Recommended to have
 * at least either source or destination defined or the bot will be 'orphaned'.
 * source - custom to bot. Source queue to read from; generally speaking.
 * destination - custom to bot. Destination queue to write to; generally speaking.
 */
export interface RegisterBotSettings {
    /**
     * Represents the index of this bot from the other variations of the bot using the same lambda. 
     * It only has meaning if the lambda uses it for something. We have used it to handle fanout
     */
    botNumber?: number;
    /**
     * Custom to bot
     */
    queue?: string;
    /**
     * Custom to bot. Source queue to read from; generally speaking.
     */
    source?: string;
    /**
     * Custom to bot. Destination queue to write to; generally speaking
     */
    destination?: string
};

/**
 * This is the overall bot definition to be registered with your desired bus.
 */
export interface RegisterBotProps {
    /**
     * Lambda function name
     */
    id: string;
    /**
     * User-defined string. This is what the bot will be called in botmon
     */
    name: string;
    /**
     * Type of bot, i.e. cron
     */
    type: BotType.CRON;
    /**
     * RegisterBotSettings objet
     */
    settings: RegisterBotSettings;
    /**
     * Reference to AWS resource. This can be an ARN or just unique function name
     */
    lambdaName: string
    /**
     * Time to run the bot, i.e. time: "0 * * * * *" 
     */
    time?: string,
};

export enum BotType {
    CRON = 'cron'
}

export interface BaseFunctionProps extends FunctionOptions {
    /**
     * The name of the exported handler in the entry file.
     */
    handler: string;
    /**
     * Path to the source code for the function or DockerImageCode object
     */
    code: string | DockerImageCode;
    /**
     * Runtime for lambda function
     * @default determined by entry file extension, (i.e,  Js/Ts = NODE_ )
     */
    runtime?: Runtime;
}


export interface BotProps {
    /**
     * NodejsFunctionProps to create lambda function with
     */
    functionProps?: NodejsFunctionProps | DockerImageFunctionProps;
    /**
     * All of these settings are dependent on the lambda implementation.
     */
    settings: RegisterBotSettings;
    /**
     * User-defined string. This is what the bot will be called in botmon
     */
    name: string;
    /**
     * Type of bot, i.e. cron
     */
    type: BotType.CRON
    /**
     * Time to run the bot, i.e. time: "0 * * * * *" 
     */
    time?: string,
}

export interface LambdaBotProps {
    /**
     * List of bot configs to be registered into a bus
     */
    botProps: BotProps[];
    /**
     * SSM identifier of the bus to register to 
     */
    busSsmId: string;
}

export interface Bot {
    function: NodejsFunction | DockerImageFunction;
    registerBotProps: RegisterBotProps;
}
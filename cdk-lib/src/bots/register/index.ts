import { IConstruct } from 'constructs';
import { CustomResource, Fn } from 'aws-cdk-lib';
import { RegisterBotProps } from '../types';


export const registerBots = (scope: IConstruct, rstreamsBus: string, bots: RegisterBotProps[]) => {
    let formattedProperties: { [key:string]: RegisterBotProps } = {};
    for (let i = 0; i < bots.length; i++) {
        if (formattedProperties[bots[i].name]) {
            throw new Error(`Bot names must be unique. ${[bots[i].name]} has already been added to the cloudformation.`)
        }
        formattedProperties[bots[i].name] = bots[i];
    }

    new CustomResource(scope, `${rstreamsBus}Register`, {
        serviceToken: Fn.importValue(`${rstreamsBus}-Register`),
        properties: formattedProperties
    });
}
# leo-cdk-lib

```
npm i leo-cdk-lib
```

## Usage

```typescript
import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { RStreamsPlatform } from 'leo-cdk-lib'

export class PlatformStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    
    new RStreamsPlatform(this, 'TestPlatform', {
      baseParameters: {
        Environment: 'dev',
        InputCognitoId: '',
        TrustedAWSPrinciples: ['arn:aws:iam::806521485557:role/dev-cup-dsco-integration','arn:aws:iam::806521485557:root'],
        QueueReplicationDestinationLeoBotRoleARNs: [],
        QueueReplicationMapping: '[]',
      },
      parameterGroups: {
        lambdaProps: {},
        leoArchiveProps: {},
        leoCronProps: {},
        leoEventProps: {},
        leoSettingsProps: {},
        leoStreamProps: {},
        leoSystemProps: {}
      }
    });
  }
}
```
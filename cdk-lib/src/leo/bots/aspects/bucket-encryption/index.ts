import { IAspect } from "aws-cdk-lib";
import { CfnBucket } from "aws-cdk-lib/aws-s3";
import { IConstruct } from "constructs";

export class BucketEncryptionAspect implements IAspect {
    visit(node: IConstruct): void {
        if (node instanceof CfnBucket) {
            node.bucketEncryption = {
                serverSideEncryptionConfiguration: [{
                    serverSideEncryptionByDefault: {
                        sseAlgorithm: 'AES256',
                    },
                }]
            }
        }
    }
}
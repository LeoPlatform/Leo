module.exports = {
    Mappings: {
        RegionMap: {
            'us-west-2': {
                S3Bucket: 'leo-cli-publishbucket-mzhr7agmqo7u',
                AuthTemplateUrl: 'https://leo-cli-publishbucket-mzhr7agmqo7u.s3-us-west-2.amazonaws.com/auth/release/cloudformation-latest.json',
                BusTemplateUrl: 'https://leo-cli-publishbucket-mzhr7agmqo7u.s3-us-west-2.amazonaws.com/leo-bus/2.2.2/cloudformation.json',
                BotmonTemplateUrl: 'https://leo-cli-publishbucket-mzhr7agmqo7u.s3-us-west-2.amazonaws.com/botmon/2.2.1/cloudformation.json',
                CognitoTemplateUrl: 'https://leo-cli-publishbucket-mzhr7agmqo7u.s3-us-west-2.amazonaws.com/leo-Cognito/cloudformation-latest.json'
            },
            'us-east-1': {
                S3Bucket: 'leo-cli-publishbucket-abb4i613j9y9',
                AuthTemplateUrl: 'https://leo-cli-publishbucket-abb4i613j9y9.s3.amazonaws.com/auth/release/cloudformation-latest.json',
                BusTemplateUrl: 'https://leo-cli-publishbucket-abb4i613j9y9.s3.amazonaws.com/leo-bus/2.2.2/cloudformation.json',
                BotmonTemplateUrl: 'https://leo-cli-publishbucket-abb4i613j9y9.s3.amazonaws.com/botmon/2.2.1/cloudformation.json',
                CognitoTemplateUrl: 'https://leo-cli-publishbucket-abb4i613j9y9.s3.amazonaws.com/leo-Cognito/cloudformation-latest.json'
            }
        }
    },
	Parameters: {
		InputCognitoId: {
			Type: 'String',
			Description: 'Cognito Pool Id used for request authentication. Leave Blank to have us create one'
		}
	},
	Conditions: {
		createCognito: {
			'Fn::Equals': [
				{
					'Ref': 'InputCognitoId'
				},
				''
			]
		}
	},
	Resources: {
		Auth: {
			Type: 'AWS::CloudFormation::Stack',
			Properties: {
				TemplateURL: {
					'Fn::FindInMap': [
						'RegionMap', {
							Ref: 'AWS::Region'
						},
						'AuthTemplateUrl'
					]
				},
				TimeoutInMinutes: '60'
			}
		},
		Bus: {
			Type: 'AWS::CloudFormation::Stack',
			Properties: {
				TemplateURL: {
					'Fn::FindInMap': [
						'RegionMap', {
							Ref: 'AWS::Region'
						},
						'BusTemplateUrl'
					]
				},
				TimeoutInMinutes: '60'
			}
		},
		Cognito: {
			Type: 'AWS::CloudFormation::Stack',
			Properties: {
				TemplateURL: {
					'Fn::FindInMap': [
						'RegionMap', {
							Ref: 'AWS::Region'
						},
						'CognitoTemplateUrl'
					]
				},
				TimeoutInMinutes: '60'
			}
		},
		Botmon: {
			Type: 'AWS::CloudFormation::Stack',
			Properties: {
				TemplateURL: {
					'Fn::FindInMap': [
						'RegionMap', {
							Ref: 'AWS::Region'
						},
						'BotmonTemplateUrl'
					]
				},
				TimeoutInMinutes: '60',
				Parameters: {
					CognitoId: {
						'Fn::If': [
							'createCognito', {
								'Fn::GetAtt': 'Cognito.Outputs.IdentityPoolId'
							}, {
								Ref: 'InputCognitoId'
							}
						]
					},
					leoauth: {
						'Fn::Select': ['1', {
							'Fn::Split': ['/', {
								Ref: 'Auth'
							}]
						}]
					},
					leosdk: {
						'Fn::Select': ['1', {
							'Fn::Split': ['/', {
								Ref: 'Bus'
							}]
						}]
					}
				}
			},
			DependsOn: ['Auth', 'Bus', 'Cognito']
		},
		StackSecret: {
			Type: 'AWS::SecretsManager::Secret',
			Properties : {
				Description : '{Key,Value} map of bus tables',
				Name : {
					'Fn::Sub': [
						'rstreams-${resourceName}',
						{
							'resourceName': {
								'Fn::Select': [
									'1',
									{
										'Fn::Split': [
											'/',
											{
												Ref: 'Bus'
											}
										]
									}
								]
							}
						}
					]
				},
				SecretString : {'Fn::Sub': [
						'{\"LeoStream\":\"${leoStreamTable}\",\"LeoCron\":\"${leoCronTable}\",\"LeoEvent\":\"${leoEventTable}\",\"LeoSettings\":\"${leoSettingsTable}\",\"LeoSystem\":\"${leoSystemTable}\",\"LeoKinesisStream\":\"${leoKinesisStreamTable}\",\"LeoFirehoseStream\":\"${leoFirehoseStreamTable}\",\"LeoS3\":\"${leoS3Table}\",\"Region\":\"${AWS::Region}\"}',
						{ 
							'leoStreamTable': {
								'Fn::GetAtt': [
									'Bus',
									'Outputs.LeoStream'
								]
							},
							'leoCronTable': {
								'Fn::GetAtt': [
									'Bus',
									'Outputs.LeoCron'
								]
							},
							'leoEventTable': {
								'Fn::GetAtt': [
									'Bus',
									'Outputs.LeoEvent'
								]
							},
							'leoSettingsTable': {
								'Fn::GetAtt': [
									'Bus',
									'Outputs.LeoSettings'
								]
							},
							'leoSystemTable': {
								'Fn::GetAtt': [
									'Bus',
									'Outputs.LeoSystem'
								]
							},
							'leoKinesisStreamTable': {
								'Fn::GetAtt': [
									'Bus',
									'Outputs.LeoKinesisStream'
								]
							},
							'leoFirehoseStreamTable': {
								'Fn::GetAtt': [
									'Bus',
									'Outputs.LeoFirehoseStream'
								]
							},
							'leoS3Table': {
								'Fn::GetAtt': [
									'Bus',
									'Outputs.LeoS3'
								]
							}
					}
				]
				}
			}
		},
		RSFParameter: {
			Type : 'AWS::SSM::Parameter',
			Properties : {
				Description : 'String',
				Name : {Ref: 'AWS::StackName'},
				Type : 'String',
				Value : {
					'Fn::Select': [
						'1',
						{
							'Fn::Split': [
								'/',
								{
									Ref: 'Bus'
								}
							]
						}
					]
				}
			}
		}
	}
};

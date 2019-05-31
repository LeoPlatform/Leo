module.exports = {
	Mappings: {
		RegionMap: {
			'us-east-1': {
				AuthTemplateUrl: 'https://leo-cli-publishbucket-abb4i613j9y9.s3.amazonaws.com/auth/release/cloudformation-latest.json',
				BusTemplateUrl: 'https://leo-cli-publishbucket-abb4i613j9y9.s3.amazonaws.com/leo-bus/release/cloudformation-latest.json',
				BotmonTemplateUrl: 'https://leo-cli-publishbucket-abb4i613j9y9.s3.amazonaws.com/botmon/release/cloudformation-latest.json',
				CognitoTemplateUrl: 'https://leo-cli-publishbucket-abb4i613j9y9.s3.amazonaws.com/leo-Cognito/cloudformation-latest.json',
			},
			'us-west-2': {
				AuthTemplateUrl: 'https://leo-cli-publishbucket-mzhr7agmqo7u.s3-us-west-2.amazonaws.com/auth/release/cloudformation-latest.json',
				BusTemplateUrl: 'https://leo-cli-publishbucket-mzhr7agmqo7u.s3-us-west-2.amazonaws.com/leo-bus/release/cloudformation-latest.json',
				BotmonTemplateUrl: 'https://leo-cli-publishbucket-mzhr7agmqo7u.s3-us-west-2.amazonaws.com/botmon/release/cloudformation-latest.json',
				CognitoTemplateUrl: 'https://leo-cli-publishbucket-mzhr7agmqo7u.s3-us-west-2.amazonaws.com/leo-Cognito/cloudformation-latest.json',
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
		}
	}
};

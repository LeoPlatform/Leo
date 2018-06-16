module.exports = {
	Resources: {
		Cognito: {
			"Type": "AWS::Cognito::IdentityPool",
			"Properties": {
				"IdentityPoolName": "Leo",
				"AllowUnauthenticatedIdentities": true,
				"DeveloperProviderName": "leo",
				"SupportedLoginProviders": {
					String: String,
					...
				},
				"CognitoIdentityProviders": [CognitoIdentityProvider, ...],
				"SamlProviderARNs": [String, ...],
				"OpenIdConnectProviderARNs": [String, ...],
				"CognitoStreams": CognitoStreams,
				"PushSync": PushSync,
				"CognitoEvents": {
					String: String,
					...
				}
			}
		},
		"auth": {
			"Type": "AWS::IAM::Role",
			"Properties": {
				"AssumeRolePolicyDocument": {
					"Version": "2012-10-17",
					"Statement": [{
						"Effect": "Allow",
						"Principal": {
							"Federated": "cognito-identity.amazonaws.com"
						},
						"Action": "sts:AssumeRoleWithWebIdentity",
						"Condition": {
							"StringEquals": {
								"cognito-identity.amazonaws.com:aud": "us-east-1:____COGNITO_ID____"
							},
							"ForAnyValue:StringLike": {
								"cognito-identity.amazonaws.com:amr": "authenticated"
							}
						}
					}]
				},
				"Policies": [{
					"PolicyName": "leo_micro_exec",
					"PolicyDocument": {
						"Version": "2012-10-17",
						"Statement": [{
							"Effect": "Allow",
							"Action": [
								"mobileanalytics:PutEvents",
								"cognito-sync:*",
								"cognito-identity:*"
							],
							"Resource": [
								"*"
							]
						}, {
							"Effect": "Allow",
							"Action": [
								"execute-api:Invoke"
							],
							"Resource": [{
								"Fn::Join": [
									"", [
										"arn:aws:execute-api:", {
											"Ref": "AWS::Region"
										},
										":", {
											"Ref": "AWS::AccountId"
										},
										":BOTMON/prod/*"
									]
								]
							}]
						}]
					}
				}]
			}
		},
		"unauth": {
			"Type": "AWS::IAM::Role",
			"Properties": {
				"AssumeRolePolicyDocument": {
					"Version": "2012-10-17",
					"Statement": [{
						"Effect": "Allow",
						"Principal": {
							"Federated": "cognito-identity.amazonaws.com"
						},
						"Action": "sts:AssumeRoleWithWebIdentity",
						"Condition": {
							"StringEquals": {
								"cognito-identity.amazonaws.com:aud": "us-east-1:____COGNITO_ID____"
							},
							"ForAnyValue:StringLike": {
								"cognito-identity.amazonaws.com:amr": "unauthenticated"
							}
						}
					}]
				},
				"Policies": [{
					"PolicyName": "leo_micro_exec",
					"PolicyDocument": {
						"Version": "2012-10-17",
						"Statement": [{
							"Effect": "Allow",
							"Action": [
								"mobileanalytics:PutEvents",
								"cognito-sync:*",
								"cognito-identity:*"
							],
							"Resource": [
								"*"
							]
						}, {
							"Effect": "Allow",
							"Action": [
								"execute-api:Invoke"
							],
							"Resource": [{
								"Fn::Join": [
									"", [
										"arn:aws:execute-api:", {
											"Ref": "AWS::Region"
										},
										":", {
											"Ref": "AWS::AccountId"
										},
										":BOTMON/prod/*"
									]
								]
							}]
						}]
					}
				}]
			}
		}
	}
};

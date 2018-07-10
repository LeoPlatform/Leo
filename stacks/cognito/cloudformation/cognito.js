module.exports = {
	Resources: {
		IdentityPool: {
			"Type": "AWS::Cognito::IdentityPool",
			"Properties": {
				"IdentityPoolName": "LeoCognito",
				"AllowUnauthenticatedIdentities": true,
				"DeveloperProviderName": "leo"
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
								"cognito-identity.amazonaws.com:aud": {
									"Ref": "IdentityPool"
								}
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
										":*/Release/*"
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
								"cognito-identity.amazonaws.com:aud": {
									"Ref": "IdentityPool"
								}
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
										":*/Release/*"
									]
								]
							}]
						}]
					}
				}]
			}
		},
		"IdentityPoolRoleMappings": {
			"Type": "AWS::Cognito::IdentityPoolRoleAttachment",
			"Properties": {
				"IdentityPoolId": {
					"Ref": "IdentityPool"
				},
				"Roles": {
					"authenticated": {
						"Fn::GetAtt": "auth.Arn"
					},
					"unauthenticated": {
						"Fn::GetAtt": "unauth.Arn"
					}
				}
			}
		}
	},
	"Outputs": {
		"IdentityPoolId": {
			"Description": "Cognito Identity Pool ID",
			"Value": {
				"Ref": "IdentityPool"
			},
			"Export": {
				"Name": {
					"Fn::Sub": "${AWS::StackName}-IdentityPool"
				}
			}
		}
	}
};

let cf = require('leo-aws/utils/cloudformation.js')();
module.exports = cf
	.add({
		"Auth": {
			"Type": "AWS::CloudFormation::Stack",
			"Properties": {
				"TemplateURL": "https://s3-us-west-2.amazonaws.com/leo-cli-publishbucket-1rgojx1iw5yq9/auth/release/cloudformation-latest.json",
				"TimeoutInMinutes": "60"
			}
		}})
	.add({
		"Bus": {
			"Type": "AWS::CloudFormation::Stack",
			"Properties": {
				"TemplateURL": "https://s3-us-west-2.amazonaws.com/leo-cli-publishbucket-1rgojx1iw5yq9/leo-bus/release/cloudformation-latest.json",
				"TimeoutInMinutes": "60"
			}
		}
	})
	.add({
		"Botmon": {
			"Type": "AWS::CloudFormation::Stack",
			"Properties": {
				"TemplateURL": "https://s3-us-west-2.amazonaws.com/leo-cli-publishbucket-1rgojx1iw5yq9/botmon/release/cloudformation-latest.json",
				"TimeoutInMinutes": "60",
				"Parameters": {
					"CognitoId": { "Fn::Sub": "{\"CognitoId\":\"${CognitoId}\"}"},
					"leoauth": { "Fn::Select" : [ "1", { "Fn::Split" : [ "/" , {"Ref":  "Auth" } ] } ] },
					"leosdk": { "Fn::Select" : [ "1", { "Fn::Split" : [ "/" , {"Ref":  "Bus" } ] } ] }
				}
			},
			"DependsOn": ["Auth", "Bus"]
		}
	})
	.extend('Parameters', {
		"CognitoId": {
			"Type": "String",
			"Description": "Cognito Pool Id used for request authentication"
		}});

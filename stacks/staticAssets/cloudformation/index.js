module.exports = {
	Resources: {
		"LeoS3Bucket": {
			"Type": "AWS::S3::Bucket",
			"Properties": {
				"AccessControl": "Private",
				"CorsConfiguration": {
					"CorsRules": [{
						"AllowedHeaders": [
							"*"
						],
						"AllowedMethods": [
							"GET"
						],
						"AllowedOrigins": [
							"*"
						],
						"ExposedHeaders": [
							"Date"
						],
						"MaxAge": "3600"
					}]
				}
			}
		},
		"LeoS3BucketPolicy": {
			"Type": "AWS::S3::BucketPolicy",
			"Properties": {
				"Bucket": {
					"Ref": "LeoS3Bucket"
				},
				"PolicyDocument": {
					"Statement": [{
						"Action": [
							"s3:GetObject"
						],
						"Effect": "Allow",
						"Resource": {
							"Fn::Join": [
								"", [
									"arn:aws:s3:::", {
										"Ref": "LeoS3Bucket"
									},
									"/*"
								]
							]
						},
						"Principal": "*"
					}]
				}
			}
		},
		"StaticDistribution": {
			"Type": "AWS::CloudFront::Distribution",
			"Properties": {
				"DistributionConfig": {
					"Origins": [{
						"DomainName": {
							"Fn::GetAtt": [
								"LeoS3Bucket",
								"DomainName"
							]
						},
						"Id": "LeoS3Bucket",
						"S3OriginConfig": {}
					}],
					"Enabled": "true",
					"PriceClass": "PriceClass_100",
					"DefaultCacheBehavior": {
						"AllowedMethods": [
							"GET",
							"HEAD",
							"OPTIONS"
						],
						"CachedMethods": [
							"HEAD",
							"GET",
							"OPTIONS"
						],
						"TargetOriginId": "LeoS3Bucket",
						"ForwardedValues": {
							"QueryString": "false",
							"Cookies": {
								"Forward": "none"
							}
						},
						"ViewerProtocolPolicy": "https-only",
						"DefaultTTL": "31536000",
						"MaxTTL": "31536000",
						"MinTTL": "31536000"
					}
				}
			},
			"DependsOn": [
				"LeoS3Bucket"
			]
		}
	}
};

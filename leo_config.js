'use strict';

const leoaws = require("leo-aws");
module.exports = {
	/**defaults applied to every system**/
	_global: {
		leopublish: function () {
			return {
				"us-east-1": {
					leoaws: leoaws({
						profile: 'leotest',
						region: 'us-east-1'
					}),
					public: false,
					static: {
						s3: "s3://leomicroservices-leos3bucket-10v1vi32gpjy1/leo_platform",
						cloudfront: ""
					}//,
					// stack: this.env + "LeoPlatform"
				},
				"us-west-2": {
					leoaws: leoaws({
						profile: 'leotest',
						region: 'us-west-2'
					}),
					public: false,
					static: {
						s3: "s3://leomicroservices-leos3bucket-10v1vi32gpjy1/leo_platform",
						cloudfront: ""
					}//,
					// stack: this.env + "LeoPlatform"
				}
			}
		}
	}
};
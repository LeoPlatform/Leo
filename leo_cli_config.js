'use strict';
const leoaws = require("leo-aws");

module.exports = {
	publish: [
		{
			leoaws: {
				profile: 'leo',
				region: 'us-west-2'
			},
			public: true
		}, {
			leoaws: {
				profile: 'leo',
				region: 'us-east-1'
			},
			public: true
		}
	]
};

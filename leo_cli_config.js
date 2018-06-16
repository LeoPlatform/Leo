'use strict';
const leoaws = require("leo-aws");

module.exports = {
	publish: function(env) {
		return [{
			leoaws: leoaws({
				profile: process.env.AWS_PROFILE,
				region: 'us-east-1'
			}),
			public: true
		}, {
			leoaws: leoaws({
				profile: process.env.AWS_PROFILE,
				region: 'us-west-2'
			}),
			public: true
		}];
	}
};

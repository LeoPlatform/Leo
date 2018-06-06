'use strict';
const leoaws = require("leo-aws");
module.exports = {
	/**defaults applied to every system**/
	_global: {
		leopublish: function () {
			return {
				"us-east-1": {
					leoaws: leoaws({
						profile: this.profile,
						region: 'us-east-1'
					}),
					public: true
				},
				"us-west-2": {
					leoaws: leoaws({
						profile: this.profile,
						region: 'us-west-2'
					}),
					public: true
				}
			}
		}
	},
	_local: {
		profile: 'leo'
	}
};

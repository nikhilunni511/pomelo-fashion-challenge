/*
 * Author: Nikhil Unni <nikhi.unni@gmail.com>
 * Created Date: Tuesday November 16th 2021
 * Version : 1.0.0
 * Product : Web route
 */

 const webController = require('../../controllers/webController');

module.exports = [
	{
		method: "GET",
		path: "/",
		handler: webController.gitSearch,
		config: {
			description: "Git search",
			tags: ['web']
		}
	}
];
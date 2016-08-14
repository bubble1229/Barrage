'use strict';

var config = require('../../../config');

module.exports = function (app) {

	app.get("/realtime", function (req, res) {
		res.render("realtime", {
			config: config,
			version: version
		});
	});
};
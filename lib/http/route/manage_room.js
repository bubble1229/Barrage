/// <reference path="../../../typings/main.d.ts" />
'use strict';
let config = require('../../../config');

module.exports = function (app) {

	app.post("/manage/room/get/", (req, res) => {
		let ret = [];
		Object.keys(config.rooms).map(room => {
			ret.push({
				id: room,
				display: config.rooms[room].display,
			});
		});
		log.log("已把房间信息向管理页面下发");
		return res.end(JSON.stringify(ret));
	});

};

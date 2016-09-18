'use strict';

var config = require('../../../config');

/* 存储随机字符串 */
var pwd = '';

/* 生成随机字符串 */
function randomString(len) {
	len = len || 32;
	var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
	var maxPos = $chars.length;
	for (var i = 0; i < len; ++i) {
		pwd += $chars.charAt(Math.random() * maxPos);
	}
}

module.exports = function (app) {
	app.get("/manage", function (req, res) {
		if (req.query.random == pwd) {
			res.render("manage", {
				config: config
			});
		} else {
			res.render("manage_validate");
		}
	});

	// 总身份验证
	app.post("/manage/*", function (req, res, next) {
		if (/room\/get/.test(req.url)) {
			// 如果是房间下发则不验证身份
			return next();
		}
		var room = req.body.room;
		if (!config.rooms[room]) {
			res.status(404);
			return res.end('{"error": "房间错误"}');
		}
		if (config.rooms[room].managepassword !== req.body.password) {
			res.status(403);
			return res.end('{"error": "密码错误"}');
		}
		return next();
	});

	app.post("/manage", function(req, res) {
		if (req.body.name == 'turingca' && req.body.pwd == 'turingca1987') {
			res.status(200);
			pwd = '';
			randomString();
			return res.end('{"flag": "OK", "random": "' + pwd + '"}');
		} else {
			res.status(200);
			return res.end('{"flag": "ERROR"}');
		}
	})
};

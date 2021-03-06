var express = require('express');
var router = express.Router();
var User = require("../modules/user.js");
var Project = require("../modules/project.js");
var func = require("../lib/func.js");
/* GET home page. */
router.get('/', function(req, res, next) {
	var projects = Project.get();
	var ip = func.getIp(req);
	var user = User.get(ip);
    if(!user){
        user = User.create(ip);
    }
    res.render('index', 	{
				title: '选择当前项目',
				projects:projects,
				user:user
			 });
});

router.get('/modify',function(req, res, next){
	var projects = Project.get();
	var ip = func.getIp(req);
	var user = User.get(ip);
	res.render('modify',{
				title: '修改/新建项目',
				projects:projects,
				user:user
    });
});

module.exports = router;

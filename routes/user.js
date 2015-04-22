var express = require('express');
var router = express.Router();
var fs = require('fs');
var confPath = "/data/nodejs/expressDemo/conf/user.conf.json";
var util = require("../lib/func.js");
var User = require("../modules/user.js");
var Project = require("../modules/project.js");
router.put("/",function( req, res, next ) {
	var remoteIp =  util.getIp( req );
	var result = User.get( remoteIp );
	res.send( result);
});


router.delete("/",function( req, res, next ) {
	
});


router.post("/",function( req, res, next ) {
	var remoteIp =  util.getIp( req );
	var projectId= req.body.projectId;
	var result = User.update(remoteIp,{
				currentProject:projectId
				});
	if( result ){
		res.send("ok");	
	}else{
		res.send("修改失败");
	}
});


router.get("/",function( req, res, next ) {
	var remoteIp =  util.getIp( req );
	var result = User.get( remoteIp );
	res.send( result);

});

module.exports = router;

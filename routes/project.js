var express = require('express');
var router = express.Router();
var fs = require('fs');
var confPath = "/data/nodejs/expressDemo/conf/project.conf.json";
var util = require("../lib/func.js");
var User = require("../modules/user.js");
var Project = require("../modules/project.js");

router.put("/",function( req, res, next ) {
	var remoteIp =  util.getIp( req );
    var name = req.body.name;
    var ownerId = remoteIp;
    var rewrite = req.body.rewrite;
        rewrite = JSON.parse(rewrite); 
    console.log( rewrite); 
     
    var result = Project.create(name,ownerId,rewrite);
    if( result ){
		res.send("ok");	
	}else{
		res.send("创建失败");
	}
});


router.delete("/",function( req, res, next ) {
    var projectId = req.body.projectId;
    var result = Project.del(projectId);
    if(result){
        res.send("ok");
    }else{
        res.send("删除失败");
    }	
});


router.post("/",function( req, res, next ) {
	var projectId= req.body.projectId;
    var opt = {
            projectId:req.body.projectId,
            name:req.body.name,
            rewrite: JSON.parse(req.body.rewrite)
        };   
    console.log( opt );
 	var result =  Project.update(projectId,opt);
	if( result ){
		res.send("ok");	
	}else{
		res.send("修改失败");
	}
});


router.get("/",function( req, res, next ) {
    var projectId = req.query.projectId;
	var result = Project.get( projectId);
	if( result ){
		res.send(result);	
	}else{
		res.send("获取失败");
	}

});

module.exports = router;

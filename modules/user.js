var fs = require('fs');  
var conf_user = __dirname + "/../conf/user.conf.json";
var conf_project = __dirname + "/../conf/project.conf.json";
var func =  require("../lib/func.js");    
function create( ip,name,type,currentProject ){
	if( !ip )return false;

	var user = require( conf_user);
	if( user[ip] ) return false;		
	
	user[ip] = {
		"type":type || "normal",
		"name":name || ip,
		"ip":ip,
		"currentProject":currentProject || ""	
	};	
	fs.writeFileSync(conf_user, JSON.stringify(user,null,'\t')); 
	return true;  
}

function update(ip,opt){
	if( !ip )return false;	
	var user = require( conf_user);  
	if( !user[ip] ) return false;
	for( var p in opt ){
		if(typeof user[ip][p] != "undefined" )
		{
			user[ip][p] = opt[p];
		}
	}  
	fs.writeFileSync(conf_user, JSON.stringify(user,null,'\t'));
	return true;	
}

function get(ip){
	var user = require( conf_user);
	if(ip)
	{
		return user[ip]||false;
	}
	return user;	
}

function del(ip){
	var user = require( conf_user); 
	if(!ip || !user[ip]) return false;
	delete user[ip];
	fs.writeFileSync(conf_user, JSON.stringify(user,null,'\t'));
	return true;		
}

exports.create = create;
exports.update = update;
exports.get=get;
exports.del = del;

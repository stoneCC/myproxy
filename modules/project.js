var fs = require('fs');  
var conf_user = __dirname + "/../conf/user.conf.json";
var conf_project = __dirname + "/../conf/project.conf.json";
var func =  require("../lib/func.js");    
function create( name,ownerId,rewrite ){
	if( !name || !ownerId  )return false;

	var projects  = require( conf_project);
	var projectId = func.guid(); 	
	projects[projectId] = {
		"owner":ownerId,
		"name":name,
		"rewrite":rewrite
	};	
	fs.writeFileSync(conf_project, JSON.stringify(projects,null,'\t')); 
	return true;  
}

function update(projectId,opt){
	if( !projectId )return false;	
	var projects= require( conf_project);  
	if( !projects[projectId] ) return false;
	for( var p in opt ){
		if(typeof projects[projectId][p] != "undefined" )
		{
			projects[projectId][p] = opt[p];
		}
	}  
	fs.writeFileSync(conf_project, JSON.stringify(projects,null,'\t'));
	return true;	
}

function get(projectId){
	var projects= require( conf_project);
	if(projectId)
	{
         projects[projectId]['projectId']=projectId;
		return projects[projectId]||false;
	}
	return projects;	
}

function del(projectId){
	var projects= require( conf_project); 
	if(!projectId|| !projects[projectId]) return false;
	delete projects[projectId];
	fs.writeFileSync(conf_project, JSON.stringify(projects,null,'\t'));
	return true;		
}

exports.create = create;
exports.update = update;
exports.get=get;
exports.del = del;

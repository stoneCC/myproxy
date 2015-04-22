/**
 *auth:changchuan
 *qq:29995716
 *date: 2015-03-11
 *detail: 本地开发静态文件代理服务器，配置指定域名及本地目录，如果本地文件存在则访问本地的文件，否则访问线上文件
 */

var func = require('./func.js');
var nodeStatic = require('node-static').Server;
var request = require("request");
var dns = require("dns");
var http = require("http");

var conf_user = require("../conf/user.conf.json");
var conf_project = require("../conf/project.conf.json");
var conf_hosts = require("../conf/hosts.conf.json");

require("../server.js");

var servers = {};
for( var projectId in conf_project)
{
    servers[projectId] = {};
    var project = conf_project[projectId];
    var projectRewrite = project['rewrite']||{};
    for(var host in projectRewrite){
		var arr = host.match(/(http(s)?:\/\/)?([^\.]*\.[^\.]*\.[^\.\/]*)([^\?]*)/);
		var url = arr[3]+arr[4];
        servers[projectId][url] = new nodeStatic(projectRewrite[host]);
    }
}
var httpServer = http.createServer(function(req, res) {
      req.addListener('end', function() {

        var user = func.getClientIp(req);
        var projectId = conf_user[user]["currentProject"];
        var host = req.headers.host;
		console.log( req.url );
		
		fileServer = false;
		
		var path = req.url;
		for(var h in servers[projectId])
		{
			var url = host+ req.url;			
			if(url.indexOf(h) == 0)
			{
				fileServer = servers[projectId][h];
				req.url = req.url.replace(h.replace(host,''),'');
				req.url = req.url[0]=='/' ? req.url : '/' + req.url;
				break;
			}
		}
        

        if(!fileServer){
					req.url = path;
					var ip = conf_hosts[host];
                    var p = 'http://'+ip+req.url;
                    req.headers['Host'] = req.headers.host;
                    request({
                        method:req.method,
                        url:p,
                        headers:req.headers
                    }).pipe(res);
             return ;
        }
		
		

        fileServer.serve(req, res, function(err, result) {			
            if (err && (err.status === 404)) {
            //本地没有文件访问线上，透明server
			req.url = path;
           var ip = conf_hosts[host];
                    var p = 'http://'+ip+req.url;
                    req.headers['Host'] = req.headers.host;
                    request({
                        method:req.method,
                        url:p,
                        headers:req.headers
                    }).pipe(res);
             return ;
            }
        });


    }).resume();
});
httpServer.listen(80);


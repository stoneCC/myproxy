#!/usr/bin/env node   
/**
 *依赖加载
 **/
var app = require("./app");
var debug = require('debug')('nodejs-demo:server');
var http = require('http');

/**
 *定义启动端口
 **/
var port = normalizePort(process.env.PORT || '81');
app.set('port',port);

//创建http服务器实例
var server = http.createServer(app);

//启动网络服务监听端口
server.listen(port);
server.on('error',onError);
server.on('listening',onListening);

//端口标准化函数
function normalizePort(val){
	var port = parseInt(val,10);
	if(isNaN(port)){
		return val;
	}
	if(port >=0)
	{
		return port;
	}
	return false;
}

//HTTP 异常处理函数
function onError(error){
	if(error.syscall !== 'listen'){
		throw error;
	}

	var bind = typeof port === 'string'
	? 'Pipe ' + port
	: 'Port ' + port;

	switch (error.code){
		case 'EACCES':
			console.error(bind + ' requires elevated privileges');
			process.exit(1);
			break;
		case 'EADDRINUSE':
			console.error(bind + ' is already in use');
			process.exit(1);
			break;
		default:
			throw error;
	}
}

//事件绑定函数
function onListening(){
	var addr = server.address();
	var bind = typeof addr === 'string'
		?'pipe'	+ addr
		:'port' + addr.port;
	debug('listening on' + bind);
}

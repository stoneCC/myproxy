/**
 *
 *获取客户端ip
 */
function getClientIp(req) {
    var remoteIp =  req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;

    remoteIp = remoteIp.match(/\d+\.\d+\.\d+\.\d+/);
 
    return remoteIp.length?remoteIp[0]:'';
};

exports.getClientIp = getClientIp;
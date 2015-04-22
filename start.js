var child_process = require('child_process');
child_process.exec('node server.js', function(err, stdout, stderr) {
  console.log(stdout);
});
child_process.exec('node bin/proxy.js', function(err, stdout, stderr) {
  console.log(stdout);
});

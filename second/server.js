var http = require("http");
http.createServer(function(request,response){
  response.writeHead(200,{"Content-type":"text/plan"});
  response.end("hello peter");
}).listen(8099);

console.log("listen 8099 is run");

/**
 * Created by sagun on 6/27/17.
 */

const http = require ('http');
const hostname = 'localhost';
const port = 3000;

http.createServer(function(req,res){
    res.writeHead(200,{'Content-Type':'text/plain'});
    res.end("Hello world\n");

}).listen(port,hostname,function(){
    console.log("Server is running at port 3000");
});
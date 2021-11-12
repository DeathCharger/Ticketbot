var http = require('http');  

http.createServer(function (req, res) {   
    res.write("BOT STARTED!!");  
    res.end(); 
  }).listen(8080);

/* 
This hosts a http server in local host
*/

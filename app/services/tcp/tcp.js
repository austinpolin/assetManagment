let saveClinetData = require('../storage/casendraStorage');
function init(netModule, settings){
        let server = netModule.createServer();
        
            console.log("Service run and server");
            server.on('connection', handleConnection);
    
            server.listen(settings.port, function() {
                console.log('server listening to %j', server.address());
            });
    
            function handleConnection(conn) {
                var remoteAddress = conn.remoteAddress + ':' + conn.remotePort;
    
                conn.setEncoding('utf8');
    
                conn.on('data', onConnData);
                conn.once('close', onConnClose);
                conn.on('error', onConnError);
    
                function onConnData(req) {
                    try {
                        var Req = JSON.parse(req);
                        console.log("Tcp Requested Data: " + JSON.stringify(Req));
                        var objLeng = Object.keys(Req).length;
                        console.log("Object Leng: " + objLeng);
                        if(objLeng === 1){
                            console.log("Check Imei in Mysql: ");
                            var rep = '{"status": 0,"config": { "uptime": 5}}';
                            
                            conn.write(rep);
                            //conn.destroy();
                        }else{
                            console.log("Save data in casendra")
                        }
                    }catch(err){
                        console.log(err);
                        conn.destroy();
                    }
                    
                }
    
                function onConnClose() {
                    console.log('connection from %s closed', remoteAddress);
                }
    
                function onConnError(err) {
                    console.log('Connection %s error: %s', remoteAddress, err.message);
                }
            }
    
        
    
}

module.exports.init = init;
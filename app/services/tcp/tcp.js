let saveClinetData = require('../storage/casendraStorage');
let checkdevice = require('../storage/CheckDevice');
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
                            checkdevice.checkDeviceTcp(Req).then((data, err)=>{
                                console.log("Responce check device: " + data)
                                if(data == 1){
                                    var res = '{"status": 1}'
                                    conn.write(res);
                                    conn.destroy();
                                }else{
                                    conn.write(data);
                                    conn.destroy();
                                }
                            });
                        }else{
                            saveClinetData.TcpstoreData(Req).then((data)=> {
                                console.log("Responce from TCP store function: " + data)
                                if(data == 1){
                                    var res = '{"status": 1}'
                                    conn.write(res);
                                    conn.destroy();
                                }else{
                                    conn.write(data);
                                    conn.destroy();
                                }

                            });
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
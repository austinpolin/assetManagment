const db = require('../../../config/mysql');
const dbFunc = require('../../../config/db-function');

function checkDevice(serial, macAdd){
    console.log("Checking device: " + serial + macAdd);
    if(serial && macAdd){
        return new Promise((resolve,reject) => {
            db.query('select serial from deviceDetial where serial="'+macAdd+'" AND bleType=2',(err,rows,fields)=>{
                if(err){
                    console.log("Mysql error in check device: " + err);
                    reject(1);
                }else if(!err && rows){
                    console.log(JSON.stringify(rows));
                    if(rows.length === 0){
                        console.log("Revicer mac address not registerd");
                        reject(1);
                    }else{
                        db.query('select serial from deviceDetial where serial="'+serial+'" AND bleType=3', (err,rows, fields)=>{
                            if(err){
                                console.log("Mysql error in check device: " + err);
                                reject(1);
                            }else if(!err && rows){
                                if(rows.length === 0){
                                    console.log("Ble mac address not registerd");
                                    reject(1);
                                }else{
                                    resolve(0);
                                }
                            }
                        });
                        
                    }
                }
            });
        });

    }else if(serial && !macAdd){
  
    }else{
  
    }
  
}

module.exports.checkDevice = checkDevice;
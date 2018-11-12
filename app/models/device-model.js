let db = require('../../config/mysql');
let dbFunc = require('../../config/db-function');
let messages = require('../schema/responceSchema.json');

var deviceModel = {
    getAllDevice:getAllDevice,
    addDevice:addDevice,
    updateDevice:updateDevice,
    deleteDevice:deleteDevice,
    getDeviceById:getDeviceById
 }


 function addDevice(device, id) {
     console.log(id)
     var bletype ;
     if(device.bleType){
         bletype = device.bleType
     }else{
        bletype = null;
     }
    return new Promise((resolve,reject) => {
        db.query("select serial from deviceDetial where serial='"+device.serial+"'",(err,rows,fields)=>{
            if(err) {
                dbFunc.connectionRelease;
                var errmsg = messages.errorMsg.dbProblem;
                errmsg["details"] = err;
                reject(errmsg);
            } else if(!err && rows) {
                console.log("ROws Data for add device: " +  JSON.stringify(rows));
                if(rows.length > 0){
                    reject(messages.errorMsg.allredyexits)
                }else{
                    db.query('INSERT INTO `deviceDetial` ( `type`, `serial`, `name`, `uid`, `bleType`, `active`) VALUES ( '+device.type+', "'+device.serial+'", "'+device.name+'", '+id+', '+bletype+', 1)', (err, rows)=>{
                        if(err) {
                            dbFunc.connectionRelease;
                            var errmsg = messages.errorMsg.dbProblem;
                            errmsg["details"] = err;
                            reject(errmsg);
                        } else {
                            dbFunc.connectionRelease; 
                            resolve(messages.successMsg.created);
                        }
                    });
                }

            }
        })
    });
 }

 function  getAllDevice(){
    return new Promise((resolve,reject) => {
        db.query(`select id, type, serial, name, bleType from deviceDetial where active =1`,(err,rows,fields)=>{
            if(!!err) {
                dbFunc.connectionRelease;
                var errmsg = messages.errorMsg.dbProblem;
                errmsg["details"] = err;
                reject(errmsg);
            } else {
                dbFunc.connectionRelease;
                var succmsg = messages.successMsg.getAll;
                succmsg["list"] = rows;
                resolve(succmsg);
            }
       });
    });
 }

 function updateDevice(id, data){

 }

 function deleteDevice(id){
    return new Promise((resolve,reject) => {
        db.query('select id from deviceDetial where id='+id+'', (err, rows)=>{
            if(!!err) {
                dbFunc.connectionRelease;
                var errmsg = messages.errorMsg.dbProblem;
                errmsg["details"] = err;
                reject(errmsg);
            } else {
                if(rows.length === 0){
                    reject(messages.errorMsg.doesnotExits);
                }else{
                    db.query('update deviceDetial set active=0 where id='+id+'', (err, rows)=>{
                        if(!!err) {
                            dbFunc.connectionRelease;
                            var errmsg = messages.errorMsg.dbProblem;
                            errmsg["details"] = err;
                            reject(errmsg);
                        } else {
                            console.log(JSON.stringify(rows.affectedRows));
                            if(rows.affectedRows === 1){
                                resolve(messages.successMsg.deleteData)
                            }
                        }
                    });
                }
            }
        });   
    });
 }

 function getDeviceById(id){
    return new Promise((resolve,reject) => {
        db.query('select id, type, serial, name, bleType from deviceDetial where id='+id.id+' AND active =1',(err,rows,fields)=>{
            if(!!err) {
                var errmsg = messages.errorMsg.dbProblem;
                errmsg["details"] = err;
                reject(errmsg);
            } else {
                dbFunc.connectionRelease;
                console.log("mushir: " + JSON.stringify(rows))
                if(rows.length === 0){
                    reject(messages.errorMsg.doesnotExits);
                }else{
                    var succmsg = messages.successMsg.getById;
                    succmsg["item"] =rows[0];
                    resolve(succmsg);
                }
                
            }
       });
    });


 }

 module.exports = deviceModel;
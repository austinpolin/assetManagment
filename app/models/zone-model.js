let db = require('../../config/mysql');
let dbFunc = require('../../config/db-function');
let messages = require('../schema/responceSchema.json');


var zoneModel = {
    getAllZone:getAllZone,
    addZone:addZone,
    updateZone:updateZone,
    deleteZone:deleteZone,
    getZoneById:getZoneById
 }


 function addZone(zone) {
     console.log("Zone data in model: " + JSON.stringify(zone));
     let name = zone.name;
     return new Promise((resolve,reject) => {
        db.query("select zoneName from zones where zoneName ='"+name+"'",(err,rows,fields)=>{
           if(err) {
               dbFunc.connectionRelease;
               var errmsg = messages.errorMsg.dbProblem;
               errmsg["details"] = err;
               reject(errmsg);
           } else {
               if(rows.length){
                    if(rows[0].zoneName === name){
                        console.log("check")
                        dbFunc.connectionRelease;
                        reject(messages.errorMsg.allredyexits)
                    }
               }else{
                    console.log(rows)
                    db.query("insert into zones set zoneName='"+name+"', active='1'", (err, rows) => {
                            if(err) {
                                dbFunc.connectionRelease;
                                var errmsg = messages.errorMsg.dbProblem;
                                errmsg["details"] = err;
                                reject(errmsg);
                            } else {
                                dbFunc.connectionRelease; 
                                resolve(messages.successMsg.created)
                            }
                    });
                }
           }
         });
     });
 }

 function  getAllZone(){
    return new Promise((resolve,reject) => {
        db.query(`SELECT id, zoneName from zones where active=1`,(err,rows,fields)=>{
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

 function updateZone(id, data){
    return new Promise((resolve,reject) => {
        console.log("Zone Data in update model function: " + JSON.stringify(data) + " id: " + id);
        db.query('select id from zones where id='+id+'', (err, rows)=>{
            if(!!err) {
                dbFunc.connectionRelease;
                var errmsg = messages.errorMsg.dbProblem;
                errmsg["details"] = err;
                reject(errmsg);
            } else {
                if(rows.length === 0){
                    dbFunc.connectionRelease;
                    reject(messages.errorMsg.doesnotExits);
                }else{
                    db.query('update zones set zoneName="'+data.name+'" where id='+id+'', (err, rows)=>{
                        if(!!err){
                            dbFunc.connectionRelease;
                            console.log("err in update zone: " + err)
                            var errmsg = messages.errorMsg.dbProblem;
                            errmsg["details"] = err;
                            reject(errmsg);
                        }else if(!err && rows){
                            console.log(JSON.stringify(rows));
                            if(rows.affectedRows === 1){
                                resolve(messages.successMsg.updateData)
                            }else{
                                reject(messages.errorMsg.dbProblem)
                            }
                        }
                    });
                }
            }
        })   
    })
 }

 function deleteZone(id){
    return new Promise((resolve,reject) => {
        db.query('select id from zones where id='+id+'', (err, rows)=>{
            if(!!err) {
                dbFunc.connectionRelease;
                var errmsg = messages.errorMsg.dbProblem;
                errmsg["details"] = err;
                reject(errmsg);
            } else {
                if(rows.length === 0){
                    reject(messages.errorMsg.doesnotExits);
                }else{
                    db.query('update zones set active=0 where id='+id+'', (err, rows)=>{
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

 function getZoneById(id){
     console.log("id" + JSON.stringify(id) );
    return new Promise((resolve,reject) => {
        db.query('SELECT id, zoneName FROM zones WHERE id ='+id.id+' AND active=1',(err,rows,fields)=>{
            if(!!err) {
                var errmsg = messages.errorMsg.dbProblem;
                errmsg["details"] = err;
                reject(errmsg);
            } else {
                dbFunc.connectionRelease;
                console.log(rows.length)
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

 module.exports = zoneModel;
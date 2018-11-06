let db = require('../../config/mysql');
let dbFunc = require('../../config/db-function');
let messages = require('../schema/responceSchema.json');
let uniqid = require('uniqid');

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
     let code = uniqid(name+'-');

     return new Promise((resolve,reject) => {
        db.query("select zoneName from zones where zoneName ='"+name+"'",(err,rows,fields)=>{
           if(err) {
               dbFunc.connectionRelease;
               reject(err);
           } else {
               if(rows.length){
                    if(rows[0].zoneName === name){
                        console.log("check")
                        dbFunc.connectionRelease;
                        reject(messages.errorMsg.allredyexits)
                    }
               }else{
                    console.log(rows)
                    db.query("insert into zones set zoneName='"+name+"'", (err, rows) => {
                            if(err) {
                                dbFunc.connectionRelease;
                                reject(err);
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
        db.query(`SELECT * from zones`,(error,rows,fields)=>{
            if(!!error) {
                dbFunc.connectionRelease;
                reject(error);
            } else {
                dbFunc.connectionRelease;
                var succmsg = messages.successMsg.getAll;
                succmsg["list"] = rows;
                console.log(succmsg)
                resolve(succmsg);
            }
       });
    });
 }

 function updateZone(){

 }

 function deleteZone(){

 }

 function getZoneById(id){
     console.log("id" + JSON.stringify(id) );
    return new Promise((resolve,reject) => {
        db.query("SELECT * FROM zones WHERE id ="+id.id,(error,rows,fields)=>{
            if(!!error) {
                dbFunc.connectionRelease;
                reject(error);
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
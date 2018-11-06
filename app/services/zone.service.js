var zoneModel = require("../models/zone-model");


var zoneService = {
    getAllZone:getAllZone,
    addZone:addZone,
    updateZone:updateZone,
    deleteZone:deleteZone,
    getZoneById:getZoneById
}

function addZone(zoneData){
    console.log("In service: " + JSON.stringify(zoneData))
    return new Promise((resolve,reject) => {
        zoneModel.addZone(zoneData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
}

function getAllZone(){
    return new Promise((resolve,reject) => {
        zoneModel.getAllZone().then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    });
}

function updateZone(){

}

function deleteZone(){

}

function getZoneById(id){
    return new Promise((resolve,reject) => {
        zoneModel.getZoneById(id).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    });
}

module.exports = zoneService;
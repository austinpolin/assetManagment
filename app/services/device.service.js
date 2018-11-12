var deviceModel = require("../models/device-model");


var deviceService = {
    getAllDevice:getAllDevice,
    addDevice:addDevice,
    updateDevice:updateDevice,
    deleteDevice:deleteDevice,
    getDeviceById:getDeviceById
}

function addDevice(deviceData, id){
    return new Promise((resolve,reject) => {
        deviceModel.addDevice(deviceData, id).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
}

function getAllDevice(){
    return new Promise((resolve,reject) => {
        deviceModel.getAllDevice().then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    });
}

function updateDevice(){

}

function deleteDevice(id){
    return new Promise((resolve,reject) => {
        deviceModel.deleteDevice(id).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
}

function getDeviceById(id){
  
    return new Promise((resolve,reject) => {
        deviceModel.getDeviceById(id).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    });
}

module.exports = deviceService;
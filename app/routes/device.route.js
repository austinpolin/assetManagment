const deviceService = require('../services/device.service');
const schema = require('../schema/deviceValidationSchema.json');
const iValidator = require('../../common/iValidator');
const errorCode = require('../../common/error-code');
const errorMessage = require('../../common/error-methods');

function init(router) {
    router.route('/device')
        .get(getAllDevice)
        .post(addDevice);
    router.route('/device/:id')
        .get(getDeviceById)
        .delete(deleteDevice)
        .put(updateDevice); 
}

function addDevice(req,res) {
    var deviceData =  req.body;
    var id = req.headers.userid;
    console.log("Device Data: " + JSON.stringify(deviceData));
    var json_format = iValidator.json_schema(schema.postSchema, deviceData, "device");
    if (json_format.valid == false) {
        return res.status(422).send(json_format.errorMessage);
     }
     deviceService.addDevice(deviceData, id).then((data) => {
        res.json(data)
    }).catch((err) => {
        res.status(err.error.statusCode).send(err);
    });
}

function getAllDevice(req, res){
    deviceService.getAllDevice().then((data) => {
        res.send(data);
      }).catch((err) => {
        res.send(err);
      });
}

function getDeviceById(req, res){
    let deviceid = req.params;
   
    var json_format = iValidator.json_schema(schema.getSchema,deviceid,"device");
    if (json_format.valid == false) {
        return res.status(422).send(json_format.errorMessage);
    }
    deviceService.getDeviceById(deviceid).then((data) => {
        res.send(data);
      }).catch((err) => {
        res.send(err);
      });
}

function deleteDevice(req, res){
    var delId = req.params.id;
    deviceService.deleteDevice(delId).then((data)=>{
      res.json(data);
    }).catch((err)=>{
        res.json(err);
    });
}

function updateDevice(req, res){
    var deviceData=req.body;
    var id = req.params.id;
    var json_format = iValidator.json_schema(schema.postSchema, deviceData, "device");
    if (json_format.valid == false) {
        return res.status(422).send(json_format.errorMessage);
     }
}


module.exports.init = init;
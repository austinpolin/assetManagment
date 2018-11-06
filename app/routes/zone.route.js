const zoneService = require('../services/zone.service');
const schema = require('../schema/zoneValidationSchema.json');
const iValidator = require('../../common/iValidator');
const errorCode = require('../../common/error-code');
const errorMessage = require('../../common/error-methods');

function init(router) {
    router.route('/zone')
        .get(getAllZone)
        .post(addZone);
    router.route('/zone/:id')
        .get(getZoneById)
        .delete(deleteZone)
        .put(updateZone); 
}

function addZone(req,res) {
    var zoneData = req.body;

    //Validating the input entity
    var json_format = iValidator.json_schema(schema.postSchema, zoneData, "zone");
    
    if (json_format.valid == false) {
       return res.status(422).send(json_format.errorMessage);
    }
    zoneService.addZone(zoneData).then((data) => {
        res.json(data)
    }).catch((err) => {
        res.status(err.error.statusCode).send(err);
    });
  
}

function getAllZone(req, res){
    zoneService.getAllZone().then((data) => {
        res.send(data);
      }).catch((err) => {
        res.send(err);
      });
}

function getZoneById(req, res){
    let zoneId = req.params;

    var json_format = iValidator.json_schema(schema.getSchema,zoneId,"zone");
    if (json_format.valid == false) {
      return res.status(422).send(json_format.errorMessage);
    }
  
    zoneService.getZoneById(zoneId).then((data) => {
        res.send(data);
      }).catch((err) => {
        res.send(err);
      });
}

function deleteZone(req, res){

}

function updateZone(req, res){

}


module.exports.init = init;
let saveClinetData = require('../storage/casendraStorage');

function init(client) {
  MqttSub(client);
}


function MqttSub(c) {
  c.on('connect', function () {
  c.subscribe('assetTopic');
  });
  c.on('message', function (topic, message) {
  const context = message;
  if (topic == "assetTopic"){
  saveClinetData.MqttstoreData(context);
 } else {
        console.log(topic + 'is invalid');
    }
    
  });
}


module.exports.init = init; 
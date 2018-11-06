const cassendra = require('../../../config/cassendra');

function storeData(clientData) {
  try {
    const data = JSON.parse(clientData.toString());
    const dataLeng = Object.keys(data).length;
    if (dataLeng === 3) {
      const uuids = data.uuid;
      const macAdd = data.zoneid;
      const rssis = data.rssi;
      const date = new Date().getTime();


      const qry = "INSERT INTO devicedataindoor (date , uuid , macadd , rssi ) VALUES ('"+date+"', '"+uuids+"', '"+macAdd+"', "+rssis+" )";
      cassendra.cassandraConn.execute(qry, function (err, result) {
        if (err){
                 console.log("Cassendra Error in select: " + err);
        }else if(!err && result){
                console.log("Mqtt Data updated for uuid: " + uuids);
        }
      });
    }
  } catch (err) {
    console.log("Can't able to parse the given object")
  }   
}

module.exports.storeData = storeData;

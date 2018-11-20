const cassendra = require('../../../config/cassendra');
const checkdevice = require('../storage/CheckDevice');
const date = new Date().getTime();
function MqttstoreData(clientData) {
  try {
    const data = JSON.parse(clientData.toString());
    const dataLeng = Object.keys(data).length;
    if (dataLeng === 3) {
      const uuids = data.uuid;
      const macAdd = data.zoneid;
      const rssis = data.rssi;
      

      checkdevice.checkDevice(uuids,macAdd).then((data, err)=>{
        console.log("Return data from check device flag: " + data)
        if(data === 0){
          const qry = "INSERT INTO devicedataindoor (date , uuid , macadd , rssi ) VALUES ('"+date+"', '"+uuids+"', '"+macAdd+"', "+rssis+" )";
          cassendra.cassandraConn.execute(qry, function (err, result) {
            if (err){
                    console.log("Cassendra Error in select: " + err);
            }else if(!err && result){
                    console.log("Mqtt Data updated for uuid: " + uuids);
            }
          });
        }
      }).catch((err) => {
        console.log("Reject data in return: " + err);
      });

    }
  } catch (err) {
    console.log("Can't able to parse the given object")
  }   
}

function TcpstoreData(data){
  return new Promise((resolve,reject) => {
     // console.log("data in tcp store: " + JSON.stringify(data));
      var checkImei = {"imei": data.imei};
      var imei = data.imei;
      var gpsData = data.GPS;
      checkdevice.checkDeviceTcp(checkImei).then((data)=>{
        console.log("check device imei: " + data);
          if(data === 1){
            resolve(1);
          }else{
           
            var gpsArry = gpsData.split(',')
            console.log("gps arry: " + gpsArry[0]);
            const qry = "INSERT INTO devicedataoutdoor (date , imei , latitude , longitude, altitude ) VALUES ('"+date+"', '"+imei+"', "+gpsArry[0]+", "+gpsArry[1]+", "+gpsArry[2]+" )";
            console.log("Outdoor data query: " + qry);
            cassendra.cassandraConn.execute(qry, function (err, result) {
              if (err){
                      console.log("Cassendra Error in select: " + err);
                      reject(1);
              }else if(!err && result){
                      console.log("Mqtt Data updated for uuid: " + imei);
                      console.log("result: " + JSON.stringify(result));
                      resolve(data)
              }
            });
          }
      });
  });
}

module.exports.MqttstoreData = MqttstoreData;
module.exports.TcpstoreData = TcpstoreData;
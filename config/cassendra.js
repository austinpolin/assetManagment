const cassandra = require('cassandra-driver');


module.exports.cassandraConn = new cassandra.Client({ contactPoints: ['127.0.0.1'], keyspace: 'assetmanagement' });

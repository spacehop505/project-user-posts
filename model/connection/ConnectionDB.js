const mongoose = require('mongoose');
// 
// "mongodb://localhost:27019/user-db?retryWrites=false"
//mongoose.connect("mongodb://DESKTOP-O5RL7HC:27017,DESKTOP-O5RL7HC:27018,DESKTOP-O5RL7HC:27019/user-db?replicaSet=rs", {
// `mongodb://localhost:30001,localhost:30002,localhost:30003/test`
mongoose.connect("mongodb://localhost:30001,localhost:30002,localhost:30003/user-db?replicaSet=my-mongo-set&readPreference=secondary", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => { console.log('Connected successfull'); })
  .catch((err) => console.log('\nConnected Failed ' + err));

mongoose.set('debug', true);


module.exports = mongoose.connection;

// docker run --name mongodb -d -p 27017:27018 mongo
// docker run -p 30002:27017 --name mongo2 --net my-mongo-cluster mongo mongod --replSet my-mongo-set

// rs.status()

//  mongod --port 2717 --dbpath /mongos/db1 --replSet myReplicaSet

// rs.printReplicationInfo()
// cat /etc/hosts
// rs.secondaryOk()

config = { "_id": "docker-rs", "members": [{ "_id": 0, "host": "mongo1:9042" }, { "_id": 1, "host": "mongo2:9142" }, { "_id": 2, "host": "mongo3:9242" }] }



//rs.initiate({ "_id": "my-mongo-cluster", "members": [{ "_id": 0, "host": "localhost:30001" }, { "_id": 1, "host": "localhost:30002" }, { "_id": 2, "host": "localhost:30003" }] })


config = { "_id": "my-mongo-set", "members": [{ "_id": 0, "host": "192.168.0.4:30001" }, { "_id": 1, "host": "192.168.0.4:30002" }, { "_id": 2, "host": "192.168.0.4:30003" }] }
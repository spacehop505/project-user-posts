const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017,localhost:30002,localhost:30003/user-db?replicaSet=my-mongo-replica-set", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then((res) => { console.log('Connected successfull '); })
  .catch((err) => console.log('\nConnected Failed ' + err));

mongoose.set('debug', true);


module.exports = mongoose.connection;


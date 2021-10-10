const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/user-db", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => { console.log('Connected successfull'); })
  .catch((err) => console.log('Connected successfull' + err));

mongoose.set('debug', true);


module.exports = mongoose.connection;
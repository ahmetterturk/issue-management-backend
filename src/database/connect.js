// importing mongoose
const mongoose = require('mongoose');

// cretae connectDB function to connect the mongoose to the database
const connectDB = (url) => {
  return mongoose.connect(url);
};
// export the connctDB method
module.exports = connectDB;

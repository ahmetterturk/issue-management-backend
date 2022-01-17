// calling dotenv .config to configure env file for reading the keys
require('dotenv').config();
const express = require('express');
const app = express();
// import connectDB from database dir
const connectDB = require('./src/database/connect');
// import cors
const cors = require('cors');
//importing express fileUpload
const fileUploader = require('express-fileupload');
// impoert the cloudinary
const cloudinary = require('cloudinary').v2;
// cloudinary configuration, cloud name, api key and api secret key
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// port
const PORT = process.env.PORT || 5000;

// creating corsOption object for origin credentials and optionalSuccessStatus
const corsOption = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
};

// middleware
// with "use" method we configure a middlware which is used by express http server and pass express.json to be used by our app
app.use(express.json());
// with "use" method we configure a middlware which is used by express http server and pass cors with corsOptions to be used by our app
app.use(cors(corsOption));
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  next();
});
// with "use" method we configure a middlware which is used by express http server and fileUploader and set useTempFile to true to user the temporary files
app.use(fileUploader({ useTempFiles: true }));

// importing userRouter
const userRouter = require('./src/routes/userRoutes');
// with "use" method we configure a middlware which is used by express http server and pass the userRouter to be used by express
app.use('/user', userRouter);

// importing issuesRouter
const issuesRouter = require('./src/routes/issuesRoutes');
// with "use" method we configure a middlware which is used by express http server and pass the isseusRouter to be used by express
app.use('/issues', issuesRouter);

// importing messageRouter
const messagesRouter = require('./src/routes/messagesRoutes');
// with "use" method we configure a middlware which is used by express http server and pass the messagesRouter to be used by express
app.use('/messages', messagesRouter);

// creating start fundtion to invoke the connectDB function and passing the atlas database uri and invoke app listen to sync both method one after another
const start = () => {
  try {
    connectDB(process.env.DATABASE_URI);
    console.log('database is connected');
    app.listen(PORT, () => {
      console.log(`server is running on port ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
};

// calling start method
start();

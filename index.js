require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require('./src/database/connect');
const cors = require('cors');
// for uploading file
const fileUploader = require('express-fileupload');
// using cloudinary to store images
const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const PORT = process.env.PORT || 5000;

const corsOption = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
};

// middleware
app.use(express.json());
app.use(cors(corsOption));
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  next();
});
app.use(fileUploader({ useTempFiles: true }));

//user router
const userRouter = require('./src/routes/userRoutes');
app.use('/user', userRouter);

// issue router
const issuesRouter = require('./src/routes/issuesRoutes');
app.use('/issues', issuesRouter);

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

start();

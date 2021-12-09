require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require('./src/database/connect');

const PORT = process.env.PORT || 5000;

// middleware
app.use(express.json());

// auth firebase
const firebaseAdmin = require('firebase-admin');
firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(
    JSON.parse(process.env.GOOGLE_FIREBASE_ADMIN)
  ),
});

// issue router
const issuesRouter = require('./src/routes/issuesRoutes');

app.use('/issues', issuesRouter);

// user router
const userRouter = require('./src/routes/userRoutes');
app.use('/users', userRouter);

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

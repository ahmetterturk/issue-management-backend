require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require('./src/database/connect');

const PORT = process.env.PORT || 5000;

// middleware
app.use(express.json());

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

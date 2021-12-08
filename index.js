const express = require('express');
const app = express();

const PORT = process.env.PORT || 5000

// middleware 
app.use(express.json())


// issue router 
const issuesRouter = require('./src/routes/issuesRoutes');

app.use('/issues', issuesRouter)


app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})
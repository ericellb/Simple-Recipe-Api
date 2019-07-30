let mongoose = require('mongoose');
let express = require('express');
let cors = require('cors');
var path = require('path');
let app = express();
let bodyParser = require('body-parser');

let authRoute = require('./routes/auth');
let recipeRoute = require('./routes/recipe');
let recipeSubmissionRoute = require('./routes/recipeSubmission');
let RateLimiter = require('./rateLimiter');

const { server } = require('../config');
const { database } = require('../config');
const { user } = require('../config');
const { password } = require('../config');

mongoose.connect(`mongodb+srv://${user}:${password}@${server}/${database}`);
var connection = mongoose.connection;
connection.on('connected', () => {
  console.log('connected to db');
})

const PORT = process.env.PORT || 3001;

// listen on port
app.listen(PORT, () => console.log(`Server has started on port ${PORT}`));

var limit = new RateLimiter();


app.disable('x-powered-by');
app.use(cors());
app.use(bodyParser.json());

// log routes requested
app.use((req, res, next) => {
  console.log(`${new Date().toString()} => ${req.originalUrl}`);
  next();
});

// Ratelimit requests
// no more than 5 every 10 sec
app.use((req, res, next) => {
  limit.rateLimit(req, res, next);
})

// recipe route
app.use(authRoute);
app.use(recipeRoute);
app.use(recipeSubmissionRoute);

// 404
app.use((req, res, next) => {
  res.status(404).send('Invalid API endpoint');
});

// 500
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.sendFile(path.join(__dirname, '../public/500.html'));
});
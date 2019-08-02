let mongoose = require('mongoose');
let express = require('express');
let cors = require('cors');
var path = require('path');
let app = express();
let bodyParser = require('body-parser');

let authRoute = require('./routes/auth');
let adminRoute = require('./routes/admin');
let usersRoute = require('./routes/users');
let recipeRoute = require('./routes/recipe');
let recipeSubmissionRoute = require('./routes/recipeSubmission');
let RateLimiter = require('./rateLimiter');

const server = process.env.MONGODB_URI;
const database = process.env.MONGODB_DB;
const user = process.env.MONGODB_USER;
const password = process.env.MONGODB_PASSWORD;

console.log(`${process.env.MONGODB_URI} - ${process.env.MONGODB_DB} - ${process.env.MONGODB_USER}`);

mongoose.connect(`mongodb+srv://${user}:${password}@${server}/${database}`, { useNewUrlParser: true });
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
app.use(usersRoute);
app.use(adminRoute);
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
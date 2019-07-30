let express = require('express');
let cors = require('cors');
var path = require('path');
let app = express();
let recipeRoute = require('./routes/recipe');
let recipeSubmissionRoute = require('./routes/recipeSubmission');
let RateLimiter = require('./rateLimiter');
let bodyParser = require('body-parser');
const PORT = process.env.PORT || 3001;

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

// listen on port
app.listen(PORT, () => console.log(`Server has started on port ${PORT}`));
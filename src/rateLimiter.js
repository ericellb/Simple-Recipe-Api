class RateLimiter {

  constructor() {
    this.requests = [];
  }

  rateLimit(req, res, next) {
    // Get IP and Current Time
    const newRequest = {
      ip: req.ip,
      date: new Date().getTime()
    }

    // Push new user into users
    this.requests.push(newRequest);

    // Check if more than x instances of users exist
    this.checkAbuse(req, res, next);

  }

  checkAbuse(req, res, next) {
    // Delete all entries more than 10 sec
    let curDate = new Date().getTime();
    for (let request in this.requests) {
      if ((this.requests[request].date + 10000) < curDate)
        this.requests.splice(request, 1);
    }

    let numbInvalidRequest = 0;
    for (let request in this.requests) {
      if (this.requests[request].ip === req.ip)
        numbInvalidRequest++;
    }
    if (numbInvalidRequest > 10)
      res.status(429).send('Too many Requests');
    else
      next();
  }

}

module.exports = RateLimiter;
let { AdminModel } = require('../models/admins.model');
let express = require('express');
let router = express.Router();


router.get('/auth', (req, res) => {
  // Returns true if userId is in admin collection
  if (req.query.userId) {
    AdminModel.find({ userId: req.query.userId }, (err, docs) => {
      if (docs.length !== 0)
        res.send(true);
      else
        res.send(false);
    });
  }
  else {
    res.send('Please specify either a param of userId')
  }
});

router.post('/auth', (req, res) => {
  const { userId, newAdminId } = req.query;
  if (userId && newAdminId) {
    AdminModel.find({ userId: userId }, (err, docs) => {
      if (docs.length !== 0) {
        AdminModel.collection.insertOne({ userId: newAdminId })
          .then(() => res.status(201).send(`User with id ${newAdminId} added`))
          .catch((err) => res.status(401).send(err.errmsg))
      }
      else
        res.status(401).send('Non authorized endpoint');
    });
  }
  else {
    res.send('Please specify userId and newAdminId')
  }
})

router.delete('/auth', (req, res) => {
  const { userId, newAdminId } = req.query;
  if (userId && newAdminId) {
    AdminModel.find({ userId: userId }, (err, docs) => {
      if (docs.length !== 0) {
        AdminModel.collection.deleteOne({ userId: newAdminId })
          .then(() => res.status(201).send(`User with id ${newAdminId} deleted`))
          .catch((err) => res.status(401).send(err.errmsg))
      }
      else
        res.status(401).send('Non authorized endpoint');
    });
  }
  else {
    res.send('Please specify userId and newAdminId')
  }
})

module.exports = router;
let { AdminModel } = require('../models/admins.model');
let express = require('express');
let router = express.Router();


const getAdmin = async (userId) => {
  return AdminModel.findOne({ userId: userId }, async (err, docs) => {
    if (docs !== null)
      return true;
    else
      return false;
  });
}

// Returns true if userId in Admin Collection
router.get('/admin', async (req, res) => {
  const { userId } = req.query;
  const isAdmin = await getAdmin(userId);
  if (isAdmin) {
    AdminModel.find({}, (err, docs) => {
      res.send(docs);
    })
  }
});

// Allows you to create new Admin if you are admin
router.post('/admin', async (req, res) => {
  const { userId, newAdminId } = req.query;
  if (userId && newAdminId) {
    const isAdmin = await getAdmin(userId);
    if (isAdmin) {
      AdminModel.collection.insertOne({ userId: newAdminId })
        .then(() => res.status(201).send(`User with id ${newAdminId} added`))
        .catch((err) => res.status(401).send(err.errmsg))
    }
    else {
      res.status(401).send('Non authorized endpoint');
    }
  }
  else {
    res.send('Please specify userId and newAdminId')
  }
})

router.delete('/admin', async (req, res) => {
  const { userId, newAdminId } = req.query;
  if (userId && newAdminId) {
    const isAdmin = await getAdmin(userId);
    if (isAdmin) {
      AdminModel.collection.deleteOne({ userId: newAdminId })
        .then(() => res.status(201).send(`User with id ${newAdminId} deleted`))
        .catch((err) => res.status(401).send(err.errmsg))
    }
    else
      res.status(401).send('Non authorized endpoint');
  }
  else {
    res.send('Please specify userId and newAdminId')
  }
})

module.exports = router;
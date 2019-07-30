let { UserModel } = require('../models/users.model');
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


router.get('/users', async (req, res) => {
  const isAdmin = await getAdmin(req.query.userId);
  if (isAdmin) {
    UserModel.find({}, (err, docs) => {
      res.status(200).send(docs);
    })
  }
  else
    res.status(401).send('Non authorized endpoint');
})

router.post('/users', (req, res) => {
  const { userId, name, email } = req.query;
  if (userId || name || email) {
    UserModel.collection.insertOne({
      userId: userId,
      name: name,
      email: email
    });
    res.status(200).send('Success');
  }
  else {
    res.status(400).send('Invalid Params!');
  }
})


module.exports = router;
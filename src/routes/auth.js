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
router.get('/auth', async (req, res) => {
  const { userId } = req.query;
  const isAdmin = await getAdmin(userId);
  (isAdmin ? res.status(200).send(true) : res.status(200).send(false));
});


module.exports = router;
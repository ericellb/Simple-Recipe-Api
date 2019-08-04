let { RecipeModel } = require('../models/recipes.model');
let _ = require('lodash');
let express = require('express');
let router = express.Router();

router.get('/recipes', (req, res) => {
  // Return recipes of specific filter query
  if (req.query.foodFilter) {
    let from = req.query.from;
    let to = req.query.to;
    from = (from === undefined ? 0 : from)
    to = (to === undefined ? from + 12 : to)
    RecipeModel.find({ type: req.query.foodFilter }, (err, docs) => {
      res.status(200).send(docs.slice(from, to));
    });
  }
  // Return 1 recipe with given ID
  else if (req.query.id) {
    console.log(req.query.id);
    RecipeModel.find({ _id: req.query.id }, (err, docs) => {
      res.status(200).send(docs);
    })
  }
  // Return all recipes only the title, description and type
  // used for frontend autocomplete dictionary
  else if (req.query.dictionary === '1') {
    RecipeModel.find({}, 'title description type', (err, docs) => {
      res.status(200).send(docs);
    });
  }
  else {
    res.send('Please specify either a param of id, foodType, cuisineType or dictionary')
  }
});

module.exports = router;
let { RecipeModel, RecipeSubmissionModel } = require('../models/recipe.model');
let express = require('express');
let router = express.Router();

router.get('/recipes', (req, res) => {
  // Return recipes of specific cuisineType
  if (req.query.cuisineType) {
    RecipeModel.find({ type: req.query.cuisineType }, (err, docs) => {
      res.send(docs);
    });
  }
  // Return recipes of specific foodType
  else if (req.query.foodType) {
    RecipeModel.find({ type: req.query.foodType }, (err, docs) => {
      res.send(docs);
    });
  }
  else if (req.query.id) {
    console.log(req.query.id);
    RecipeModel.find({ _id: req.query.id }, (err, docs) => {
      res.send(docs);
    })
  }
  // Return all recipes only the title, description and type
  // used for frontend autocomplete
  else if (req.query.dictionary === '1') {
    RecipeModel.find({}, 'title description type', (err, docs) => {
      res.send(docs);
    });
  }
  else {
    res.send('Please specify either a param of foodType or cuisineType')
  }
});

module.exports = router;
let { RecipeModel, RecipeSubmissionModel } = require('../models/recipes.model');
let express = require('express');
let router = express.Router();

router.post('/recipeSubmissions', (req, res) => {
  // Check if we got a title, desc, link and asrc
  const { title, description, src, link, type } = req.body.params;
  if (title && description && link && src && type) {
    RecipeSubmissionModel.collection.insertOne({
      title: title,
      description: description,
      src: src,
      link: link,
      type: type
    });
    res.status(200).send('Success');
  }
  else {
    res.status(400).send('Invalid Params!');
  }
})

router.get('/recipeSubmissions', (req, res) => {
  RecipeSubmissionModel.find({}, (err, docs) => {
    res.send(docs);
  });
})

module.exports = router;
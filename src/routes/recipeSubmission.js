let { RecipeModel, RecipeSubmissionModel } = require('../models/recipes.model');
let express = require('express');
let router = express.Router();

router.post('/recipeSubmissions', (req, res) => {
  // Check if we got a title, desc, link and asrc
  const { title, description, src, link, type, extra } = req.body.params;
  if (title && description && link && src && type && extra) {
    RecipeSubmissionModel.collection.insertOne({
      title: title,
      description: description,
      src: src,
      link: link,
      type: type,
      extra: extra
    });
    res.status(200).send('Success');
  }
  else {
    res.status(400).send('Invalid Params!');
  }
})

router.patch('/recipeSubmissions', async (req, res) => {
  const { id, action } = req.query;
  if (id) {
    if (action === 'add') {
      const docs = await RecipeSubmissionModel.find({ _id: id }, (err, docs) => {
        return docs;
      });
      RecipeModel.collection.insertOne(docs[0]);
      RecipeSubmissionModel.deleteOne({ _id: id })
        .then(() => res.status(201).send(`Recipes with id ${id} added to Recipes list`))
        .catch((err) => res.status(401).send(err.errmsg))
    }
    else if (action === 'delete') {
      RecipeSubmissionModel.deleteOne({ _id: id })
        .then(() => res.status(201).send(`Recipes with id ${id} removed from Submission List`))
        .catch((err) => res.status(401).send(err.errmsg))
    }
  }
  else status(400).send('Invalid Params!')
})

router.get('/recipeSubmissions', (req, res) => {
  RecipeSubmissionModel.find({}, (err, docs) => {
    res.send(docs);
  });
})

module.exports = router;
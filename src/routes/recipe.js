let { RecipeModel } = require('../models/recipes.model');
let { UserModel } = require('../models/users.model');
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
    res.status(400).send('Please specify either a param of id, foodType, cuisineType or dictionary')
  }
});

router.patch('/recipes', async (req, res) => {
  const { recipeId, rating, userId } = req.query;
  if (recipeId && rating && userId) {
    // Check if user already rated
    docs = await UserModel.findOne({ userId: userId });
    let userRatings = docs.ratings;

    let foundRating = false;
    let prevUserRating = 0;
    userRatings.forEach(userRating => {
      if (userRating._id == recipeId) {
        foundRating = true;
        prevUserRating = userRating.rating;
        userRating.rating = rating;
      }
    })

    // If no found rating, push new entry in
    if (!foundRating)
      userRatings.push({ _id: recipeId, rating: rating });

    docs = await UserModel.findOneAndUpdate({ userId: userId }, { ratings: userRatings }, { new: true, useFindAndModify: false });

    docs = await RecipeModel.findOne({ _id: recipeId });

    // If user already rated, negate previous rating before adding new one
    let newUserRating = parseInt(rating) - parseInt(prevUserRating);
    let numbRatingInc = 1;
    if (foundRating)
      numbRatingInc = 0;

    let newNumbRatings = getNumber(docs.numbRatings) + numbRatingInc;
    let newRatingSum = getNumber(docs.ratingSum) + parseInt(newUserRating);
    let newRatingAvg = newRatingSum / newNumbRatings;
    docs = await RecipeModel.findOneAndUpdate({ _id: recipeId }, { numbRatings: newNumbRatings, ratingAvg: newRatingAvg, ratingSum: newRatingSum }, { new: true, useFindAndModify: false });
    res.status(200).send(docs);
  }
  else
    res.status(400).send('Please specify both an ID and Rating');
});

getNumber = (number) => {
  return isNaN(parseInt(number)) ? 0 : parseInt(number);
}

module.exports = router;
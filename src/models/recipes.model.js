let mongoose = require('mongoose');

let RecipeSchema = new mongoose.Schema({
  title: String,
  description: String,
  src: String,
  link: String,
  type: String,
  extra: String,
  numbRatings: Number,
  ratingAvg: Number,
  ratingSum: Number
});

module.exports = {
  RecipeModel: mongoose.model('Recipe', RecipeSchema, 'recipes'),
  RecipeSubmissionModel: mongoose.model('RecipeSubmissions', RecipeSchema, 'recipeSubmissions')
}

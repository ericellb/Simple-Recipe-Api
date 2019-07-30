let mongoose = require('mongoose');

let RecipeSchema = new mongoose.Schema({
  title: String,
  description: String,
  src: String,
  link: String,
  type: String
});

module.exports = {
  RecipeModel: mongoose.model('Recipe', RecipeSchema, 'recipes'),
  RecipeSubmissionModel: mongoose.model('RecipeSubmissions', RecipeSchema, 'recipeSubmissions')
}

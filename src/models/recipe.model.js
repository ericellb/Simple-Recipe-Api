let mongoose = require('mongoose');

const { server } = require('../../config');
const { database } = require('../../config');
const { user } = require('../../config');
const { password } = require('../../config');

mongoose.connect(`mongodb+srv://${user}:${password}@${server}/${database}`);
var connection = mongoose.connection;
connection.on('connected', () => {
  console.log('connected to db');
})

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

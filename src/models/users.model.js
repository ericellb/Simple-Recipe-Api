let mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  ratings: [
    {
      id: String,
      rating: Number
    }
  ]
});

module.exports = {
  UserModel: mongoose.model('users', UserSchema, 'users')
}

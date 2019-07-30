let mongoose = require('mongoose');

let AdminSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  }
});

module.exports = {
  AdminModel: mongoose.model('admins', AdminSchema, 'admins')
}

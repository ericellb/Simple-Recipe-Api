const MONGO_SERVER = process.env.MONGODB_URI;
const MONGO_DB = process.env.MONGODB_DB;
const MONGO_USER = process.env.MONGODB_USER;
const MONGO_PASSWORD = process.env.MONGODB_PASSWORD;

module.exports = {
  server: MONGO_SERVER,
  database: MONGO_DB,
  user: MONGO_USER,
  password: MONGO_PASSWORD
}
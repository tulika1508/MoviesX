const mongoose = require("mongoose");
//creating a schema-maintaining the fav movies of a user(email-id)
const userSchema = new mongoose.Schema({
    email: {
      type: String,unique: true,required: true,max: 50,
    },
    //array of favorite movies
    favMovies: Array,
  });
  
  module.exports = mongoose.model("users", userSchema);
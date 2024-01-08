const {
    addToLikedMovies,
    getUsersLikedMovies,
    removeMovieFromLiked,
  } = require("./Controller.js");
  
  const router = require("express").Router();
  
  //three functions
  router.get("/liked/:email", getUsersLikedMovies);
  router.post("/add", addToLikedMovies);
  router.put("/remove", removeMovieFromLiked);
  
  module.exports = router;
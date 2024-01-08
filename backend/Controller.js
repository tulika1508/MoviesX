const User = require("./Model");

module.exports.getUsersLikedMovies = async (req, res) => {
  try {
    const { email } = req.params;
    const user =  await User.findOne({ email });
    if (user) {
      return res.json({ msg: "success", movies: user.favMovies });
    } else return res.json({ msg: "User with given email not found." });
  } 
  catch (error) {
    return res.json({ msg: "Error fetching movies." });
  }
};

module.exports.addToLikedMovies = async (req, res) => {
  try {
    const { email, data } = req.body;
    const user =  await User.findOne({ email });
    if (user) {
      const { favMovies } = user;
      const movieAlreadyLiked = favMovies.find(({ id }) => id === data.id);
      if (!movieAlreadyLiked) {
        await User.findByIdAndUpdate(
          user._id,
          {
            favMovies: [...user.favMovies, data],
          },
          { new: true }
        );
      } else return res.json({ msg: "Movie already added to the liked list." });
    } else await User.create({ email, favMovies: [data] });
    return res.json({ msg: "Movie successfully added to liked list." });
  } 
  catch (error) {
    return res.json({ msg: "Error adding movie to the liked list" });
  }
};

module.exports.removeMovieFromLiked = async (req, res) => {
  try {
    const { email, movieId } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const movies = user.favMovies;
      const movieIndex = movies.findIndex(({ id }) => id === movieId);
      if (!movieIndex) {
        res.status(400).send({ msg: "Movie not found." });
      }
      movies.splice(movieIndex, 1);
      await User.findByIdAndUpdate(
        user._id,
        {
          favMovies:movies,
        },
        { new: true }
      );
      return res.json({ msg: "Movie successfully removed.", movies });
    } else return res.json({ msg: "User with given email not found." });
  } catch (error) {
    return res.json({ msg: "Error removing movie to the liked list" });
  }
};
const express=require("express");
const cors=require("cors");
const mongoose=require("mongoose");
const userRoutes = require("./Route.js");

const app=express();

app.use(cors());
app.use(express.json);

mongoose.connect("mongodb://localhost:27017/xmovies", {
    useNewUrlParser: true
    
  })
  .then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log("error");
  });
  app.use("/api/user", userRoutes);

app.listen(5000,console.log("server starts on 5000"));
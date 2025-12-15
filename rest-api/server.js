const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/usersdb")
.then(()=>console.log("Mongodb Connected"))
.catch(err=>console.log(err));

const userScheme = new mongoose.Schema({
  name:String
});

const User = mongoose.model("User",userScheme);

app.post("/users",async (req,res)=>{
  const user = new User({name : req.body.name});
  await user.save();
  res.status(201).json(user);
});

app.get("/users",async (req,res)=>{
  const users = await User.find();
  res.json(users);
});

app.put("/users/:id",async (req,res)=>{
  const user = await User.findByIdAndUpdate(
    req.params.id,
    {name:req.body.name},
    {new : true}
  );
  res.json(user);
});

app.delete("/users/:id",async(req,res)=>{
  await User.findByIdAndDelete(req.params.id);
  res.json({message:"user deleted"});
});

app.listen(5000 , () =>{
  console.log("server nunning in port 5000");
});


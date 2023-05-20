const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    username : { type : String },
    email : { type : String },
    password : { type : String },
    status : { type : Number },
    token : { type : String },
});

const Mymodel = new mongoose.model("ADMIN",Schema);

module.exports = Mymodel;
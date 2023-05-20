const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    name : { type : String },
    email : { type : String },
    rating : { type : Number },
    message : { type : String },
    status : { type : Number }
});

const Mymodel = new mongoose.model("COMMENT",Schema);

module.exports = Mymodel;
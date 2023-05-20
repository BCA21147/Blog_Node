const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    catagory : { type : String },
    image : { type : String },
    status : { type : Number }
});

const Mymodel = new mongoose.model("CATAGORY",Schema);

module.exports = Mymodel;
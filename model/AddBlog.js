const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    blog_title : { type : String },
    blog_image : { type : String },
    blog_description : { type : String },
    blog_catagory : { type : String },
    blog_date : { type : String },
    blog_auther : { type : String },
    blog_rating : { type : Number },
    status : { type : Number },
});

const Mymodel = new mongoose.model("BLOG",Schema);

module.exports = Mymodel;
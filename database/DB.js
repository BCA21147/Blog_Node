const Admin = require('../model/AddAdmin')
const Catagory = require('../model/AddCatagory')
const Blog = require('../model/AddBlog')
const Comment = require('../model/AddComment')

const Admin_Data = require('./data/admins.json')
const Catagory_Data = require('./data/catagories.json')
const Blog_Data = require('./data/blogs.json')
const Comment_Data = require('./data/comments.json')

const DB = async (req,res,next) => { 

    await Admin.deleteMany({__v:0});
    await Catagory.deleteMany({__v:0});
    await Blog.deleteMany({__v:0});
    await Comment.deleteMany({__v:0});

    Admin.insertMany(Admin_Data);
    Catagory.insertMany(Catagory_Data);
    Blog.insertMany(Blog_Data);
    Comment.insertMany(Comment_Data);

    res.status(200).json({
        Status : "DONE"
    })

}

module.exports = DB;
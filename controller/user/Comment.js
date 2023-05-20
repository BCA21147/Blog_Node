var Comment = require('../../model/AddComment');
var Blog = require('../../model/AddBlog');

const AddComment = async (req, res, next) => {
    var data = {
        name: req.body.name,
        email: req.body.email,
        rating: req.body.rating,
        message: req.body.message,
        status: 0 
    }
    try {
        var add_data = await Comment.create(data);
        var add_rating = await Blog.findByIdAndUpdate({_id:req.params.id},{blog_rating : data.rating});
        res.status(200).json({
            Status : "Success",
            add_data
        })
    }
    catch
    {
        console.log("COMMENT NOT ADD.");
        res.send("ERROR");
    }
}
const GetComment = async (req, res, next) => {
    try {
        var data = await Comment.find({status:1}).sort({rating:-1}).limit(5);
        res.status(200).json({
            Status : "Success",
            data
        })
    }
    catch
    {
        console.log("COMMENT NOT FOUND.");
        res.send("ERROR");
    }
}

module.exports = {
    AddComment,
    GetComment
}
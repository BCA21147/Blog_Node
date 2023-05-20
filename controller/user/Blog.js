var Blog = require('../../model/AddBlog');
var Catagory = require('../../model/AddCatagory');
const { all } = require('../../routes');

const Get_All_Blog = async (req, res, next) => {
    try {
        var data = await Blog.find({ status: 1 }).sort({ blog_catagory: 1 });
        res.status(200).json({
            Status: "Success",
            data
        })
    }
    catch
    {
        console.log("CATAGORY NOT FOUND..!.");
        res.send("ERROR");
    }
}
const Get_Single_Blog = async (req, res, next) => {
    try {
        var data = await Blog.find({ status: 1, _id: req.params.blog }).sort({ blog_catagory: 1 });
        res.status(200).json({
            Status: "Success",
            data
        })
    }
    catch
    {
        console.log("CATAGORY NOT FOUND..!.");
        res.send("ERROR");
    }
}
const Get_Blog_Catagory = async (req, res, next) => {
    try {
        var data = await Blog.find({ status: 1 });
        res.status(200).json({
            Status: "Success",
            data
        })
    }
    catch
    {
        console.log("CATAGORY NOT FOUND..!.");
        res.send("ERROR");
    }
}
const Get_Single_Catagory = async (req, res, next) => {
    try {
        var catagory = await Catagory.findById({ _id: req.params.catagory })
        var data = await Blog.find({ status: 1, blog_catagory: catagory.catagory }).sort({ blog_catagory: 1 });
        res.status(200).json({
            Status: "Success",
            data
        })
    }
    catch
    {
        console.log("CATAGORY NOT FOUND..!.");
        res.send("ERROR");
    }
}
const Get_Top_5_Blog = async (req, res, next) => {
    try {
        var data = await Blog.find({ status: 1 }).sort({ blog_rating: -1 }).limit(5);
        res.status(200).json({
            Status: "Success",
            data
        })
    }
    catch
    {
        console.log("CATAGORY NOT FOUND..!.");
        res.send("ERROR");
    }
}
const Get_Latest_5_Blog = async (req, res, next) => {
    try {
        var data = await Blog.find({ status: 1 });
        data = data.reverse().slice(0, 5)
        res.status(200).json({
            Status: "Success",
            data
        })
    }
    catch
    {
        console.log("CATAGORY NOT FOUND..!.");
        res.send("ERROR");
    }
}
const Get_Catagory_Id = async (req, res, next) => {
    try {
        var blog = await Blog.findById({ _id: req.params.blog });
        var data = await Catagory.find({ catagory: blog.blog_catagory });
        res.status(200).json({
            Status: "Success",
            data
        })
    }
    catch
    {
        console.log("BLOG CATAGORY NOT FOUND..!.");
        res.send("ERROR");
    }
}
const Search_Blog = async (req, res, next) => {
    var value = req.params.value;
    var id = req.params.id;
    try {

        var cat = await Catagory.findById({ _id: id });
        var data = await Blog.find({ $or: [{ $and: [{ blog_catagory: cat.catagory }, { status: 1 }, { blog_title: { $regex: value } }] }, { $and: [{ blog_catagory: cat.catagory }, { status: 1 }, { blog_catagory: { $regex: value } }] }, { $and: [{ blog_catagory: cat.catagory }, { status: 1 }, { blog_description: { $regex: value } }] }, { $and: [{ blog_catagory: cat.catagory }, { status: 1 }, { blog_auther: { $regex: value } }] }, { $and: [{ blog_catagory: cat.catagory }, { status: 1 }, { blog_date: { $regex: value } }] }] });

        // var data = await Blog.find({ $or: [{ $and: [{ status: 1 }, { catagory: { $regex: value } }] }] }).sort({ catagory: 1 });
        res.status(200).json({
            Status: "Success",
            data
        })
    }
    catch
    {
        console.log("BLOG NOT FOUND..!.");
        res.send("ERROR");
    }
}
const SingleBlogNextBtn = async (req, res, next) => {
    try {

        var id = req.params.id
        var all_data = await Blog.find({ status: 1 });
        var data;

        for (let i = 0; i < all_data.length; i++) {
            if (all_data[i]._id == id) {
                try {
                    data = all_data[i + 1]._id;
                }
                catch {
                    data = all_data[0]._id;
                }
            }
        }
        res.status(200).json({
            Status: "Success",
            data
        })
    }
    catch
    {
        console.log("BLOG NOT FOUND..!.");
        res.send("ERROR");
    }
}
const SingleBlogPrevBtn = async (req, res, next) => {
    try {

        var id = req.params.id
        var all_data = await Blog.find({ status: 1 });
        var data;

        for (let i = 0; i < all_data.length; i++) {
            if (all_data[i]._id == id) {
                try {
                    data = all_data[i - 1]._id;
                }
                catch {
                    data = all_data[all_data.length - 1]._id;
                }
            }
        }
        res.status(200).json({
            Status: "Success",
            data
        })
    }
    catch
    {
        console.log("BLOG NOT FOUND..!.");
        res.send("ERROR");
    }
}

module.exports = {
    Get_All_Blog,
    Get_Single_Blog,
    Get_Blog_Catagory,
    Get_Single_Catagory,
    Get_Top_5_Blog,
    Get_Latest_5_Blog,
    Get_Catagory_Id,
    Search_Blog,
    SingleBlogNextBtn,
    SingleBlogPrevBtn
}
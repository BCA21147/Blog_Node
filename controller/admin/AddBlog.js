var Blog = require('../../model/AddBlog');
const cloudinary = require('cloudinary').v2;


cloudinary.config({
    cloud_name: "dpyo2eoqi",
    api_key: "429438955651427",
    api_secret: "gGXq6S-y0kdqbIHUbylmwtPkvBI"
});

const AddBlog = async (req, res, next) => {

    var add_data;
    if (req.body.image == '') {
        var file = req.files.Imagefile.tempFilePath;
        // console.log(file);
        cloudinary.uploader.upload(file, { folder: "BLOG" }, async function (err, result) {
            try {
                var date = new Date();
                const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                var today = date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear();

                var add_data = {
                    blog_title: req.body.title,
                    blog_image: result.secure_url,
                    blog_description: req.body.description,
                    blog_catagory: req.body.catagory,
                    blog_date: today,
                    blog_auther: req.body.auther,
                    status: 0
                }
                var data = await Blog.create(add_data);
                res.status(200).json({
                    Status: "Success",
                    data
                })
            }
            catch
            {
                console.log("ADMIN NOT ADD.");
                res.send("ERROR");
            }
        })
    }
    else {

        try {
            var date = new Date();
            const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            var today = date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear();

            var add_data = {
                blog_title: req.body.title,
                blog_image: req.body.image,
                blog_description: req.body.description,
                blog_catagory: req.body.catagory,
                blog_date: today,
                blog_auther: req.body.auther,
                status: 0
            }
            var data = await Blog.create(add_data);
            res.status(200).json({
                Status: "Success",
                data
            })
        }
        catch
        {
            console.log("BLOG NOT ADD.");
            res.send("ERROR");
        }
    }

}
const GetBlog = async (req, res, next) => {

    try {
        var data = await Blog.find();
        res.status(200).json({
            "Status": "Success",
            data
        })
    }
    catch {
        res.send("Data Not Fount ..!");
    }
}
const UpdateStatusBlog = async (req, res, next) => {

    var status = (req.params.status == 0) ? 1 : 0;
    try {
        var data = await Blog.findByIdAndUpdate({ _id: req.params.id }, { status: status });

        res.status(200).json({
            "Status": "Success",
            data
        })
    }
    catch
    {
        res.send("Data Not Updated ..!");
    }
}
const DeleteBlog = async (req, res, next) => {

    try {
        var data = await Blog.findById({ _id: req.params.id })
        console.log(data.blog_image);
        var a = data.blog_image.split('/');
        var b = a[a.length - 1];
        cloudinary.uploader.destroy(`BLOG/${b.split('.')[0]}`, (err, result) => {
            console.log(result);
        })
    }
    catch {
        console.log("Image Not Deleted..!");
        res.send("Image Not Deleted..!")
    }

    try {
        var data = await Blog.findByIdAndDelete({ _id: req.params.id });
        res.status(200).json({
            Status: "Success",
        })
    }
    catch
    {
        console.log("BLOG NOT DELETED.");
        res.send("ERROR");
    }
}
const GetSingleBlog = async (req, res, next) => {
    try {
        var data = await Blog.findById({ _id: req.params.id });
        res.status(200).json({
            Status: "Success",
            data
        })
    }
    catch
    {
        console.log("BLOG NOT Found.");
        res.send("ERROR");
    }
}
const UpdateBlog = async (req, res, next) => {

    try {
        var data = await Blog.findById({ _id: req.params.id })
        console.log(data.blog_image);
        var a = data.blog_image.split('/');
        var b = a[a.length - 1];
        cloudinary.uploader.destroy(`BLOG/${b.split('.')[0]}`, (err, result) => {
            console.log(result);
        })
    }
    catch {
        console.log("Image Not Deleted..!");
        res.send("Image Not Deleted..!")
    }

    if (req.body.image == '') {
        var file = req.files.Imagefile.tempFilePath;
        // console.log(file);
        cloudinary.uploader.upload(file, { folder: "BLOG" }, async function (err, result) {
            try {
                var date = new Date();
                const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                var today = date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear();
                var update_data = {
                    blog_title: req.body.title,
                    blog_image: result.secure_url,
                    blog_description: req.body.description,
                    blog_catagory: req.body.catagory,
                    blog_date: today,
                    blog_auther: req.body.auther
                }

                var data = await Blog.findByIdAndUpdate({ _id: req.params.id }, update_data);
                res.status(200).json({
                    Status: "Success",
                    data
                })
            }
            catch
            {
                console.log("BLOG NOT UPDATE.");
                res.send("ERROR");
            }
        })
    }
    else {
        try {
            var date = new Date();
            const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            var today = date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear();
            var update_data = {
                blog_title: req.body.title,
                blog_image: req.body.image,
                blog_description: req.body.description,
                blog_catagory: req.body.catagory,
                blog_date: today,
                blog_auther: req.body.auther
            }

            var data = await Blog.findByIdAndUpdate({ _id: req.params.id }, update_data);
            res.status(200).json({
                Status: "Success",
                data
            })
        }
        catch
        {
            console.log("BLOG NOT UPDATE.");
            res.send("ERROR");
        }
    }
}
const SearchBlog = async (req, res, next) => {
    var value = req.params.value;
    // console.log(value);
    try {
        var data = await Blog.find({ $or: [{ blog_title: { $regex: value } }, { blog_catagory: { $regex: value } }, { blog_description: { $regex: value } }, { blog_date: { $regex: value } }] });
        // var data = await Blog.find({blog_title:{ $regex: value }});

        // console.log(data);
        res.status(200).json({
            Status: "Success",
            data
        })
    }
    catch
    {
        console.log("BLOG NOT FOUND.");
        res.send("ERROR");
    }
}

module.exports = {
    AddBlog,
    GetBlog,
    UpdateStatusBlog,
    DeleteBlog,
    GetSingleBlog,
    UpdateBlog,
    SearchBlog
}
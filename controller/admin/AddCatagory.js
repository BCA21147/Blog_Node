var Catagory = require('../../model/AddCatagory');
var Blog = require('../../model/AddBlog');
const cloudinary = require('cloudinary').v2;


cloudinary.config({
    cloud_name: "dpyo2eoqi",
    api_key: "429438955651427",
    api_secret: "gGXq6S-y0kdqbIHUbylmwtPkvBI"
});

const AddCatagory = async (req, res, next) => {

    var add_data;
    if (req.body.image == '') {
        var file = req.files.Imagefile.tempFilePath;
        // console.log(file);
        cloudinary.uploader.upload(file, { folder: "BLOG" }, function (err, result) {
            try {
                add_data = {
                    catagory: req.body.catagory,
                    image: result.secure_url,
                    status: 0
                }
                var data = Catagory.create(add_data);
                res.status(200).json({
                    Status: "Success",
                    data
                })
            }
            catch
            {
                console.log("CATAGORY NOT ADD.");
                res.send("ERROR");
            }
        })
    }
    else {

        try {
            add_data = {
                catagory: req.body.catagory,
                image: req.body.image,
                status: 0
            }
            var data = await Catagory.create(add_data);
            res.status(200).json({
                Status: "Success",
                data
            })
        }
        catch
        {
            console.log("CATAGORY NOT ADD.");
            res.send("ERROR");
        }
    }

}
const GetCatagory = async (req, res, next) => {

    try {
        var data = await Catagory.find();
        res.status(200).json({
            "Status": "Success",
            data
        })
    }
    catch {
        res.send("Data Not Fount ..!");
    }
}
const UpdateStatusCatagory = async (req, res, next) => {

    var status = (req.params.status == 0) ? 1 : 0;
    try {
        var data = await Catagory.findByIdAndUpdate({ _id: req.params.id }, { status: status });

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
const DeleteCatagory = async (req, res, next) => {

    try {
        var data = await Catagory.findById({ _id: req.params.id })
        console.log(data.image);
        var a = data.image.split('/');
        var b = a[a.length - 1];
        cloudinary.uploader.destroy(`BLOG/${b.split('.')[0]}`, (err, result) => {
            console.log(result);
        })
    }
    catch {
        console.log("Image Not Deleted..!");
        res.send("Image Not Deleted..!")
    }

    // console.log(data);
    try {
        var data = await Catagory.findById({ _id: req.params.id });

        await Catagory.findByIdAndDelete({ _id: req.params.id });
        await Blog.deleteMany({ blog_catagory: data.catagory });
        res.status(200).json({
            Status: "Success",
        })
    }
    catch
    {
        console.log("CATAGORY NOT DELETED.");
        res.send("ERROR");
    }
}
const GetSingleCatagory = async (req, res, next) => {
    try {
        var data = await Catagory.findById({ _id: req.params.id });
        res.status(200).json({
            Status: "Success",
            data
        })
    }
    catch
    {
        console.log("CATAGORY NOT Found.");
        res.send("ERROR");
    }
}
const UpdateCatagory = async (req, res, next) => {

    try {
        var data = await Catagory.findById({ _id: req.params.id })
        console.log(data.image);
        var a = data.image.split('/');
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
                var update_data = {
                    catagory: req.body.catagory,
                    image: result.secure_url,
                }
                var data = await Catagory.findByIdAndUpdate({ _id: req.params.id }, update_data);
                res.status(200).json({
                    Status: "Success",
                    data
                })
            }
            catch
            {
                console.log("CATAGORY NOT ADD.");
                res.send("ERROR");
            }
        })
    }
    else {
        try {
            var update_data = {
                catagory: req.body.catagory,
                image: req.body.image,
            }
            var data = await Catagory.findByIdAndUpdate({ _id: req.params.id }, update_data);
            res.status(200).json({
                Status: "Success",
                data
            })
        }
        catch
        {
            console.log("CATAGORY NOT UPDATE.");
            res.send("ERROR");
        }
    }

}
const SearchCatagory = async (req, res, next) => {
    var value = req.params.value;
    // console.log(value);
    try {
        var data = await Catagory.find({ $or: [{ catagory: { $regex: value } }] });
        // console.log(data);
        res.status(200).json({
            Status: "Success",
            data
        })
    }
    catch
    {
        console.log("CATAGORY NOT FOUND.");
        res.send("ERROR");
    }
}

module.exports = {
    AddCatagory,
    GetCatagory,
    UpdateStatusCatagory,
    DeleteCatagory,
    GetSingleCatagory,
    UpdateCatagory,
    SearchCatagory
}
var Comment = require('../../model/AddComment');

const GetComment = async (req, res, next) => {
    try {
        var data = await Comment.find();
        res.status(200).json({
            Status: "Success",
            data
        })
    }
    catch
    {
        console.log("COMMENT NOT FOUND.");
        res.send("ERROR");
    }
}
const UpdateStatusComment = async (req, res, next) => {

    var status = (req.params.status == 0) ? 1 : 0;
    try {
        var data = await Comment.findByIdAndUpdate({ _id: req.params.id }, { status: status });

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
const DeleteComment = async (req, res, next) => {

    try {
        await Comment.findByIdAndDelete({ _id: req.params.id });
        res.status(200).json({
            Status: "Success",
        })
    }
    catch
    {
        console.log("COMMENT NOT DELETED.");
        res.send("ERROR");
    }
}
const SearchComment = async (req, res, next) => {
    var value = req.params.value;
    // console.log(value);
    try {

        if (value == 1 || value == 2 || value == 3 || value == 4 || value == 5) {
            var data = await Comment.find({ rating: value });
        }
        else {

            var data = await Comment.find({ $or: [{ name: { $regex: value } }, { email: { $regex: value } }, { message: { $regex: value } }] });
        }
        // var data = await Comment.find({name:{ $regex: value }});

        // var data = await Comment.find({rating: value});

        // console.log(data);
        res.status(200).json({
            Status: "Success",
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
    GetComment,
    UpdateStatusComment,
    DeleteComment,
    SearchComment
}
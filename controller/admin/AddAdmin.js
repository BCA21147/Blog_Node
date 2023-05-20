var Admin = require('../../model/AddAdmin');
const bcrypt = require('bcrypt');
var cookieParser = require('cookie-parser');
const session = require('express-session');

const AddAdmin = async (req, res, next) => {

    var add_data = {
        username: req.body.name,
        email: req.body.email,
        password: req.body.password,
        // password: bcrypt.hashSync(req.body.password,7),
        status: 0
    }
    try {
        var data = await Admin.create(add_data);
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
}
const GetAdmin = async (req, res, next) => {
    try {
        var data = await Admin.find();

        res.status(200).json({
            "Status": "Success",
            data
        })
    }
    catch
    {
        res.send("Data Not Fount ..!");
    }
}
const GetSingleAdmin = async (req, res, next) => {
    try {
        var data = await Admin.findById({ _id: req.params.id });
        res.status(200).json({
            Status: "Success",
            data
        })
    }
    catch
    {
        console.log("ADMIN NOT Found.");
        res.send("ERROR");
    }
}
const UpdateStatusAdmin = async (req, res, next) => {

    var status = (req.params.status == 0) ? 1 : 0;
    try {
        var data = await Admin.findByIdAndUpdate({ _id: req.params.id }, { status: status });

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
const DeleteAdmin = async (req, res, next) => {
    try {
        await Admin.findByIdAndDelete({ _id: req.params.id });
        res.status(200).json({
            Status: "Success",
        })
    }
    catch
    {
        console.log("ADMIN NOT DELETED.");
        res.send("ERROR");
    }
}
const UpdateAdmin = async (req, res, next) => {
    var update_data = {
        username: req.body.name,
        email: req.body.email,
        password: req.body.password,
    }
    try {
        var data = await Admin.findByIdAndUpdate({ _id: req.params.id }, update_data);
        res.status(200).json({
            Status: "Success",
            data
        })
    }
    catch
    {
        console.log("ADMIN NOT UPDATE.");
        res.send("ERROR");
    }
}
const SearchAdmin = async (req, res, next) => {
    var value = req.params.value;
    // console.log(value);
    try {
        var data = await Admin.find({ $or: [{ username: { $regex: value } }, { email: { $regex: value } }] });
        // console.log(data);
        res.status(200).json({
            Status: "Success",
            data
        })
    }
    catch
    {
        console.log("ADMIN NOT FOUND.");
        res.send("ERROR");
    }
}

module.exports = {
    AddAdmin,
    GetAdmin,
    UpdateStatusAdmin,
    UpdateAdmin,
    DeleteAdmin,
    GetSingleAdmin,
    SearchAdmin
}
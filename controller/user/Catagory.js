var Catagory = require('../../model/AddCatagory');

const Get_All_Catagory = async (req, res, next) => {
    try {
        var data = await Catagory.find({ status: 1 }).sort({ catagory: 1 });
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
const Search_Catagory = async (req, res, next) => {
    var value = req.params.value;
    try {
        var data = await Catagory.find({ $or: [{ $and: [{ status: 1 }, { catagory: { $regex: value } }] }] }).sort({ catagory: 1 });
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

module.exports = {
    Get_All_Catagory,
    Search_Catagory
}
var Admin = require('../../model/AddAdmin');
var jwt = require('jsonwebtoken');
var cookieParser = require('cookie-parser');

const CheckAdmin = async (req, res, next) => {

    var admin_data = {
        email: req.body.email,
        password: req.body.password,
        status: 1
    }
    // console.log(admin_data);
    try {
        var data = await Admin.find(admin_data);

        console.log(data);
        if (data.length==0) {
            res.status(200).json({
                Status: "Success",
                data,
                token: ""
            })
        }
        else {
            const token = jwt.sign({ data }, "Krishna@123", { expiresIn: "300s" });
            console.log(token);
            // localStorage.setItem('Token',token);
            // var add_token = await Admin.findByIdAndUpdate({_id:data._id},{token:token});
            res.status(200).json({
                Status: "Success",
                data,
                token
            })
        }
        // res.cookie('JWT',token,{
        //     expires: new Date(Date.now()+25892000000),
        //     httpOnly:true
        // });

        // req.session.JWT = token;
        // console.log(req.session);
    }
    catch
    {
        console.log("ADMIN NOT FOUND..!");
        res.send("ADMIN NOT FOUND..!");
    }
}
const CheckToken = async (req, res, next) => {

    try {

        var data = jwt.verify(req.session.JWT, "Krishna123");

        // console.log(req.session);
        // console.log("Data :-"+data);

        res.status(200).json({
            Status: "Success",
        })
    }
    catch
    {
        res.send("ADMIN VERIFY ...!");
    }
}

module.exports = {
    CheckAdmin,
    CheckToken
}